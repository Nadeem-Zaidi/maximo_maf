/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2020, 2022 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

import 'regenerator-runtime/runtime';
import allPerson from './test/sr-person-data.js';
import srData from './test/test-sr-data.js';
import locationData from './test/test-location-data.js';
import assetData from './test/test-asset-data.js';
import tkspecitem from './test/test-sr-tktempwithspec-data.js';
import newTestStub from './test/AppTestStub';
import stateprovinceData from './test/test-stateprovince-data.js';



  async function getApp() {
    let initializeApp = newTestStub({
      currentPage: 'createSR',
      datasources: {
        personDS: {
          data: allPerson
        },
        locationLookupDS: {
          data: locationData
        },
        locationDS: {
          data: locationData
        },
        locationHierarchyDS: {
          data: locationData
        },
        locationMapDS: {
          data: locationData
        },
        assetLookupDS: {
          data: assetData
        },
        assetMapDS: {
          data: assetData
        },
        tktemplateds: {
          data: tkspecitem
        },
        tktempds: {
          data: tkspecitem
        },
        stateProvinceList: {
          data: stateprovinceData
        }
      },
      onNewApp: (app) => {
        app.client.systemProperties = {
          'sr.filter.site': '0',
          'sr.default.priority': '3',
          'sr.high.priority': '2'
        }
      }
    });
    let app = await initializeApp();
    app.client.userInfo = {
      defaultSite: "BEDFORD",
      personid: 'FITZ',
      displayname: "Fitz Cameron",
      primaryphone: "5582123456789",
      primaryemail: "fitzcam@srmobile.cn",
      location: {
        location:"PLANT-W1",
        siteid: "BEDFORD"
      }
    };
    app.setCurrentPage = jest.fn();
    app.currentPage.params = {
      href: "oslc/os/mxapisr/_U1IvMTAwOA--"
    }
    return app;
  }



  it("should perform basic flow", async () => {
    let app = await getApp();
    let page = app.currentPage;
	  let controller = page.controllers[0];
    app.currentPage.params.href = undefined;
    await controller.pageInitialized(page, app);
    await controller.pageResumed(page);
    let item = app.findDatasource("srDS").item;
    //Check default values
    expect(page.state.ishighpriority).toBe(false);
    expect(item.reportedpriority).toBe(undefined); //If undefined, will be set as default priority during controller.createServiceRequest();
    expect(item.reportedbyid).toBe(app.client.userInfo.personid);
    expect(item.reportedbyname).toBe(app.client.userInfo.displayname);
    expect(item.reportedphone).toBe(app.client.userInfo.primaryphone);
    expect(item.reportedemail).toBe(app.client.userInfo.primaryemail);
    expect(item.affectedpersonid).toBe(app.client.userInfo.personid);
    expect(item.affectedperson).toBe(app.client.userInfo.personid);
    expect(item.affectedusername).toBe(app.client.userInfo.displayname);
    expect(item.affectedphone).toBe(app.client.userInfo.primaryphone);
    expect(item.affectedemail).toBe(app.client.userInfo.primaryemail);
    expect(item.location).toBe(app.client.userInfo.location.location);
    expect(item.assetnum).toBe(undefined);
    //Submit
    await controller.createServiceRequest();
  });



  it("should handle ticket spec", async () => {
    let app = await getApp();
    let page = app.currentPage;
	  let controller = page.controllers[0];
    page.params.href = undefined;
    page.params.templateid = "1010";
    let newTicketSpecJDS = page.datasources.newTicketSpecJDS;
    newTicketSpecJDS.dataAdapter.src = "tobereplaced";
    newTicketSpecJDS.dataAdapter.jsonResponse = "tobereplaced";
    app.findDatasource("srDS").item.site = {siteid: "tobedeleted"};
    
    await controller.pageInitialized(page, app);
    await controller.pageResumed(page);

    //Numeric, ALN, DATE, TABLE and TABLE_WITH_DOMAINID
    expect(newTicketSpecJDS.items.length).toBe(5);
    
    //Test ALN domain
    newTicketSpecJDS.currentItem = newTicketSpecJDS.items[1];
    controller.handleALNValueSmartLookupClick(newTicketSpecJDS);
    page.showDialog("alnLookup");

    const newALNValue = {
      item: {
        value: "Y",
        description: "Yes"
      },
      datasource: {
        name: "alndomainDS"
      }
    }
    controller.selectALNValue(newALNValue);

    //Test table domain
    newTicketSpecJDS.currentItem = newTicketSpecJDS.items[3];
    controller.handleTableValueSmartLookupClick(newTicketSpecJDS);
    newTicketSpecJDS.currentItem = newTicketSpecJDS.items[4];
    controller.handleTableValueSmartLookupClick(newTicketSpecJDS);
    const newTableValue = {
      item: {
        domainid: "LINEAR JP",
        value: "JPCAL101"
      },
      datasource: {
        name: "tableDomainDS"
      }
    }
    controller.selectTableValue(newTableValue);
  });

  it("should handle stateprovince", async () => {
    let app = await getApp();
    let page = app.currentPage;
	let controller = page.controllers[0];
    page.params.href = undefined;
    page.params.templateid = "1010";
    let newTicketSpecJDS = page.datasources.newTicketSpecJDS;
    newTicketSpecJDS.dataAdapter.src = "tobereplaced";
    newTicketSpecJDS.dataAdapter.jsonResponse = "tobereplaced";
    app.findDatasource("srDS").item.site = {siteid: "tobedeleted"};
    
    await controller.pageInitialized(page, app);
    await controller.pageResumed(page);

    controller.handleALNValueStateProvinceLookupClick(newTicketSpecJDS);
    page.showDialog("stateProvinceLookup");

    const newStateProvinceValue = {
      item: {
        value: "AK",
        description: "Alaska"
      },
      datasource: {
        name: "stateProvinceList"
      }
    }
    controller.selectStateProvinceValue(newStateProvinceValue);
  });



  it("should open people lookup and select person", async () => {
    let app = await getApp();
    let page = app.currentPage;
	  let controller = page.controllers[0];
    await controller.pageInitialized(page, app);
    await controller.pageResumed(page);
    let srListds = page.datasources.SRListds;
    srListds.forceReload();
    let event = {
      "_rowstamp": "772377",
      "firstname": "Tom",
      "displayname": "Tom Revis",
      "personid": "REVIS",
      "href": "oslc/os/mxapiperson/_UkVWSVM-",
      "primaryphone": "(617) 745-0879",
      "primaryemail": "tom.revis@intergalactic.net",
      "lastname": "Revis",
      "department": "IT"
    }
    await controller.selectPerson(event);
    expect(page.state.contactdetail).toBe(event.displayname);
    await controller.setContactPersonHubInfo();
  });



  it('should save a new high priority service request', async () => {
    let app = await getApp();
    let page = app.currentPage;
    let controller = page.controllers[0];
    await controller.pageInitialized(page, app);
    await controller.pageResumed(page);

    page.state.ishighpriority = true;
    await controller.createServiceRequest();
    let item = app.findDatasource("srDS").item;
    expect(item.reportedpriority).toBe(app.state.sysProp.highPriority);
  });



  it("should select location by drill in", async () => {  
    let app = await getApp();
    let page = app.currentPage;
    let controller = page.controllers[0];
    await controller.pageInitialized(page, app);
    await controller.pageResumed(page);
    
    await controller.drillInLocation(null);

    //TODO The location DS is empty. Needs investigation
    let dslocation = page.datasources.locationHierarchyDS;
    await controller.drillInLocation(dslocation.items[0]);
    await dslocation.load();
  });



  it("should validate when location and asset mismatch", async () => {
    let app = await getApp();
    let page = app.currentPage;
    let controller = page.controllers[0];
    
    const dsasset= page.datasources.assetLookupDS;
    let assetItems = await dsasset.load();
    
    const dslocation = page.datasources.locationLookupDS;
    let locationItems = await dslocation.load();

    await controller.pageInitialized(page, app);

    await controller.selectLocation(locationItems[0]);
    await controller.selectAsset(assetItems[0]);
    await controller.selectLocation(locationItems[1]);
    await controller.selectAsset(assetItems[1]);

    //This is set by user from dialog
    page.state.hasInvalidAsset=true;
    page.state.hasInvalidLocation=true;

    //Submit
    await controller.createServiceRequest();
  });



  it("should be able to clear values set", async () => {
    let app = await getApp();
    let page = app.currentPage;
    let controller = page.controllers[0];
    await controller.pageInitialized(page, app);
    await controller.pageResumed(page);
    
    page.state.location = "LOCATIONTEST1";
    page.state.locationdesc = "LOCATIONTEST1 long description";
    page.state.assetnum = "ASSETTEST1";
    page.state.assetdesc = "ASSETTEST1 long description";

    const items = page.datasources.SRListds.dataAdapter.src.items;
    
    //Clear location
    controller.clearvalue(items[2]);

    expect(page.state.location).toBe("");
    expect(page.state.locationdesc).toBe("");
    expect(page.state.assetnum).toBe("ASSETTEST1");
    expect(page.state.assetdesc).toBe("ASSETTEST1 long description");

    //Clear asset
    controller.clearvalue(items[3]);

    expect(page.state.location).toBe("");
    expect(page.state.locationdesc).toBe("");
    expect(page.state.assetnum).toBe("");
    expect(page.state.assetdesc).toBe("");

    //Set asset and save
    let assetLookupDS = page.datasources.assetLookupDS;
    await assetLookupDS.load();
    await controller.selectAsset(assetLookupDS.items[0]);
    await controller.createServiceRequest();
  });



  it("should handle barcode scan", async () => {
    let app = await getApp();
    let page = app.currentPage;
    let controller = page.controllers[0];

    const dsasset= page.datasources.assetLookupDS;
    await dsasset.load();
    
    const dslocation = page.datasources.locationLookupDS;
    await dslocation.load();

    await controller.pageInitialized(page, app);

    //Valid scan for location
    let scanEvent = {value: "BOILER"};
    controller.handleLocationScan(scanEvent);

    //Invalid scan for location
    scanEvent = {value: "BOILAAAAR"};
    controller.handleLocationScan(scanEvent);

    //Valid scan for asset
    scanEvent = {value: "CAL300"};
    controller.handleAssetScan(scanEvent);

    //Invalid scan for asset
    scanEvent = {value: "CAL30000"};
    controller.handleAssetScan(scanEvent);
  });
  


  it("should gotoview", async () => {
    let app = await getApp();
    let page = app.currentPage;
    let controller = page.controllers[0];

    await controller.pageInitialized(page, app);
    await controller.pageResumed(page);
    
    const SRListds = page.datasources.SRListds;
    await controller.gotoview(SRListds.item);
  });



  it("should go to certained view", async () => {
    let app = await getApp();
    let page = app.currentPage;
    let controller = page.controllers[0];
    await controller.pageInitialized(page, app);
    await controller.pageResumed(page);
    await controller.gotoviewBtn("2");
    expect(page.state.splitViewIndex).toBe(2);
  });



  it("should come back from any view", async () => {
    let app = await getApp();
    let page = app.currentPage;
    let controller = page.controllers[0];
    await controller.pageInitialized(page, app);
    await controller.pageResumed(page);
    await controller.gotoviewBtn("3");
    expect(page.state.splitViewIndex).toBe(3);
    await controller.splitViewChanged();
    expect(page.state.splitViewIndex).toBe(0);
  });



  it("should go to next view", async () => {
    let app = await getApp();
    let page = app.currentPage;
    let controller = page.controllers[0];
    await controller.pageInitialized(page, app);
    await controller.pageResumed(page);

    page.state.splitViewIndex = 2;
    await controller.nextSplitViewPage();
    expect(page.state.splitViewIndex).toBe(3);

    //At last page we go back to the first page
    page.state.splitViewIndex = 6;
    await controller.nextSplitViewPage();
    expect(page.state.splitViewIndex).toBe(0);
  });



  it("should go to previous view", async () => {
    let app = await getApp();
    let page = app.currentPage;
    let controller = page.controllers[0];

    page.state.splitViewIndex = 2;
    await controller.prevSplitViewPage(app.findDatasource("srDS").item);
    expect(page.state.splitViewIndex).toBe(1);
  });



  it("should be able to open previous page", async () => {
    let app = await getApp();
    let page = app.currentPage;
    let controller = page.controllers[0];

    app.state.pagelist = [];
    app.state.isback = false;
    app.state.isUpdateFromBack = false;
    app.state.selectedTopCategory = "";
    app.state.selectedSubCategory = "";
    app.state.subcategory = "";
    app.state.currSubCategoryID = "";
    app.state.currSubCategoryDesc = "";

    app.state.valuesaved = false;
    app.state.pagelist.push({
      pagename: 'SubCategory',
      id: '1143',
      description: 'HR',
      currID: '1155',
      currDesc: 'TerminateTerminate Employee'
    });
    controller.openPrevPage();

    app.state.pagelist.push({
      pagename: 'tktemp',
      id: '1008',
      description: 'New Employee',
      currID: '1155',
      currDesc: 'TerminateTerminate Employee'
    });
    controller.openPrevPage();

    app.state.pagelist.push({
      pagename: 'newRequest',
      id: '',
      description: ''
    });
    controller.openPrevPage();

    app.state.pagelist = [];
    controller.openPrevPage();

    app.state.valuesaved = false;
    app.state.pagelist.push({
      pagename: 'tktemp',
      id: '1008',
      description: 'New Employee',
      currID: '1155',
      currDesc: 'TerminateTerminate Employee'
    });
    controller.openPrevPage();

    app.state.valuesaved = true;
    app.state.pagelist.push({
      pagename: 'tktemp',
      id: '1008',
      description: 'New Employee',
      currID: '1155',
      currDesc: 'TerminateTerminate Employee'
    });
    controller.openPrevPage();
  });



  it('should open the dialog for the map', async () => {
    let app = await getApp();
    let page = app.currentPage;
    let controller = page.controllers[0];

    controller.pageInitialized(page, app);
    //For location
    controller.openMapDialog(false);
    controller.loadLocationJsonForMap();
    page.state.mapValueSelected="BR210";
    controller.selectValueFromMap();
    //For asset
    controller.openMapDialog(true);
    controller.loadAssetJsonForMap();
    page.state.mapValueSelected="7500";
    controller.selectValueFromMap();
  });



  it("should be able to add attachment", async () => {
    let app = await getApp();
    let page = app.currentPage;
	  let controller = page.controllers[0];
    await controller.pageInitialized(page, app);
    await controller.pageResumed(page);

    let txtFile = {
      name: 'test.txt',
      type: 'text/plain',
      blob: new Blob(["Hello world!"],{type:"text/plain"})
    }
    window.URL.createObjectURL = jest.fn();

    let srattchds = app.findDatasource("srattchds");

    expect(srattchds.state.hasData).toBe(false);

    await srattchds.dataAdapter.addAttachment(txtFile)

    expect(srattchds.state.hasData).toBe(true);

    await srattchds.load({src: srattchds.dataAdapter.items, noCache: true});

    expect(srattchds.items.length).toBe(1);

    //Submit
    await controller.createServiceRequest();
  });

  

  it("should indicate when data saving fails", async () => {
    let app = await getApp();
    let page = app.currentPage;
    let controller = page.controllers[0];
    controller.onSaveDataFailed();
    expect(controller.saveDataSuccessful).toBe(false);      
  });


  
  it("should save on user confirmation dialog when leaving page", async () => {
    let app = await getApp();
    let page = app.currentPage;
    let controller = page.controllers[0];
    controller.pageInitialized(page, app);

    page.state.location = "PLAN-W1";
    app.state.valuesaved = false;

    const item = app.findDatasource("srDS").item;
    item.ticketid = "1000";
    item.status = "New";
    item.description_longdescription = "this is long";
    item.latitudey = "this is a latitude";
    item.longitudex = "this is a longitude";
    
	  controller.setHubDescription();
    controller.onCustomSaveTransition();
  });



  it("should save service address information", async () => {
    let app = await getApp();
    let page = app.currentPage;
    let controller = page.controllers[0];

    page.state.srdescription = "a description";
    page.state.formattedaddress = "a formattedaddress";
    page.state.streetaddress = "a streetaddress";
    page.state.city = "a city";
    page.state.stateprovince = "a stateprovince";
    page.state.latitudey = "a latitude";
    page.state.longitudex = "a longitude";
    
    await controller.pageInitialized(page, app);
    await controller.pageResumed(page);
    
    //Test the method that is only called from app.xml
    controller.setAddressState();

    //Submit
    await controller.createServiceRequest();
  });



  it("should validate stateprovince field", async () => {
    let app = await getApp();
    let page = app.currentPage;
	  let controller = page.controllers[0];

	  await app.initialize();

    app.currentPage.params.href = undefined;
    await controller.pageInitialized(page, app);
    await controller.pageResumed(page);
    let item = app.findDatasource("srDS").item;
    //Check stateprovince validation
	  item.stateprovince = "XXX";
    //Submit
    await controller.createServiceRequest();
  });



  it("should validate required fields", async () => {
    let initializeApp = newTestStub({
      currentPage: 'createSR',
      datasources: {
        srDS: {
          data: srData
        }
      }
    });
    let app = await initializeApp();
    let page = app.currentPage;
    let controller = page.controllers[0];
    let srDS = app.findDatasource("srDS");
    await srDS.initializeQbe();
    await controller.pageInitialized(page, app);
    await controller.pageResumed(page);
    
    //Clear all fields
    srDS.item.affectedperson = "";
    srDS.item.affectedemail = "";
    srDS.item.affectedphone = "";
    srDS.item.location = "";

    //Submit
    await controller.createServiceRequest();
  });



  it("should validate ticket mandatory fields", async () => {
    let app = await getApp();
    let page = app.currentPage;
    let controller = page.controllers[0];
    await app.datasources.tktemplateds.load();
    app.state.selectedtkt = "A category description";
    app.state.isMobileContainer = true;
    page.params.href = undefined;
    page.params.templateid = "1010";
    await controller.pageInitialized(page, app);
    await controller.pageResumed(page);
    
    const srDS = app.findDatasource("srDS");
    const newSRC = srDS.item.ticketspec;
    
    const newTicketSpecJDS = page.datasources.newTicketSpecJDS;
    newTicketSpecJDS.clearState();
    newTicketSpecJDS.resetState();
    newTicketSpecJDS.lastQuery = {};
    newTicketSpecJDS.dataAdapter.src = newSRC;
    newTicketSpecJDS.dataAdapter.jsonResponse = newSRC;
    await newTicketSpecJDS.load({src: newSRC});

    app.state.isMobileContainer = false;

    //Submit
    await controller.createServiceRequest();
  });



  it("should enable and erase asset input", async () => {
    let app = await getApp();
    let page = app.currentPage;
    let controller = page.controllers[0];
    await controller.pageInitialized(page, app);
    await controller.pageResumed(page);

    //Disabled by default
    expect(page.state.isAssetEditEnabled).toBe(false);

    //Enable
    controller.enableAssetEdit(true);
    expect(page.state.isAssetEditEnabled).toBe(true);

    //Disable
    controller.enableAssetEdit(false);
    expect(page.state.isAssetEditEnabled).toBe(false);
  });

  it("should return empty service address", async () => {
    let app = await getApp();
    let page = app.currentPage;
    let controller = page.controllers[0];

    expect(controller.getItemServiceAddress(null)).toBeNull();
    expect(controller.getItemServiceAddress({})).toBeNull();
    expect(controller.getItemServiceAddress({
      serviceaddress: []
    })).toBeNull();
  });

  it("should return service address from array", async () => {
    let app = await getApp();
    let page = app.currentPage;
    let controller = page.controllers[0];

    expect(controller.getItemServiceAddress({
      serviceaddress: [
        {
          latitudey: 50.0,
          longitudex: 50.0
        }
      ]
    })).toEqual({
      latitudey: 50.0,
      longitudex: 50.0
    });
  });

  it("should return service address from object", async () => {
    let app = await getApp();
    let page = app.currentPage;
    let controller = page.controllers[0];

    expect(controller.getItemServiceAddress({
      serviceaddress: {
        latitudey: 25.0,
        longitudex: 25.0
      }
    })).toEqual({
      latitudey: 25.0,
      longitudex: 25.0
    });
  });

  it("should return empty service address if it is invalid", async () => {
    let app = await getApp();
    let page = app.currentPage;
    let controller = page.controllers[0];

    expect(controller.getItemServiceAddress({
      serviceaddress: {
        longitudex: 25.0
      }
    })).toBeNull();

    expect(controller.getItemServiceAddress({
      serviceaddress: {
        latitudey: 25.0,
        longitudex: 'b'
      }
    })).toBeNull();

    expect(controller.getItemServiceAddress({
      serviceaddress: [
        {
          latitudey: 'a',
          longitudex: 25.0
        }
      ]
    })).toBeNull();

    expect(controller.getItemServiceAddress({
      serviceaddress: [
        {
          latitudey: 30.0,
        }
      ]
    })).toBeNull();

    expect(controller.getItemServiceAddress({
      serviceaddress: [
        {
          latitudey: 30.0,
        }
      ]
    })).toBeNull();

    expect(controller.getItemServiceAddress({
      serviceaddress: 'invalid'
    })).toBeNull();
  });

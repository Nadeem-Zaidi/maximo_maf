/*
 * Licensed Materials - Property of IBM
 *
 * 5737-M60, 5737-M66
 *
 * (C) Copyright IBM Corp. 2021,2023 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */
import { log } from "@maximo/maximo-js-api";
const TAG = "ClassificationController";

class ClassificationController {
  onDatasourceInitialized(ds, owner, app) {
    this.datasource = ds;
    this.owner = owner;
    this.app = app;
  }

  /*
   * On mobile we will have objects of many types (shared with other apps)
   * Here we filter to return just ASSET type objects
   */
  assetObjects(item) {
    let assetObj = [];
    try {
      assetObj = item.classusewith.filter((cuw) => {
        /* istanbul ignore else */
        if(cuw.objectname === "ASSET"){
          return cuw.objectname === "ASSET";
        }
      });
    } catch (e) {
      assetObj = [];
    }
    return assetObj.length > 0;
  }

  // istanbul ignore next
  async onAfterLoadData(dataSource, items) {
    let filteredItems = [];
    let data = [];
    const totalCount = dataSource.dataAdapter.totalCount;

    // Initial page size is 1 so we get the totalCount
    // Now we reset and query the full set of classifications and exit
    // This will trigger onAfterLoadData() a second time
    // istanbul ignore else
    if (items.length < totalCount) {
      dataSource.reset({ ...dataSource.options.query, size: totalCount }, true);
      return; // exit after first load
    }

    try {
      filteredItems = items.filter(this.assetObjects);
      filteredItems = this.filterInvalidClassifications(filteredItems);
    } catch (e) {
      // istanbul ignore next
      filteredItems = items;
    }

    
    this.app.state.specData = filteredItems;
    data = this.list_to_tree(filteredItems);

    await this.app.datasources.assetclassdataDS.load({
      src: {
        member: data,
      },
    });
  }

  filterInvalidClassifications(items) {
    const requiredClassifications = [];

    /* istanbul ignore else */
    if (items.length > 0) {
      items.forEach((item) => {

        if(item.orgid) {
          if (item.orgid == this.app.client.userInfo.insertOrg) {
            this.verifySiteId(item, requiredClassifications);
          }
        } else {
          this.verifySiteId(item, requiredClassifications);
        }
      });
    }
    return requiredClassifications;
  }

  verifySiteId(item, requiredClassifications) {
    if (item.siteid) {
      if (item.siteid == this.app.client.userInfo.defaultSite) {
        requiredClassifications.push(item);
      }
    } else {
      requiredClassifications.push(item);
    }
  }

  list_to_tree(list) {
    let map = {},
      node,
      roots = [],
      i;

      // istanbul ignore next
    for (i = 0; i < list.length; i += 1) {
      map[list[i].classstructureid] = i; // initialize the map
    }

      // istanbul ignore next
    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node.parent !== undefined && list[map[node.parent]]) {
        if (
          list[map[node.parent]].children === undefined ||
          list[map[node.parent]].children.length === 0
        ) {
          list[map[node.parent]].children = [];
        }
        list[map[node.parent]].children.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
  }

}

export default ClassificationController;

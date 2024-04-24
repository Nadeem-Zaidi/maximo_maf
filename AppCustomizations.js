// Custom Application Logic
import {Device, log} from '@maximo/maximo-js-api';
 class AppCustomizations {
   applicationInitialized(app) {
     this.app = app;

   }
   onDatasourceInitialized(datasource){
     if(datasource.name==="transportticket"){
       console.log("*****datasource from AppCustomization******")
     console.log(datasource.name)
     console.log("*****datasource from AppCustomization******")

     }

     if(datasource.name==="woSpecification"){
      console.log("*****2nd datasource from AppCustomization******")
     console.log(datasource.name)
   
     console.log("*****2nd datasource from AppCustomization******")

     }
    
   }
   
   onAfterLoadData(Datasource, Item, Query){
      if(Datasource.name==="transportticket"){

        console.log("########## AppCustomization ###########")
        
        console.log(`datasourcename======${Datasource.name}`)

        console.log("########## AppCustomization ###########")
        Item.map((item)=>{console.log(item.assetnum)})
        console.log(`Query======${JSON.stringify(Query)}`)
      }
    } 

     wospecdialogc(page){
       console.log(page)

     this.app.showDialog("woSpecificationDrawer");


    }


    async savethestatehere(event){
      console.log("savethestatehere")
      console.log(event.app)
      console.log(event.page)

      let wosds=event.wospds //event.page.getDatasource('woSpecification')
      console.log("DS HERE")
      console.log(wosds.items.length)
      var objl=[]
      if (wosds.items.length>0){
          wosds.items.forEach((e1)=>{
              var objs={}
              objs['assetattrid']=e1.assetattrid
              objs['alnvalue']=e1.alnvalue
              objs['numvalue']=e1.numvalue
              objl.push(objs)
          })
      }
      console.log("INITIAL PAGE STATE VARIABLE")
      console.log(event.page.state.holdingwospec)
      event.page.state.holdingwospec=objl
      console.log("AFTER PAGE ")
      console.log(event.page.state.holdingwospec)
      console.log(JSON.stringify(objl))
      if (objl.find(e => (e.assetattrid === 'MATERIAL' && e.alnvalue === 'xyz'))) {
  // Usually the same result as above, but find returns the element itself
  
console.log("BLAH BLAH BLAH1")

      }
      console.log("HIDING STARTS HERE")
      console.log(event.page.state.hidingwospec)
      let h1=[]
      let h2={}
if (event.page.state.holdingwospec.find(e => (e.assetattrid === 'BEARTYPE' && e.alnvalue === 'test'))) {
  // Usually the same result as above, but find returns the element itself
      
      h2['SIZE']='SIZE'
      h1.push(h2)

console.log("BLAH BLAH BLAH")

      }
      event.page.state.hidingwospec=h2
      console.log("HIDING ENDS HERE")
      console.log(event.page.state.hidingwospec)

      if (Object.values(event.page.state.hidingwospec).includes('SIZE') > -1){

        console.log("found it")
      }
      console.log(Object.values(event.page.state.hidingwospec))
      if ('SIZE' in event.page.state.hidingwospec){
      console.log("Fount it via in param")
      }
      console.log("DONE HERE")
    }

    async savethissd(event){
      console.log("*******************savethissd*******************")
      console.log(event.page)
      console.log(event.app)
      console.log(event.ds)
      console.log(event.page.state.holdingwospec)
      let wospecnew= event.app.findDatasource("wospecdummyload")//event.app.findDatasource("woSpecification")
      let exwospec=event.ds
      console.log(exwospec.items.length)
      
      let wonum=event.page.params.wonum
      let site=event.page.params.siteid
      console.log(wonum)
      console.log(site)
      await wospecnew.initializeQbe()
      wospecnew.setQBE("wonum","=",wonum)
      wospecnew.setQBE("siteid","=",site)
      await wospecnew.searchQBE()
      await wospecnew.load()
      console.log(wospecnew.items.length)
      var listofobj=[]
      if (exwospec.items.length>0){
          exwospec.items.forEach((e1)=>{
            wospecnew.items.forEach((e2)=>{
            if (e1.workorderspecid === e2.workorderspecid && e1.assetattrid === e2.assetattrid){
              var singobj={}
              e2.alnvalue=e1.alnvalue
              e2.numvalue=e1.numvalue
              singobj['assetattrid']=e2.assetattrid
              singobj['alnvalue']=e1.alnvalue
              singobj['numvalue']=e1.numvalue
              listofobj.push(singobj)
              console.log(e2.assetattrid)
              console.log(e2.alnvalue)
              console.log(e2.numvalue)
            }
            })
          })
      }
      wospecnew.save()
      event.page.findDialog("woSpecificationDrawer").closeDialog()
      console.log(listofobj)
      event.page.state.holdingwospec=listofobj
      console.log(event.page.state.holdingwospec)
      console.log(`JSON======${JSON.stringify(event.page.state.holdingwospec)}`)
      console.log("DONE")
    }
 }

 export default AppCustomizations;
 
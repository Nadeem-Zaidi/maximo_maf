/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */

class CountBookPageController {
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
  }

  async pageResumed(page, app) {
    this.page = page;
    this.app = app;

    this.app.state.isback = false;
    // const countBookResource = this.app.datasources['countBookListDS'];    
    // await countBookResource.load({noCache:true, where:''});
  }

  /**
   * Event handler to show the listed items of the selectd countbook.
   *
   * @param {Object} args - Contains event with page property
   */
  /*
   countBookListGoto(args) {
    this.app.state.isback = false;
    this.app.state.selectedCountBookDesc = args.description;
    this.app.state.param_countbookid = args.countbookid;
    this.app.state.param_countbooknum = args.countbooknum;
    this.app.state.param_countbooksiteid = args.siteid;

    this.app.setCurrentPage({
      name: 'countBookDetail',
      resetScroll: true,
      params: {
        countbookid: args.countbookid,
        siteid: args.siteid,
        href: args.href,
      },
    });
  }
  */

  goBack() {
    this.app.state.isback = true;
    this.app.setCurrentPage({name: 'main'});
  }
}
export default CountBookPageController;

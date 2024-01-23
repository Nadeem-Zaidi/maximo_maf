/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
class CountBookListDataController {
  onDatasourceInitialized(ds, owner, app) {
    this.datasource = ds;
    this.owner = owner;
    this.app = app;
  }
  
  /* Return counted message on count book list page.
   * @param {item} item
   * @return {countMsg} string value
   */
  computedCountedMessage(item) {
    let of = this.app.getLocalizedLabel('of', 'of');
    let counted = this.app.getLocalizedLabel('counted', 'counted');
    let countMsg = item.counted + ' '+of+' ' + item.countbookallitmcount + ' '+counted;
    //istanbul ignore else
    if(item.countbooknum === this.app.state.param_countbooknum && this.app.state.param_countednumber){
      countMsg = this.app.state.param_countednumber + ' '+of+' ' + item.countbookallitmcount + ' '+counted;
    }
    
    return countMsg;
  }
  
  /* Return counted message on count book list page.
   * @param {item} item
   * @return {countMsg} string value
   */
  computedCountedIcon(item) {

    let countIcon = '';
    //istanbul ignore else
    if(item.counted === item.countbookallitmcount) {
      countIcon = 'carbon:checkmark--outline';
    }

    return countIcon;
  }
  
  /* Return past due message on count book list page.
   * @param {item} item
   * @return {pastDueMsg} array value
   */
  computedTags(item) {
    let tagsAry = [];

    //istanbul ignore else
    if(item.status_description) {
      tagsAry.push({label: item.status_description, type: 'dark-gray'});
    }
    //istanbul ignore else
    if(item.numoverdue > 0) {
      let overdue = this.app.getLocalizedLabel('overdue', 'overdue');
      let pastDueLabel = item.numoverdue + ' '+overdue;
      tagsAry.push({label: pastDueLabel, type: 'dark-red'});
    }

    return tagsAry;
  }
  
  /* Return overdue message on count book list page.
   * @param {item} item
   * @return {overdueMsg} string value
   */
  computedOverdueMessage(item) {

    let today = new Date();
    let diff = today - new Date(item.latestdue);
    diff = Math.round(diff / (1000 * 3600 * 24));
    diff = diff.toFixed(0);
    //istanbul ignore next
    let days = this.app.getLocalizedLabel('days', 'days');
    let day = this.app.getLocalizedLabel('day', 'day');
    //istanbul ignore next  
    let dayStr = (diff > 1 ? ' '+days : ' '+day);

    let overdueMsg = '';
    //istanbul ignore else
    if(diff > 0 && item.numoverdue > 0) {
      let overdue = this.app.getLocalizedLabel('overdue', 'overdue');
      overdueMsg = diff + dayStr + ' '+overdue;
    }

    return overdueMsg;
  }
  
  /* Return overdue message on count book list page.
   * @param {item} item
   * @return {overdueMsg} string value
   */
  computedOverdueIcon(item) {

    let today = new Date();
    let diff = today - new Date(item.latestdue);
    diff = Math.round(diff / (1000 * 3600 * 24));
    diff = diff.toFixed(0);

    let overdueIcon = '';
    //istanbul ignore else
    if(diff > 0 && item.numoverdue > 0) {
      overdueIcon = 'carbon:warning--alt--filled';
    }

    return overdueIcon;
  }

  /**
   * Redirects to details page
   * @param {Object} listItem - clicked item from list
   */
   showCBDetail(item) {
    // istanbul ignore else
    this.app.state.isback = false;
    this.app.state.isbackfromLineInvDetail = false;
    this.app.state.selectedCountBookDesc = item.description;
    this.app.state.param_countbookid = item.countbookid;
    // istanbul ignore next
    if (this.app.state.param_countbooknum && (this.app.state.param_countbooknum !== item.countbooknum || this.app.state.param_countbooksiteid !== item.siteid)) {
      this.app.state.countbookchanged = true;
    }
    this.app.state.param_countbooknum = item.countbooknum;
    this.app.state.param_countbooksiteid = item.siteid;
    this.app.state.param_countbookstatus = item.status;
    this.app.state.param_countbookallitmcount = item.countbookallitmcount
    
    this.app.setCurrentPage({
      name: 'countBookDetail',
      resetScroll: true,
      params: {
        countbookid: item.countbookid,
        siteid: item.siteid,
        href: item.href,
      },
    });
  }

}

export default CountBookListDataController;
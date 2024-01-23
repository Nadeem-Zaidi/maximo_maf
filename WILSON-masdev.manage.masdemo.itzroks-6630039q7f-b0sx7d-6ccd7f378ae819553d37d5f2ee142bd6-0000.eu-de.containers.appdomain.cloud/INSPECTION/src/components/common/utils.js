/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18
 *
 * (C) Copyright IBM Corp. 2020,2022 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */
import {INSPECTION_RESPONSE_PROPS} from './../../Constants';

/**
 * Check object group attribute
 *
 * @param {Object} - question object
 * @returns {Boolean}
 */
export const isGroupQuestion = object => {
  if (!object) {
    throw new Error('You must provide an object.');
  }
  return 'inspquestionchild' in object;
};
/**
 * Slice an attribute and its container if it exists
 * Based on select query
 * @param {String} string
 * @param {String} match
 * @returns {String} Part of the string
 */
export const getSelectSlice = (string, match) => {
  if (!string || !match) {
    return string;
  }
  const index = string.indexOf(match);
  if (index < 0) return string;
  let final = index + match.length;
  //if final is a opening bracket, recalcule the final
  //index to find the respective closing bracket
  if (string.charAt(final) === '{') {
    final = respectiveClosingBracketIndex(string, final);
  }
  return string.substring(index, final);
};
/**
 * Get index of respective closing bracket
 * @param {String} string
 * @param {String} final opening bracket index
 * @returns {Number} index of respective closing bracket
 */
export const respectiveClosingBracketIndex = (string, final) => {
  let bracketCounter = 0;
  for (let i = final; i < string.length; i++) {
    if (string.charAt(i) === '{') {
      bracketCounter++;
    } else if (string.charAt(i) === '}') {
      bracketCounter--;
      if (bracketCounter === 0) {
        final = i + 1;
        break;
      }
    }
  }
  return final;
};
/**
 * Map array of visible items
 * @param {*} children 
 * @returns {Array} visible items
 */
const visibleChildrenFiltered = (children = []) => {
  return children.filter(child => child.visible !== false);
};
/**
 * Filter to return the valid inspection items.
 * Children parameter can be array of questions or fields.
 * @param {Array} children - inspection items data
 * @returns {Array} all the required items if there is at least one required, otherwise return all visible items
 */
export const filterValidChildren = children => {
  const requiredChildren = children.filter(child => child.required === true);
  const visibleChildren = visibleChildrenFiltered(children);
  return requiredChildren.length ? requiredChildren : visibleChildren;
};
/**
 * Check if all children are completed
 * @param {Object} children - inspection items data
 * @returns {Boolean} true if all items are completed, false otherwise
 */
export const checkCompletion = (children = []) => {
  const validChildren = filterValidChildren(children);
  return validChildren.length
    ? validChildren.every(item => item.completed === true)
    : false;
};
/**
 *
 * @param {*} children
 * @returns {Boolean} true if any fields is rejected
 */
export const checkRejection = (children = []) => {
  const visibleChildren = visibleChildrenFiltered(children);
  return visibleChildren.length
    ? visibleChildren.some(field => field.rejected === true)
    : false;
};
export const resetFiltered = item => {
  if (item) {
    item.filtered = true;
  }
};
/**
 * Get merged date time value
 * @param {String} date - dateresponse from inspfieldresult context
 * @param {String} time - timeresponse from inspfieldresult context
 * @returns {String} merged date time value if both exists, empty string otherwise
 */
export const getMergedDateTimeValue = (date, time) => {
  let datePart;
  //istanbul ignore next
  if (date && !time) {
    return date;
  }
  //istanbul ignore else
  if (date) {
    let dateIdx = date.indexOf('T');
    datePart = date.substring(0, dateIdx);
  }
  let timePart;
  //istanbul ignore else
  if (time) {
    let idx = time.indexOf('T');
    timePart = time.substring(idx + 1);
  }
  const mergedDateTime = datePart && timePart ? datePart + 'T' + timePart : '';
  return mergedDateTime;
};


export const createInspFieldDS = async (datasource) =>{
 
  let inspfieldresultds =  await getInspFieldDS(datasource);
  //istanbul ignore else
  if(inspfieldresultds){

    if(!inspfieldresultds.getSchema()){
      await inspfieldresultds.initializeQbe() ;
      inspfieldresultds.state.idAttribute = 'href';
    }
    
   
    //istanbul ignore next
    await inspfieldresultds.load();
    inspfieldresultds.state.idAttribute = 'href';
    datasource.get(0, true);
  }
  return inspfieldresultds;
}

export const getInspFieldDS = async (datasource) =>{
  //istanbul ignore else
  if(!datasource.items || !datasource.items[0] || !datasource.options?.query?.select) {
    return;
  }
 
  const inspfieldSelect = INSPECTION_RESPONSE_PROPS.responseProperties;
  const options =  {
    idAttribute:'href',
    pageSize: 10000,
    select:inspfieldSelect,
    query: {selectedRecordHref: datasource.items[0].href,select:inspfieldSelect}
  }; 

  let inspfieldresultds =   await datasource.getChildDatasource(
    'inspfieldresult',
    datasource.items[0],
    options
  );

  if(inspfieldresultds){
    inspfieldresultds.state.idAttribute = 'href';
    if(!inspfieldresultds.getSchema()){
      await inspfieldresultds.initializeQbe() ;
    }
  }
  

 
  return inspfieldresultds;
}
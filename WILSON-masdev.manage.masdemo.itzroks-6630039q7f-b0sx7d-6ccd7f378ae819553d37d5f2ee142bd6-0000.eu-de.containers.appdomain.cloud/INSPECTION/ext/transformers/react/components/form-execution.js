/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2022 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

function handleElement(element, processor, registry, attributes) {
  const {transformer: react} = processor;
  //import component
  react.addFileImport(
    'FormExecution',
    './components/react/FormExecution/FormExecution'
  );
  if (attributes.datasource) {
    if (!react.hasBinding(attributes.datasource)) {
      attributes.datasource = `{app.findDatasource('${attributes.datasource}')}`;
    }
  }
  processor.log.w(`INSPECTION EXECUTION`);
  let attributeList = react.getElementAttributeList(
    registry,
    attributes,
    element,
    processor
  );
  react.appendln(`<FormExecution ${attributeList}/>`);
}
module.exports.default = handleElement;

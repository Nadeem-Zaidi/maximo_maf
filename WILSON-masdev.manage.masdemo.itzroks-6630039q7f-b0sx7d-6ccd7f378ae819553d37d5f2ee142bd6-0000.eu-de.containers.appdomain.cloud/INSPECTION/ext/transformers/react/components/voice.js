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
    'Voice',
    './components/react/Voice/Voice'
  );
  
  processor.log.w(`VOICE`);
  let attributeList = react.getElementAttributeList(
    registry,
    attributes,
    element,
    processor
  );
  react.appendln(`<Voice ${attributeList}/>`);
}
module.exports.default = handleElement;

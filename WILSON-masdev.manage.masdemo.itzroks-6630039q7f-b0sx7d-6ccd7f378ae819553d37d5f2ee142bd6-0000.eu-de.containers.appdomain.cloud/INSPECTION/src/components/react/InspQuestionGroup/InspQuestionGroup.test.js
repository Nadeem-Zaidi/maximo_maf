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

/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import React from 'react';
import renderer from 'react-test-renderer';
import InspQuestionGroup from './InspQuestionGroup';
import {mount} from 'enzyme';
import { ResultProvider } from '../context/ResultContext';
import { StatusProvider } from '../context/StatusContext';
import { ConfigProvider } from '../context/ConfigContext';
import { JSONDataAdapter, Datasource, Device, ObjectUtil } from '@maximo/maximo-js-api';

import {withTwoQuestions, getQuestionTemplate} from './TestUtils';



const createItens = (fields) => {

  const data = {
    items: fields,
    schema: {
      properties: {
        itemnum: {
          type: 'string',
          title: 'Item Number',
          persistent: true
        }
      }
    }
  }

  return data;
}

const getNewDataSource = async (questionGroup, inspectionResult) => {
  let temp =[];

  questionGroup.inspquestionchild?.forEach(inspquestionchild => {
    inspquestionchild.inspfield.forEach(field => {
      temp.push(JSON.parse(JSON.stringify(field)));
    });
  });

  let dataSource = new Datasource(
    new JSONDataAdapter({
      src: JSON.parse(JSON.stringify(createItens(temp)))
    },
      { name: 'tempDS' })
  );
  await dataSource.load();
  let items = dataSource.items;

  inspectionResult.inspfieldresult?.forEach(field => {
    let temp = items.find(i => i.inspfieldnum === field.inspfieldnum);
    if (temp) {
      delete temp.txtresponse;
      delete temp.numresponse;
      delete temp.timeresponse;
      delete temp.dateresponse;
      delete temp.completed;
      ObjectUtil.mergeDeep(temp, field);
    }

  });

  return dataSource;
}


const simpleSetup = ({questionGroup = {}, showInfo}, testRenderer = mount) => {
  return testRenderer(
    <InspQuestionGroup
      id={'questionGroup2'}
      questionGroup={questionGroup}
      showInfo={showInfo}
    />
  );
};




const setup = async ({
  questionGroup = {},
   inspectionResult = {}, 
   showInfo,
  contextStatus = 'INPROG',
  openPreviousResultsDrawer = () => { },
  readConfirmation,
} = {}) => {
  const contextValue = {
    getNewField: () => {
      return {};
    },
    inspResult: inspectionResult
  };
  const inspfieldresultDS = await getNewDataSource(questionGroup, inspectionResult)


  const wrapper = (
    <ConfigProvider
    value={{
      choiceDisplayThreshold: 5
    }}
  >
    <StatusProvider
      value={{
        status: contextStatus,
        readconfirmation: readConfirmation,
        datasource: inspfieldresultDS,
        inspfieldresultDS: inspfieldresultDS,
        openPreviousResultsDrawer: openPreviousResultsDrawer
      }}
    >
    <ResultProvider value={contextValue}>
      <InspQuestionGroup
        id={'questionGroup1'}
        questionGroup={questionGroup}
        showInfo={showInfo}
      />
    </ResultProvider>
    </StatusProvider>
    </ConfigProvider>
  );
  return wrapper;
};

describe('InspQuestionGroup', () => {
  describe('Defaults', () => {
    it('should have default question group', async  () => {
      const inspectionResult = {inspfieldresult: [{inspfieldnum: '1'}]};
      let noQuestionGroup = renderer.create(await setup({inspectionResult}));

      let tree = noQuestionGroup.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should have default showInfo', async () => {
      const wrapper = mount( await setup({questionGroup: {hasld: true}}));

      const infoButton = wrapper.find('Button').first();
      expect(() => {
        infoButton.simulate('click');
      }).not.toThrowError();

      wrapper.unmount();
    });

    it('should render EdgeLegacy with padding-top and margin-top set correctly', () => {
      let device = Device.get();
      device.browser.isEdgeLegacy = true;
      const questionGroup = getQuestionTemplate();

      const wrapper = simpleSetup({questionGroup});
      const refDivStyle = wrapper
        .find('div[id$="_questionGroup_ref"]')
        .getDOMNode().style;
      expect(refDivStyle['padding-top']).toBe('8rem');
      expect(refDivStyle['margin-top']).toBe('-8rem');

      device.browser.isEdgeLegacy = false;
    });
  });

  describe('should render as expected', () => {
    it('render question w/o description',async () => {
      const inspectionResult = {
        inspfieldresult: [{inspfieldnum: '1'}, {inspfieldnum: '2'}]
      };
      const questionGroup = JSON.parse(JSON.stringify(withTwoQuestions));

      //initial setup
      questionGroup.description = '';

      let wrapper = renderer.create( await setup({questionGroup, inspectionResult}));

      let tree = wrapper.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('render question w/o inspquestionchild', async () => {
      const inspectionResult = {
        inspfieldresult: [{inspfieldnum: '1'}, {inspfieldnum: '2'}]
      };
      const questionGroup = JSON.parse(JSON.stringify(withTwoQuestions));

      //initial setup
      delete questionGroup['inspquestionchild'];

      let wrapper = renderer.create(
        await setup({question: questionGroup, inspectionResult})
      );

      let tree = wrapper.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('test question completion', () => {
    it('without question child', () => {
      const questionGroup = getQuestionTemplate();
      questionGroup.inspquestionchild = [];
      const wrapper = simpleSetup({questionGroup});
      expect(wrapper.props().questionGroup.completed).toBeFalsy();
    });

    it('should display completion mark', async () => {
      const inspectionResult = {
        inspfieldresult: [
          {inspfieldnum: '1', txtresponse: 'teste'},
          {inspfieldnum: '2', txtresponse: 'teste'}
        ]
      };
      const questionGroup = JSON.parse(JSON.stringify(withTwoQuestions));

      let wrapper = mount(await setup({questionGroup, inspectionResult}));
      expect(wrapper.props().questionGroup.completed).toBeTruthy();
    });

    describe('with visible as true', () => {
      it('w/o required questions', async() => {
        const inspectionResult = {
          inspfieldresult: [
            {inspfieldnum: '1', txtresponse: 'teste'},
            {inspfieldnum: '2', txtresponse: 'teste'}
          ]
        };
        const questionGroup = JSON.parse(JSON.stringify(withTwoQuestions));

        let wrapper = mount( await setup({questionGroup, inspectionResult}));
        expect(wrapper.props().questionGroup.completed).toBeTruthy();
      });

      it('with first question required', async() => {
        const inspectionResult = {
          inspfieldresult: [
            {inspfieldnum: '1', txtresponse: 'teste'},
            {inspfieldnum: '2', txtresponse: 'teste'}
          ]
        };
        const questionGroup = JSON.parse(JSON.stringify(withTwoQuestions));
        questionGroup.inspquestionchild[0].required = true;
        let wrapper = mount( await setup({questionGroup, inspectionResult}));

        expect(
          wrapper.props().questionGroup.inspquestionchild[0].required
        ).toBeTruthy();
        expect(wrapper.props().questionGroup.completed).toBeTruthy();
      });

      it('with two required questions', async() => {
        const inspectionResult = {
          inspfieldresult: [
            {inspfieldnum: '1', txtresponse: 'test'},
            {inspfieldnum: '2'}
          ]
        };
        const questionGroup = JSON.parse(JSON.stringify(withTwoQuestions));
        questionGroup.inspquestionchild[0].required = true;
        questionGroup.inspquestionchild[1].required = true;
        let wrapper = mount( await setup({questionGroup, inspectionResult}));

        expect(
          wrapper.props().questionGroup.inspquestionchild[0].required
        ).toBeTruthy();
        expect(wrapper.props().questionGroup.completed).toBeFalsy();
        wrapper.unmount();

        inspectionResult.inspfieldresult[1].txtresponse = 'test';
        wrapper = mount( await setup({questionGroup, inspectionResult}));

        expect(wrapper.props().questionGroup.completed).toBeTruthy();
      });
    });

    describe('with visible as false', () => {
      it('w/o required questions - first question not visible',async () => {
        const inspectionResult = {
          inspfieldresult: [
            {inspfieldnum: '1', txtresponse: 'test'},
            {inspfieldnum: '2', txtresponse: 'test'}
          ]
        };
        const questionGroup = JSON.parse(JSON.stringify(withTwoQuestions));
        questionGroup.inspquestionchild[0].visible = false;
        let wrapper = mount( await setup({questionGroup, inspectionResult}));

        expect(wrapper.props().questionGroup.completed).toBeTruthy();
      });

      it('with first question required - second question not visible', async() => {
        const inspectionResult = {
          inspfieldresult: [
            {inspfieldnum: '1', txtresponse: 'test'},
            {inspfieldnum: '2', txtresponse: 'test'}
          ]
        };
        const questionGroup = JSON.parse(JSON.stringify(withTwoQuestions));
        questionGroup.inspquestionchild[0].required = true;
        questionGroup.inspquestionchild[1].visible = false;

        let wrapper = mount( await setup({questionGroup, inspectionResult}));

        expect(wrapper.props().questionGroup.completed).toBeTruthy();
      });
    });
  });

  it('should invoke method to display question instruction', async () => {
    const mockCallBack = jest.fn();
    const wrapper = mount(
      await setup({
        questionGroup: {inspquestionid: 1, hasld: true},
        showInfo: mockCallBack
      })
    );

    const infoButton = wrapper.find('Button').first();
    infoButton.simulate('click');

    const mockCalls = mockCallBack.mock.calls;
    expect(mockCalls.length).toBe(1);
    expect(mockCalls[0][0]).toEqual(
      expect.objectContaining({
        type: expect.any(String),
        questionId: expect.any(Number)
      })
    );
  });

  describe('test required', () => {
    it('with first question required', () => {
      const questionGroup = getQuestionTemplate();
      questionGroup.inspquestionchild = [
        {inspquestionid: 1, required: true},
        {inspquestionid: 2}
      ];
      const wrapper = simpleSetup({questionGroup});

      expect(wrapper.props().questionGroup.required).toBeTruthy();
    });

    it('with two required questions',async() => {
      const inspectionResult = {
        inspfieldresult: [{inspfieldnum: '1'}, {inspfieldnum: '2'}]
      };
      const questionGroup = JSON.parse(JSON.stringify(withTwoQuestions));

      //initial setup
      questionGroup.inspquestionchild[0].inspfield[0].required = true;
      questionGroup.inspquestionchild[0].required = true;

      questionGroup.inspquestionchild[1].inspfield[0].required = true;
      questionGroup.inspquestionchild[1].required = true;

      let wrapper = mount( await setup({questionGroup, inspectionResult}));
      expect(wrapper.props().questionGroup.required).toBeTruthy();
    });
  });

  describe('test visible', () => {
    it('first question not visible', async() => {
      const inspectionResult = {
        inspfieldresult: [{inspfieldnum: '1'}, {inspfieldnum: '2'}]
      };
      const questionGroup = JSON.parse(JSON.stringify(withTwoQuestions));

      //initial setup
      questionGroup.inspquestionchild[0].inspfield[0].visible = false;
      questionGroup.inspquestionchild[0].visible = false;
      questionGroup.visible = true;

      let wrapper = mount( await setup({questionGroup, inspectionResult}));
      expect(wrapper.props().questionGroup.visible).toBeTruthy();
    });

    it('both questions not visible', () => {
      const questionGroup = getQuestionTemplate();
      questionGroup.inspquestionchild = [
        {inspquestionid: 1, visible: false},
        {inspquestionid: 2, visible: false}
      ];
      const wrapper = simpleSetup({questionGroup});
      expect(wrapper.props().questionGroup.visible).toBeFalsy();
    });
  });

  describe('test filtered', () => {
    it('question group has always filtered set to true when form is mounted', () => {
      const questionGroup = getQuestionTemplate();
      questionGroup.inspquestionchild = [
        {inspquestionid: 1, filtered: false},
        {inspquestionid: 2, filtered: false}
      ];
      const wrapper = simpleSetup({questionGroup});
      expect(wrapper.props().questionGroup.filtered).toBeTruthy();
    });
  });
});

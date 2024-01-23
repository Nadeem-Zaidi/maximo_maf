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

import React from 'react';
import renderer from 'react-test-renderer';
import InspQuestion from './InspQuestion';
import { mount } from 'enzyme';
import { ResultProvider } from '../context/ResultContext';
import { StatusProvider } from '../context/StatusContext';
import { ConfigProvider } from '../context/ConfigContext';
import questionCounter from '../../../stores/questionCounter';
import { JSONDataAdapter, Datasource, Device, ObjectUtil } from '@maximo/maximo-js-api';


import { withTwoFields } from './TestUtils';

/**
 * Set new props/context values to a component wrapped by HOC
 * https://github.com/enzymejs/enzyme/issues/1925#issuecomment-490637648
 */


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

const getNewDataSource = async (question, inspectionResult) => {
  let dataSource = new Datasource(
    new JSONDataAdapter({
      src: JSON.parse(JSON.stringify(createItens(question.inspfield)))
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

const setup = async ({
  question = {}, 
  inspectionResult = {},
  firstLevel = false,
  contextStatus = 'INPROG',
  openPreviousResultsDrawer = () => { },
  readConfirmation,
  showInfo
} = {}) => {
  const inspfieldresultDS = await getNewDataSource(question, inspectionResult)

  const contextValue = {
    inspResult: inspectionResult,
    inspfieldresultDS: inspfieldresultDS
  };


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
          <InspQuestion
            id={'question1'}
            question={question}
            firstLevel={firstLevel}
            showInfo={showInfo}
          />
        </ResultProvider>
      </StatusProvider>
    </ConfigProvider>


  );
  return wrapper;
};





describe('test childUpdateHandler', () => {
  it('should call required, visible, completion callbacks and set invalid state', async () => {
    const inspectionResult = { inspfieldresult: [{ inspfieldnum: '1' }, { inspfieldnum: '2' }] };

    const question = JSON.parse(JSON.stringify(withTwoFields));
    question.inspfield[0].visible = false;
    question.inspfield[1].visible = false;

    let wrapper = mount(await setup({ question, inspectionResult }));
    let inspQuestion = wrapper.find('InspQuestion').instance();

    //initial setup
    question.inspfield[0].completed = true;
    question.inspfield[0].required = true;
    question.inspfield[0].visible = true;
    question.inspfield[0].txtresponse = 'completed'

    //initial props
    expect(inspQuestion.props.isComplete).toBeFalsy();
    expect(inspQuestion.props.isRequired).toBeFalsy();
    expect(inspQuestion.props.isVisible).toBeFalsy();

    //sinalizes that required changed to true, complete to true and invalid kept false
    inspQuestion.childUpdateHandler({ required: true, complete: true, visible: true });

    //updated props
    expect(inspQuestion.props.isComplete).toBeTruthy();
    expect(inspQuestion.props.isRequired).toBeTruthy();
    expect(inspQuestion.props.isVisible).toBeTruthy();

    inspQuestion.childUpdateHandler({ required: true, complete: true, visible: true, filter: () => true });
    expect(inspQuestion.props.isFiltered).toBeTruthy();

    inspQuestion.childUpdateHandler({ required: true, complete: true, visible: true, filter: () => false });
    expect(inspQuestion.props.isFiltered).toBeFalsy();
  });
});

describe('InspQuestion', () => {

  describe('Defaults', () => {

    it('should have default question', async () => {
      const inspectionResult = { inspfieldresult: [{ inspfieldnum: '1' }] };

      let noQuestion = renderer.create(await setup({ inspectionResult }));

      let tree = noQuestion.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render without errors', async () => {
      let wrapper = mount(await setup());
      const container = wrapper.find('InspQuestion');
      expect(container.length).toBe(1);
      wrapper.unmount();
    });

    it('should render EdgeLegacy with padding-top and margin-top set correctly', async () => {
      let device = Device.get();
      device.browser.isEdgeLegacy = true;
      const question = JSON.parse(JSON.stringify(withTwoFields));

      let wrapper = mount(await setup({ question }));
      const refDivStyle = wrapper.find('div[id$="_question_ref"]').getDOMNode().style
      expect(refDivStyle['padding-top']).toBe('8rem')
      expect(refDivStyle['margin-top']).toBe('-8rem')

      device.browser.isEdgeLegacy = false;
    });

  });

  describe('should render as expected', () => {
    it('render with firstLevel prop as true', async () => {
      const inspectionResult = { inspfieldresult: [{ inspfieldnum: '1' }, { inspfieldnum: '2' }] };

      let noQuestion = renderer.create(
        await setup({ question: withTwoFields, inspectionResult, firstLevel: true })
      );

      let tree = noQuestion.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('render question w/o description', async () => {
      const inspectionResult = { inspfieldresult: [{ inspfieldnum: '1' }, { inspfieldnum: '2' }] };
      const question = JSON.parse(JSON.stringify(withTwoFields));

      //initial setup
      question.description = '';

      let noQuestion = renderer.create(
        await setup({ question: question, inspectionResult })
      );

      let tree = noQuestion.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('render question w/o inspfield', async () => {
      const inspectionResult = { inspfieldresult: [{ inspfieldnum: '1' }, { inspfieldnum: '2' }] };
      const question = JSON.parse(JSON.stringify(withTwoFields));

      //initial setup
      delete question['inspfield'];

      let noQuestion = renderer.create(
        await setup({ question: question, inspectionResult })
      );

      let tree = noQuestion.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('render question w/o inspfield and with groupId', async () => {
      const inspectionResult = { inspfieldresult: [{ inspfieldnum: '1' }, { inspfieldnum: '2' }] };
      const question = JSON.parse(JSON.stringify(withTwoFields));

      //initial setup
      delete question['inspfield'];
      question.groupid = 1;

      let noQuestion = renderer.create(
        await setup({ question: question, inspectionResult })
      );

      let tree = noQuestion.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('test question completion', () => {

    describe('with visible as true', () => {
      it('w/o required fields', async () => {
        const question = {
          inspquestionid: 1,
          inspquestionnum: '001',
          inspfield: [
            {
              inspfieldid: 1,
              inspfieldnum: '0001',
              visible: true,
              fieldtype: 'TR',
              fieldtype_maxvalue: 'TR'
            },
            {
              inspfieldid: 2,
              inspfieldnum: '0002',
              visible: true,
              fieldtype: 'TR',
              fieldtype_maxvalue: 'TR'
            }
          ]
        };

        const inspectionResult = {
          inspfieldresult: [
            { inspfieldnum: '0001', txtresponse: 'a' },
            { inspfieldnum: '0002', txtresponse: 'b' }
          ]
        };

        let wrapper = mount(await setup({ question, inspectionResult }));
        expect(wrapper.props().question.completed).toBeTruthy();
      });

      it('with first field required', async () => {
        const question = {
          inspquestionid: 1,
          inspquestionnum: '001',
          inspfield: [
            {
              inspfieldid: 1,
              inspfieldnum: '0001',
              visible: true,
              required: true,
              fieldtype: 'TR',
              fieldtype_maxvalue: 'TR'
            },
            {
              inspfieldid: 2,
              inspfieldnum: '0002',
              visible: true,
              required: false,
              fieldtype: 'TR',
              fieldtype_maxvalue: 'TR'
            }
          ]
        };

        const inspectionResult = {
          inspfieldresult: [
            { inspfieldnum: '0001', txtresponse: 'a' },
            { inspfieldnum: '0002' }
          ]
        };

        let wrapper = mount(await setup({ question, inspectionResult }));


        expect(wrapper.props().question.completed).toBeTruthy();
      });

      it('with two required fields', async () => {
        const question = {
          inspquestionid: 1,
          inspquestionnum: '001',
          inspfield: [
            {
              inspfieldid: 1,
              inspfieldnum: '0001',
              fieldtype: 'TR',
              fieldtype_maxvalue: 'TR',
              visible: true,
              required: true
            },
            {
              inspfieldid: 2,
              inspfieldnum: '0002',
              fieldtype: 'TR',
              fieldtype_maxvalue: 'TR',
              visible: true,
              required: true
            }
          ]
        };

        let inspectionResult = {
          inspfieldresult: [
            { inspfieldnum: '0001', txtresponse: 'a' },
            { inspfieldnum: '0002' }
          ]
        };

        let wrapper = mount(await setup({ question, inspectionResult }));
        expect(wrapper.props().question.completed).toBeFalsy();

        inspectionResult = {
          inspfieldresult: [
            { inspfieldnum: '0001', txtresponse: 'a' },
            { inspfieldnum: '0002', txtresponse: 'b' }
          ]
        };

        wrapper = mount(await setup({ question, inspectionResult }));
        expect(wrapper.props().question.completed).toBeTruthy();
      });
    });

    describe('with visible as false', () => {
      it('w/o required fields - first field not visible', async () => {
        const question = {
          inspquestionid: 1,
          inspquestionnum: '001',
          inspfield: [
            {
              inspfieldid: 1,
              inspfieldnum: '0001',
              fieldtype: 'TR',
              fieldtype_maxvalue: 'TR',
              visible: false,
              required: false
            },
            {
              inspfieldid: 2,
              inspfieldnum: '0002',
              fieldtype: 'TR',
              fieldtype_maxvalue: 'TR',
              visible: true,
              required: false
            }
          ]
        };
        const inspectionResult = {
          inspfieldresult: [
            { inspfieldnum: '0002', txtresponse: 'a' },
            { inspfieldnum: '0001' }
          ]
        };

        let wrapper = mount(await setup({ question, inspectionResult }));
        expect(wrapper.props().question.completed).toBeTruthy();
      });

      it('with first field required - second field not visible', async () => {
        const question = {
          inspquestionid: 1,
          inspquestionnum: '001',
          inspfield: [
            {
              inspfieldid: 1,
              inspfieldnum: '0001',
              fieldtype: 'TR',
              fieldtype_maxvalue: 'TR',
              visible: true,
              required: true
            },
            {
              inspfieldid: 2,
              inspfieldnum: '0002',
              fieldtype: 'TR',
              fieldtype_maxvalue: 'TR',
              visible: false,
              required: false
            }
          ]
        };

        const inspectionResult = {
          inspfieldresult: [
            { inspfieldnum: '0001', txtresponse: 'a' },
            { inspfieldnum: '0002' }
          ]
        };

        let wrapper = mount(await setup({ question, inspectionResult }));
        expect(wrapper.props().question.completed).toBeTruthy();
      });
    });
  });

  describe('test required', () => {
    it('with first field required', async () => {
      const inspectionResult = { inspfieldresult: [{ inspfieldnum: '1' }, { inspfieldnum: '2' }] };

      const question = JSON.parse(JSON.stringify(withTwoFields));

      //initial setup
      question.inspfield[0].required = true;

      let wrapper = mount(await setup({ question, inspectionResult }));
      expect(wrapper.props().question.required).toBeTruthy();
    });

    it('with two required fields', async () => {
      const inspectionResult = { inspfieldresult: [{ inspfieldnum: '1' }, { inspfieldnum: '2' }] };
      const question = JSON.parse(JSON.stringify(withTwoFields));

      //initial setup
      question.inspfield[0].required = true;
      question.inspfield[1].required = true;

      let wrapper = mount(await setup({ question, inspectionResult }));
      expect(wrapper.props().question.required).toBeTruthy();
    });
  });

  describe('test visible', () => {
    it('first field not visible', async () => {
      const inspectionResult = { inspfieldresult: [{ inspfieldnum: '1' }, { inspfieldnum: '2' }] };

      const question = JSON.parse(JSON.stringify(withTwoFields));

      //initial setup
      question.visible = true;
      question.inspfield[0].visible = false;

      let wrapper = mount(await setup({ question, inspectionResult }));
      expect(wrapper.props().question.visible).toBeTruthy();
    });

    it('both fields not visible', async () => {
      const inspectionResult = { inspfieldresult: [{ inspfieldnum: '1' }, { inspfieldnum: '2' }] };
      const question = JSON.parse(JSON.stringify(withTwoFields));

      //initial setup
      question.inspfield[0].visible = false;
      question.inspfield[1].visible = false;

      let wrapper = mount(await setup({ question, inspectionResult }));
      expect(wrapper.props().question.visible).toBeFalsy();
    });
  });

  describe('test filtered', () => {
    it('question has always filtered set to true when form is mounted', async () => {
      const inspectionResult = { inspfieldresult: [{ inspfieldnum: '1' }, { inspfieldnum: '2' }] };
      const question = JSON.parse(JSON.stringify(withTwoFields));

      //initial setup
      question.inspfield[0].filtered = false;
      question.inspfield[1].filtered = false;

      let wrapper = mount(await setup({ question, inspectionResult }));
      expect(wrapper.props().question.filtered).toBeTruthy();
    });

    it('checkFiltered should return true if all children are filtered', async () => {
      const question = JSON.parse(JSON.stringify(withTwoFields));
      let wrapper = mount(await setup({ question }));

      const filter = wrapper.find('InspQuestion').instance().checkFiltered(question.inspfield);
      expect(filter).toBeTruthy();
    })

    it('checkFiltered should return false if at least one child is not filtered', async () => {
      const question = JSON.parse(JSON.stringify(withTwoFields));
      let wrapper = mount(await setup({ question }));

      question.inspfield[0].filtered = false;

      const filter = wrapper.find('InspQuestion').instance().checkFiltered(question.inspfield);
      expect(filter).toBeFalsy();
    })
  });

  describe('test with question counter', () => {

    let wrapper;
    let updateSpy;
    let removeSpy;

    beforeAll(() => {
      updateSpy = jest.spyOn(questionCounter, 'update');
      removeSpy = jest.spyOn(questionCounter, 'remove');
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should update question through counter', async () => {
      wrapper = mount(await setup());
      expect(updateSpy).toHaveBeenCalled();
    });

    it('should remove question through counter', () => {
      wrapper.unmount();
      expect(removeSpy).toHaveBeenCalled();
    });
  });

});

it('should have default showInfo method', async () => {

  //initial setup
  const question = {
    inspquestionid: 1,
    hasld: true
  }

  const wrapper = mount(await setup({ question }));

  const infoButton = wrapper.find('Button').first();

  expect(() => {
    infoButton.simulate('click');
  }).not.toThrow();

});

it('should invoke method to display question instruction', async () => {
  const mockCallBack = jest.fn();
  const inspectionResult = { inspfieldresult: [{ inspfieldnum: '1' }, { inspfieldnum: '2' }] };

  const question = JSON.parse(JSON.stringify(withTwoFields));

  //initial setup
  question.inspquestionid = 1;
  question.hasld = true;

  const wrapper = mount(await setup({ question, inspectionResult, showInfo: mockCallBack }));

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

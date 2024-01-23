/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18
 *
* (C) Copyright IBM Corp. 2020 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */
import React from 'react';
import {INSPECTION_RESPONSE_PROPS} from './../../../Constants';
import {UIBus} from '@maximo/react-components';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {Datasource, log, Debouncer,ObjectUtil, AppSwitcher} from '@maximo/maximo-js-api';
import {BaseComponent, InlineLoading, Box} from '@maximo/react-components';
import FormGroup from '../../../container/FormGroup/FormGroup';
import {createInspFieldDS} from '../../common/utils';
import questionCounter from '../../../stores/questionCounter';
import executionStore from '../context/ExecutionStore';
import {StatusProvider} from '../context/StatusContext';
import {MetersProvider} from '../context/InspectionAssetLocationMetersContext';
import {ConfigProvider} from '../context/ConfigContext';
import './FormExecution.scss';
const TAG = 'FormExecution';
/**
 * A `FormExecution` is the entry point to start/continue answering an Inspection.
 * This component renders a list of InspectionResult
 */
const FormExecution = observer(
  class FormExecution extends React.Component {
    constructor(props) {
      super(props);
      this.updateDS = this.updateDS.bind(this);
      this.createInspfieldresultDS= this.createInspfieldresultDS.bind(this);
      this.getApp = this.getApp.bind(this);
      questionCounter.callbackRegister(props.onChange);
      this.debouncer = new Debouncer(200);
      this.state = {
        inspfieldresultDS: null,
        inspectionresultId: null
      };
      this.app = AppSwitcher.get().currentApp;
    }

    async createInspfieldresultDS(){
      //istanbul ignore else
      if(!this.state.inspfieldresultDS || this.state.inspfieldresultDS?.items[0]?.resultnum !== this.props.datasource?.items[0]?.resultnum ){
        
        let ds = await createInspFieldDS(this.props.datasource);
        this.setState({inspfieldresultDS: ds})
        //istanbul ignore else
        if(this.app){
          this.app.state.loadingForm = false;
        } 
      }
        UIBus.emit('inspections-field-reset');
   }
    /**
     * Try to fetch app instance from datasource
     * @param {Datasource} datasource
     * @returns {Object | null}
     */
    getApp(datasource) {
      if (datasource.options.appResolver) {
        return datasource.options.appResolver();
      }
      return null;
    }
    /**
     * Temporary workaround while waiting for defects (GRAPHITE-21298 | GRAPHITE-19410)
     * Invoke Datasource save method
     */
    updateDS(response) {
      const {datasource} = this.props;
      clearTimeout(this.updateTimeout);
        const sendRequest=  async () => {
             let inspfieldresultds = this.state.inspfieldresultDS;
             const options = {
              objectStructure: 'mxapiinspectionres',
              responseProperties: INSPECTION_RESPONSE_PROPS.responseProperties//,
            ///  relationship :'inspfieldresult'
             }
             let item ={};
             let itemAttr;

            if(!response.href){
             
              itemAttr= [
                'anywhererefid','inspectionimageinference', 'txtresponse','numresponse','dateresponse','timeresponse','inspformnum',
                'revision','resultnum','orgid','siteid', 'enteredby' , 'entereddate', 'inspquestionnum',
                'inspfieldnum','inspfieldresultselection','readconfirmation', 'plussgeojson','actionrequired'
                ,'errormessage', 'errorflag','rolloverflag', 'metername']
            
            } else{
              itemAttr= [
                'anywhererefid','inspectionimageinference', 'txtresponse','numresponse','dateresponse','timeresponse',
                'revision','resultnum','orgid','siteid', 'enteredby' , 'entereddate', 'inspquestionnum',
                'inspfieldnum','inspfieldresultselection','readconfirmation', 'plussgeojson','actionrequired',
                'errormessage', 'errorflag','rolloverflag', 'metername'];
            }  
          
            itemAttr.forEach(attr =>{
              item[attr]=response[attr];
            });               
            
            delete item._rowstamp;
            
            const deleteRowstamp = (list) =>{
              if(list && list.length){
                list.forEach(s =>{
                  delete s._rowstamp;
                 });
              }
            }
            deleteRowstamp(item.inspfieldresultselection);
            deleteRowstamp(item.inspectionimageinference);
            
          let newResponse;
            if(!response.href && !response.anywhererefid){
              newResponse =  await inspfieldresultds.add(item ,options);
            } else{
              if(response.href?.includes("http")){
               newResponse = item.href = response.href;
              }
              newResponse = await inspfieldresultds.update(item ,options);
            }

            // istanbul ignore next
            if (this.getApp(datasource).device?.isMobile ){
              let temp =   inspfieldresultds.items.find( 
                i => (i.inspfieldnum === response.inspfieldnum )
              )
              if (temp &&  newResponse){
                ObjectUtil.mergeDeep(temp, newResponse);
              }   
            }
            
            UIBus.emit('update-field-refresh',{response:response, ds:inspfieldresultds});
          this.props.updateDialog();
     };
     sendRequest();
    }

    componentDidMount() {
      UIBus.on('inspections-load-form', this.createInspfieldresultDS);
      UIBus.on('inspections-load-update', this.createInspfieldresultDS);
      UIBus.on('save-mvi-update', this.updateDS);
    }

    //istanbul ignore next
    componentWillUnmount() {
      UIBus.off('inspection-block', () => {
        this.isBlocked = false;
      });
      UIBus.off('inspections-load-form', this.createInspfieldresultDS);
      UIBus.off('inspections-load-update', this.createInspfieldresultDS);
      UIBus.off('save-mvi-update', this.updateDS);
    }

    render() {
      log.d(TAG, `Rendering inspection execution`);
      const {datasource, id, showInfo, meters} = this.props;
      const fieldResultSchema =
        datasource.getFieldData('inspfieldresult').items;
      executionStore.setFieldResultSchema(fieldResultSchema);
      const app = this.getApp(datasource);
      const executor = app ? app.client.userInfo : undefined;
      const {items: inspections} = datasource;
      if (this.props.loading) {
        return <Loader />;
      }

      if (datasource.state.loading) {
        return <Loader />;
      }
      // istanbul ignore else
      if (!inspections || !inspections.length) {
        log.d(TAG, `No inspections`);
        return null;
      }
      return (
        <ConfigProvider
          value={{
            choiceDisplayThreshold: this.props.choiceDisplayThreshold || 10
          }}
        >
          <StatusProvider
            value={{
              status: inspections[0].status_maxvalue,
              readconfirmation: inspections[0].inspectionform
                ? // istanbul ignore next
                  inspections[0].inspectionform.readconfirmation
                : false,
              datasource: this.props.datasource,
              updateDialog: this.props.updateDialog,
              inspfieldresultDS: this.state.inspfieldresultDS,
              openPreviousResultsDrawer: this.props.openPreviousResultsDrawer
            }}
          >
            <MetersProvider value={meters}>
              <FormGroup
                items={inspections}
                id={`${id}_formgroup`}
                executor={executor}
                updateDS={this.updateDS}
                showInfo={showInfo}
              />
            </MetersProvider>
          </StatusProvider>
        </ConfigProvider>
      );
    }
    async componentDidUpdate() {
       this.props.onLoad();
    }
  }
);
const Loader = () => (
  <Box
    direction='column'
    horizontalAlign='stretch'
    marginBottom='0.5'
    marginStart='0.5'
    marginEnd='0.5'
    id={`formExecution_loader_box_wrapper`}
  >
    <InlineLoading fill={false} center={true} />
  </Box>
);
// Set default props
FormExecution.defaultProps = {
  updateDialog: () => {}
};
FormExecution.propTypes = {
  id: PropTypes.string.isRequired,
  datasource: PropTypes.instanceOf(Datasource).isRequired,
  meters: PropTypes.array,
  onLoad: PropTypes.func,
  updateDialog: PropTypes.func,
  loading: PropTypes.bool
};
export default BaseComponent(FormExecution);
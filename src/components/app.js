import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootStore from '../store';
import Dialog from '../containers/dialog';
import Taskbar from '../containers/taskBar';
import SideBar from '../containers/sideBar';
import {
    modules,
    moduleSubFunctions
} from '../common/config/modules';
import ContorlMT from '../common/components/controlMT/controlMT'
import ControlDetail from '../common/components/controlMT/controlDetail'
import WaterForm from '../common/components/form/waterForm'
import OreForm from '../common/components/form/oreForm'
import GasForm from '../common/components/form/gasForm'
import Personnel from '../common/components/personnel/personnel'
import PersonnelForm from '../common/components/form/personnelForm'
import Analysis from '../common/components/Analysis/Analysis'

import './app.css';



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootStore, 
    {
        modules: modules,
        moduleMap: moduleSubFunctions,
        currentModule: modules[1].value
    },
    composeEnhancers(
        applyMiddleware(thunk)
    )
);


export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            list:[1],
            formName:"",
            show:"none",
            childData:"",
            childId:"",
            showTreeId:"",
            showFromId:''
        }
        Object.assign(this.state,this.props)
        this.getStateData = this.getStateData.bind(this)
    }
    
    showTree=(id)=>{
        this.setState({
            show:true
        })
        sessionStorage.setItem("color",0)
        sessionStorage.setItem("showFromId",id)
        if(id == 1){
            this.setState({
                formID:1
            })
            let func = this.refs.contorl.getControlData
            func()
        }
        if(id == 2){
            this.setState({
                formID:2
            })
            let func = this.refs.contorl.getpointData
            func()
         }
         if(id == 3){
            this.setState({
                formID:3
            })
            let func = this.refs.contorl.getGasdata
            func()
         }
         if(id == 4){
            this.setState({
                formID:4
            })
            let func = this.refs.contorl.getjidiandata
            func()
         }
         if(id == 5){
            this.setState({
                show:"none"
            })
            this.setState({
                formID:5
            })
         }
    }
    getStateData=(name,aid)=>{
     
       let showFromId = sessionStorage.getItem("showFromId")
       console.log(name)
       if(showFromId == 1){
        let func = this.refs.WaterForm.getWaterData
        func(1,name)
       }
       if(showFromId == 2){
        let func = this.refs.OreForm.getOreData
        func(1,name)
       }
       if(showFromId == 3){
        let func = this.refs.GasForm.getGasdata
      
        func(1,name)
       }
       if(showFromId == 4){
        let func = this.refs.ControlDetail.getDetaildata
        
        func(name)
       }
       if(name == 6){
        this.setState({
            formID:6,
            show:"none"
        })
       }
    }
    render () {
        return (
            <div
                className="MainContainer"
            >
           
            {this.state.formID == 1?<WaterForm ref="WaterForm" getStateData={this.getStateData}/>:""}
            {this.state.formID == 2?<OreForm ref="OreForm"/>:""}
            {this.state.formID == 3?<GasForm ref="GasForm"/>:""}
            { this.state.formID == 4?<ControlDetail ref="ControlDetail"/>:""}
             {this.state.formID == 5?<PersonnelForm/>:""}
            {this.state.formID == 6?<Analysis/>:""}
         
           <div className="Lbtn">
               <button onClick={this.showTree.bind(this,1)}>水压</button>
               <button onClick={this.showTree.bind(this,2)}>矿压</button>
               <button onClick={this.showTree.bind(this,3)}>瓦斯</button>
               <button onClick={this.showTree.bind(this,4)}>机电</button>
               <button onClick={this.showTree.bind(this,5)}>人员定位</button>
           </div>
                <Provider
                    store={store}
                >
                    <div>Hello啊,饭已OK了，下来密西吧</div>
                    <div
                        className="ContentContainer"
                    >
                        <SideBar />
                        <Dialog
                            title="功能窗口一"
                            id="d1"
                        >
                            <p>d1</p>
                        </Dialog>
                        <Dialog
                            title="功能窗口二"
                            id="d2"
                            width={304}
                           height={500}
                        >
                      <ContorlMT ref="contorl" show={this.state.show} getStateData={this.getStateData}/>
                      {this.state.formID == 5?<Personnel/>:""}
                            <p>d2</p>
                        </Dialog>
                    </div>
                    <div
                        className="FooterContainer"
                    >
                        <Taskbar />
                    </div>
                </Provider>
               
            </div>
        );
    }
}
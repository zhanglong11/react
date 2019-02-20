import React, { Component } from 'react';
import './controlDetail.css'
import axios from 'axios'

export default class ContorlDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            allList:[
                {Mname:'1#风机运行状态',
                 state:"停止",},
                 {Mname:'1#风机电压',
                 state:"10.50",},
                 {Mname:'1#风机电流',
                 state:"18.99",},
                 {Mname:'1#风机A相温度',
                 state:"42.8",},
                 {Mname:'1#风机B相温度',
                 state:"47.8",},
                 {Mname:'1#风机C相温度',
                 state:"54.2",},
                 {Mname:'1#风机风量',
                 state:"550.10",},
                 {Mname:'1#风机风速',
                 state:"7.10",},
                 {Mname:'1#风机全压',
                 state:"1.15",},
            ],
            detailData:[]
        }
    }
    componentDidMount(){
        this.getDetaildata(30)
    }
    getDetaildata=(tid)=>{
        axios.get("http://39.96.201.178:8090/api/sys/search",{
            params:{
                systypeId:tid
            }
        }).then(res=>{
                   
                    let list = res.data.data[0]
                   
                   this.setState({
                    detailData:list
                   })
                })
    }
    render(){
        let left = this.state.allList.map((value,key)=>{
            return (
                <div key={key}>
                   {value.Mname}
                </div>
            )
        })
        // let right = this.state.allList.map((value,key)=>{
        //     return (
        //         <div>
        //             <input value={value.state} disabled="disabled"/>kv
        //         </div>
        //     )
        // })
        return (
            <div className="detailContainer">
                <div className="Mname">
                    {left}
                </div>
                <div className="state">
                {/* {right} */}
                  <button disabled="disabled">{this.state.detailData.state == 0?<span>停止</span>:<span>运行</span>}</button><br/>
                  <input defaultValue= { this.state.detailData.voltage}/> KV<br/>
                  <input defaultValue={this.state.detailData.electric}/> A<br/>
                  <input defaultValue={this.state.detailData.atemperature}/> ℃<br/>
                  <input defaultValue={this.state.detailData.btemperature}/> ℃<br/>
                  <input defaultValue={this.state.detailData.ctemperature}/> ℃<br/>
                  <input defaultValue={this.state.detailData.airVolume}/> m³/min<br/>
                  <input defaultValue={this.state.detailData.windSpeed}/> m/s<br/>
                  <input defaultValue={this.state.detailData.totalPressure}/> pa
                </div>
             
            </div>
        )
    }
}
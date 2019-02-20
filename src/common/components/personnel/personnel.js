import React, { Component } from 'react';
import './personnel.css'
import Axios from 'axios';

export default class personnel extends Component{
    constructor(props){
        super(props);
        this.state = {
            totalPer:"",
            personData:[]
        }
    }
    componentDidMount(){
        this.getpersonTree()
    }
    getpersonTree=()=>{
        Axios.get("http://39.96.201.178:8090/api/dept/postionTotal").then(res=>{
            let perTotal = 0
            res.data.forEach(item => {
                 perTotal = perTotal + item.positionPerTotal
            });
           
            this.setState({
                personData:res.data,
                totalPer:perTotal
            })
        })
    }
    render(){
        let person = this.state.personData.map((value,key)=>{
            return (
                <p key ={key}><span>{value.positionName}</span><span>{value.positionPerTotal}</span><span>浏览</span></p>
            )
        })
        return(
            <div className="person">
                <p><span>井下总人数：</span><span>{this.state.totalPer}</span><span>浏览</span></p>
                {person}
            </div>
        )
    }
}
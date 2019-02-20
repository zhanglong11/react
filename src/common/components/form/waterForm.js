import React, { Component } from 'react';
import './waterFrom.css'
import Table from  'rc-table';
import PageNation from '../pageNation/pageNation'
import axios from 'axios';



export default class waterFrom extends Component{
    constructor(props){
        super(props);
        this.state = {
          totle:250,
          currentPage:1,
            columns : [{
                title: '主站编号', dataIndex: 'masterNum', key:'masterNum', width: 100,align:"center"
              }, {
                title: '主站名称', dataIndex: 'masterName', key:'masterName', width: 100,align:"center"
              }, {
                title: '分站名称', dataIndex: 'branchName', key:'branchName', width: 100,align:"center"
              }, {
                title: '分站编号', dataIndex: 'branchNum', key:'branchNum', align:"center"
              },
              {
                title: '测点编号', dataIndex: 'num', key:'num', align:"center"
              },
              {
                title: '钻孔名称', dataIndex: 'name', key:'name', align:"center"
              },
              {
                title: '检测类型', dataIndex: 'type', key:'type', align:"center"
              },
              {
                title: '测点类型', dataIndex: 'nature', key:'nature', align:"center"
              },
              {
                title: '钻孔地点', dataIndex: 'address', key:'drillAddress', align:"center"
              },
              {
                title: '警戒上限', dataIndex: 'upperLimit', key:'warningUp', align:"center"
              },
              {
                title: '警戒下限', dataIndex: 'lowerLimit', key:'warningDown', align:"center"
              },
              {
                title: '时间', dataIndex: 'createTime', key:'time', align:"center"
              },
              {
                title: '水压', dataIndex: 'pressure', key:'waterGage', align:"center"
              },
              {
                title: '水位', dataIndex: 'position', key:'waterLevel', align:"center"
              },
              {
                title: '流量', dataIndex: 'flow', key:'flow', align:"center"
              }, {
                title: '温度', dataIndex: 'temperature', key:'temperature', align:"center"
              }],
              data :[
                // { index: 'Jack', name: 28, otherName: 'some where', otherindex:'',textIndex:'123',drillName:"11" ,detectionType:"44"},
                // { index: 'Rose', name: 36, otherName: 'some where', otherindex:'2',textIndex:"112" ,drillName:"11",detectionType:"55"},
              ],
              className:"table",
              pageSize:10
        }
        Object.assign(this.state,this.props)
        
    }
    onChange = (page) => {
      this.setState({
        currentPage: page,
      });
      this.getWaterData(page,'')
    }
    componentDidMount(){
      let formName = sessionStorage.getItem("formName")
      if(formName == ""){
        this.getWaterData(1,'')
        
      }
      else{
        this.getWaterData(1,formName)
        console.log(formName)
      }
    }
    
    getWaterData=(id,name)=>{
      axios.get("http://39.96.201.178:8090/api/water/search",{
        params:{
          currentPage:id,
          name:name
        }
      }).then(res=>{
         this.setState({
            data:res.data.data,
            totle:res.data.total,
            // pageSize:res.data.pageSize
         })
      })
    }
    
    render(){
     
        return(
            <div className="waterFrom">
                <span  className="qushi" onClick={()=>this.props.getStateData(6)}>趋势分析</span>
               <Table columns={this.state.columns} data={this.state.data}  className="table" rowKey={record => record.uid}/>
               <PageNation totalPage={this.state.totle} current={this.state.currentPage} onChange={this.onChange}/>
            </div>
        )
    }
}
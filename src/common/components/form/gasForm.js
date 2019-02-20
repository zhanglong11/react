import React, { Component } from 'react';
import './waterFrom.css'
import Table from  'rc-table';
import PageNation from '../pageNation/pageNation'
import axios from 'axios';

export default class gasForm extends Component{
    constructor(props){
        super(props);
        this.state = {
          totle:250,
          currentPage:1,
            columns : [{
                title: '序号', dataIndex: 'id', key:'index', width: 100,align:"center"
              }, {
                title: '测点编号', dataIndex: 'measNum', key:'name', width: 100,align:"center"
              }, {
                title: '测点名称', dataIndex: 'measName', key:'otherName', width: 100,align:"center"
              }, {
                title: '区域名称', dataIndex: 'regionName', key:'otherindex', align:"center"
              },
              {
                title: '分站号', dataIndex: 'substationNum', key:'textIndex', align:"center"
              },
              {
                title: '温度', dataIndex: 'temperature', key:'drillName', align:"center"
              },
              {
                title: '风速', dataIndex: 'windSpeed', key:'detectionType', align:"center"
              },
              {
                title: '一氧化碳', dataIndex: 'carbonMonoxide', key:'pointType', align:"center"
              },
              {
                title: '瓦斯', dataIndex: 'gas', key:'drillAddress', align:"center"
              },
              {
                title: '二氧化碳', dataIndex: 'carbonDioxide', key:'warningUp', align:"center"
              },
              {
                title: '粉尘', dataIndex: 'dust', key:'warningDown', align:"center"
              },
              {
                title: '风压', dataIndex: 'windPressure', key:'time', align:"center"
              },
              {
                title: '瓦斯涌出量', dataIndex: 'gasConcentration', key:'waterGage', align:"center"
              },
              {
                title: '风量', dataIndex: 'airVolume', key:'waterLevel', align:"center"
              },
              {
                title: '矿尘', dataIndex: 'flow', key:'flow', align:"center"
              }, {
                title: '硫化氢', dataIndex: 'hydrogenSulfide', key:'temperature', align:"center"
              }, {
                title: '氧气', dataIndex: 'oxygen', key:'o2', align:"center"
              }],
              data :[],
              className:"table"
        }
    }
    onChange = (page) => {
   
      this.setState({   
        currentPage: page,
      });
      this.getGasdata(page,"")
    }
    componentDidMount(){
      this.getGasdata(1,'')
    }
    getGasdata=(id,aid)=>{
      axios.get("http://39.96.201.178:8090/api/point/search",{
        params:{
          currentPage:id,
          aid:aid
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
            <div className="gasFrom">
               <Table columns={this.state.columns} data={this.state.data}  className="table"/>
               <PageNation totalPage={this.state.totle} current={this.state.currentPage} onChange={this.onChange}/>
            </div>
        )
    }
}
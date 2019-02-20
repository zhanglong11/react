import React, { Component } from 'react';
import './personnelForm.css'
import Table from  'rc-table';
import PageNation from '../pageNation/pageNation'
import 'rc-tree/assets/index.css';
import Tree, { TreeNode } from 'rc-tree';
import PropTypes from 'prop-types';

import axios from 'axios';




export default class persinnel extends Component{
    static propTypes = {
        keys: PropTypes.array,
      };
      static defaultProps = {
        keys: ['0-0-0-0'],
      };
    constructor(props){
        super(props);
        const keys = props.keys;
        this.state = {
            defaultExpandedKeys: keys,
            defaultSelectedKeys: keys,
            defaultCheckedKeys: keys,
            selectedKeys: ['0-1', '0-1-1'],
            dataList:[],
            treeData : [
                { key: '10', title: '分站人数', children:[
                    { key: '0-0-0', title: '办公室', children:[{ key: '0-0-0-0', title: '二级目录1' },],
                    },
                    { key: '0-0-1', title: '安全科', children:
                        [
                          { key: '0-0-1-0', title: '测量员' },
                         
                        ],
                    },
                    { key: '0-0-2', title: '机电科', children:
                    [
                      { key: '0-0-2-1', title: '维修一队' },
                    
                    ],
                },
                { key: '12', title: '领导团队', children:
                [
                  { key: '0-0-3-1', title: '二级目录1' },
                  
                ],
            },
            { key: '0-0-4', title: '文件目录5', children:
            [
              { key: '0-0-4-1', title: '二级目录1' },
              
            ],
        },
                  ],
                },
              ],
          totle:250,
          currentPage:1,
            columns : [{
                title: '序号', dataIndex: 'id', key:'index', width: 100,align:"center"
              }, {
                title: '工号', dataIndex: 'jobNum', key:'name', width: 100,align:"center"
              }, {
                title: '部门', dataIndex: 'department', key:'otherName', width: 100,align:"center"
              }, {
                title: '工种', dataIndex: 'typeWork', key:'otherindex', align:"center"
              },
              {
                title: '职务', dataIndex: 'post', key:'textIndex', align:"center"
              },
              {
                title: '发射器编号', dataIndex: 'launcherNum', key:'drillName', align:"center"
              },
              {
                title: '进入区域时间', dataIndex: 'startTime', key:'detectionType', align:"center"
              },
              {
                title: '累计停留时间', dataIndex: 'endTime', key:'pointType', align:"center"
              },
              {
                title: '当前位置信息', dataIndex: 'posInformation', key:'drillAddress', align:"center"
              },
            ],
              data :[
                { index: 'Jack', name: 28, otherName: 'some where', otherindex:'',textIndex:'123',drillName:"11" ,detectionType:"44"},
                { index: 'Rose', name: 36, otherName: 'some where', otherindex:'2',textIndex:"112" ,drillName:"11",detectionType:"55"},
                { index: 'Rose', name: 36, otherName: 'some where', otherindex:'2',textIndex:"112" ,drillName:"11",detectionType:"55"},
                { index: 'Rose', name: 36, otherName: 'some where', otherindex:'2',textIndex:"112" ,drillName:"11",detectionType:"55"},
                { index: 'Rose', name: 36, otherName: 'some where', otherindex:'2',textIndex:"112" ,drillName:"11",detectionType:"55"},

            ],
              className:"table"
        }
    }
    onExpand = (expandedKeys) => {
        console.log('onExpand', expandedKeys);
      };
      onSelect = (selectedKeys, info) => {
      this.getPersonData(selectedKeys[0])
      };
      onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
      };
      onEdit = () => {
        setTimeout(() => {
          console.log('current key: ', this.selKey);
        }, 0);
      };
      onDel = (e) => {
        if (!window.confirm('sure to delete?')) {
          return;
        }
        e.stopPropagation();
      };
      componentDidMount(){
        this.getPersonData(8)
        this.getPersontree()
      }
      getPersonData=(num)=>{
        axios.get("http://39.96.201.178:8090/api/dept/search",{
          params:{
            deptTypeId:num
          }
        }).then(res=>{
          this.setState({
            data:res.data.data,
            totle:res.data.total,
         })
        })
        
      }
      getPersontree=()=>{
        axios.get("http://39.96.201.178:8090/api/dept/loadMeasTree").then(res=>{
         let list = res.data
         list[0].key = list[0].aid
         list[0].children = list[0].child
         list[0].title = list[0].name
         list[0].child.forEach(item => {
            item.key = item.aid
            item.children = item.child
            item.title = item.name
         });
         console.log(list)
         this.setState({
          treeData:list
         })
     
        })
      }
      onChange = (page) => {
   
        this.setState({   
          currentPage: page,
        });
        this.getPersonData(page)
      }
      showForm=(aid)=>{
        
        this.getPersonData(aid)
      }
      mouseDown=()=>{
        console.log(123)
      }
    render(){
        return(
          
            <div className="personForm">
                <div className="personLeft">
                <Tree
                    className="myCls"
                    showLine
                    autoExpandParent={true}
                    selectable={ true }
                    defaultExpandAll
                    onExpand={this.onExpand}
                    defaultSelectedKeys={this.state.defaultSelectedKeys}
                    defaultCheckedKeys={this.state.defaultCheckedKeys}
                    onSelect={this.onSelect}
                    onCheck={this.onCheck}
                    treeData={this.state.treeData}
                  
                    />
                    {/* {data} */}
       
        {/* <div className="header"><input type = "text"/> <img src={imgSearch} className="search"/></div> */}
                </div>
                <div className="personRight">
                        <Table columns={this.state.columns} data={this.state.data}  className="table"/>
                    <PageNation totalPage={this.state.totle} current={this.state.currentPage} onChange={this.onChange}/>
                </div>
            
            </div>
        )
    }
}
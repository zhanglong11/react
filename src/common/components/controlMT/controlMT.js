import React, { Component } from 'react';
import './controlMT.css'
import axios from 'axios'
import PropTypes from 'prop-types';
import Tree, { TreeNode } from 'rc-tree';





export default class ControlMT extends Component{
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
            guanc:"所有观测点",
            dataList:[],
            n:0,
            downMenu1:false,
            downMenu2:false,
            color:'pink',
            display2:'block',
            display:"none",
            colorkey:0,
            none:"none",
            treeData : [],
            selectedKeys:""
        }
        Object.assign(this.state,this.props)
    }
    
    onExpand = (expandedKeys) => {
        console.log('onExpand', expandedKeys);
      };
      onSelect = (selectedKeys, info) => {
        this.setState({
            selectedKeys:selectedKeys
        })
        console.log(this.state.selectedKeys)
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
        let colorid = sessionStorage.getItem("color")
        console.log(colorid)
        this.setState({
            colorkey:colorid
        })
        console.log(this.state.colorkey)
    }
    getControlData=()=>{//水压树
        axios.get("http://39.96.201.178:8090/api/water/loadTreeNode").then(res=>{
                    let list = res.data
                    list.forEach(item=>{
                        item.key = item.aid
                        item.children = item.child
                        item.title = item.name
                        item.children.forEach(item1=>{
                            item1.key = item1.aid
                            item1.children = item1.child
                            item1.title = item1.name
                        })
                    })
                    console.log(list)
                    this.setState({
                        treeData:list
                    })
        })
    }
    getpointData=()=>{//矿压树
        axios.get("http://39.96.201.178:8090/api/pressure/loadMeasTree").then(res=>{
            let list = res.data
            list.forEach(item=>{
                item.key = item.aid
                item.children = item.child
                item.title = item.name
                item.children.forEach(item1=>{
                    item1.key = item1.aid
                    item1.children = item1.child
                    item1.title = item1.name
                })
            })
            console.log(list)
            this.setState({
                treeData:list
            })
           })
    }
    getjidiandata=()=>{//机电树
        axios.get("http://39.96.201.178:8090/api/sys/loadMeasTree").then(res=>{
            let list = res.data
            list.forEach(item=>{
                item.key = item.aid
                item.children = item.child
                item.title = item.name
                item.children.forEach(item1=>{
                    item1.key = item1.aid
                    item1.children = item1.child
                    item1.title = item1.name
                })
            })
            console.log(list)
            this.setState({
                treeData:list
            })
        })
    }
    getGasdata=()=>{//瓦斯树
        axios.get("http://39.96.201.178:8090/api/point/loadMeasTree").then(res=>{
            let list = res.data
            list.forEach(item=>{
                item.key = item.aid
                item.children = item.child
                item.title = item.name
                item.children.forEach(item1=>{
                    item1.key = item1.aid
                    item1.children = item1.child
                    item1.title = item1.name
                })
            })
            console.log(list)
            this.setState({
                treeData:list
            })
        })
    }
    changeColor=(key)=>{
        sessionStorage.removeItem('color');
        this.setState({
            colorkey:key
        })
    }
    
    render(){
        return(
            <div className="controlMT" style={{display:this.props.show}}>
                <div className="header"><input type = "text"/><span>详情 》</span></div>
                <div className="warp">
                {/* <p className={this.state.colorkey == 0 || sessionStorage.getItem("color") == 0?'color':''}>所有观测点</p> */}
                    {/* {data} */}
                    <Tree
                    className="myCls"
                    showLine
                    autoExpandParent={true}
                    selectable={ true }
                    defaultExpandAll={true}
                    onExpand={this.onExpand}
                    defaultSelectedKeys={this.state.defaultSelectedKeys}
                    defaultCheckedKeys={this.state.defaultCheckedKeys}
                    onSelect={ (selectedKeys, info)=>this.props.getStateData(selectedKeys[0])}
                    onCheck={ this.onCheck}
                    treeData={this.state.treeData}
                   
                    />
                </div>
                
            </div>
        )
    }
}
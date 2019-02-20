import React, { Component } from 'react';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';


export default class pageNation extends Component{
    constructor(props){
        super(props);
        this.state = {
         
        }
    }
    onChange = (page) => {
        console.log(page);
        this.setState({
          current: page,
        });
      }
      itemRender = (current, type, element) => {
        if (type === 'page') {
          return <a href={`#${current}`}>{current}</a>;
        }
        return element;
      };
      textItemRender = (current, type, element) => {
        if (type === 'prev') {
          return '< 上一页';
        }
        if (type === 'next') {
          return '下一页 >';
        }
        return element;
      };
    render(){
        return (
            <div className="page">
                <Pagination onChange={this.props.onChange} current={this.props.current} total={this.props.totalPage} itemRender={this.textItemRender}/>
             
            </div>
        )
    }
}
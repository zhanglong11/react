import React, { Component } from 'react';
import './oreFrom.css'
import Table from  'rc-table';
import PageNation from '../pageNation/pageNation'
import DatePicker from 'antd/lib/date-picker';  // 加载 JS
import 'antd/lib/date-picker/style/css';        // 加载 CSS
import locale from 'antd/lib/date-picker/locale/zh_CN';
import Axios from 'axios';
const { RangePicker } = DatePicker;



export default class oreForm extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="oreFrom">
           123
            </div>
        )
    }
}
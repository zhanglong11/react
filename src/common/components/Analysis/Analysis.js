import React from 'react';
import Highcharts from 'highcharts';
import  './Analysis.css'
import DatePicker from 'antd/lib/date-picker';  // 加载 JS
import 'antd/lib/date-picker/style/css';        // 加载 CSS
import locale from 'antd/lib/date-picker/locale/zh_CN';
import Axios from 'axios';
const { RangePicker } = DatePicker;




export default class extends React.Component {

  componentDidMount() {
    // this.renderGraph();
    this.getAnalysisList()
  }

  // renderGraph = () => {
    
  // }
  onChange1=(date,dateString)=>{
    console.log(dateString)
  }
  
  getAnalysisList=()=>{
    Axios.get("http://39.96.201.178:8090/api/water/statistic ").then(res=>{
      let Data = {
        title: { //表头
          text: ''
        },

        yAxis: { //y坐标
          title: {
            text: ''
          }
        },
        xAxis:{
          categories: ["",'一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']

      },
        legend: {
          layout: 'horizontal',
          align: 'left',
          verticalAlign: 'top'
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: false
            },
            pointStart: 1
          }
        },
        series: res.data,
        responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'top'
          }
        }
      }]
    },
        credits: { //去掉版权logo
          enabled: false
        }
      }
      Highcharts.chart(this.refs.alarmHighChart, Data);
    })
  }
  render() {
    return (
        <div className="analysisForm">
            <h5 className="analysisTitle">趋势分析</h5>
            <div className="analysisCon">
                <div className="analysisTop">

                    <span className="sec blue" ref='btn1' >按月</span><span className="sec" ref='btn2' >按日</span><span className="sec" ref='btn3' >按时</span>
                    <RangePicker placeholder={['开始时间','结束时间']} onChange={this.onChange1}  locale={locale}/>
                    <span className="sec blue" >统计</span>
                </div>
                <div ref="alarmHighChart" />
            </div>
        </div>
      
    );
  }
}

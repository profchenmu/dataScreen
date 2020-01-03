import echarts from 'echarts';
import socketIOClient from 'socket.io-client';
import moment from 'moment';
import config from '../config';
import { style } from 'd3';
// initialize echarts instance with prepared DOM
const myChart = echarts.init(document.querySelector('#main'));
// const officeLineChart = echarts.init(document.querySelector('#office-line'));
// const industryLineChart = echarts.init(document.querySelector('#industry-line'));
// const industrialParkLineChart = echarts.init(document.querySelector('#industrial-park-line'));
// const retailLineChart = echarts.init(document.querySelector('#retail-line'));
// draw chart
const colorPalette = ['#00DEFF', '#FFA820', '#00E59A', 'yellow', 'red', '#efa18d', '#787464', '#cc7e63', '#724e58', '#4b565b'];

const socket = socketIOClient(config.url);
// var dom = document.getElementById("container");
// var myChart = echarts.init(dom);
var app = {};
let option: any = null;
option = {
    color: colorPalette,
    // tooltip: {
    //     trigger: 'axis',
    //     axisPointer: {            // 坐标轴指示器，坐标轴触发有效
    //         type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    //     }
    // },
    grid: {
        top: 0,
        left: 0,
        right: 0,
        bottom: '15px',
        containLabel: true,
        show: false
    },
    // xAxis: {
    //     data: ['East', 'South', 'North', 'West', 'Hong Kong'],
    //     name: 'X Axis',
    //     axisLine: { onZero: true },
    //     splitLine: { show: false },
    //     splitArea: { show: false }
    // },
    xAxis: {
        data: ['East', 'South', 'North', 'West', 'Hong Kong'],
        axisLabel: {
            inside: false,
            textStyle: {
                color: '#fff'
            }
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        },
        z: 10
    },
    yAxis: {
        show: false,
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            textStyle: {
                color: '#999'
            }
        }
    },
    series: [
        {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            stack: 'one',
            data: [62, 5, 5, 1, 5],
            // itemStyle: {
            //     color: colorPalette[0]
            // }
        },
        {
            name: 'bar3',
            type: 'bar',
            stack: 'one',
            barWidth: '60%',
            // emphasis: emphasisStyle,
            data: [12, 10, 7, 9, 1],
            // itemStyle: {
            //     color: colorPalette[1]
            // }
        },
    ]
};
;
// if (option && typeof option === "object") {
myChart.setOption(option, true);
// }
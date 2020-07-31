import echarts from 'echarts';
import socketIOClient from 'socket.io-client';
import config from '../config';
import './smallchart1.scss';
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
socket.emit('cliStart', { cliRequire: 'lineDataMessage' });

socket.on('lineDataMessage', (d: any) => {
    const data = d.message.map((e: any) => {
        return e.Value;
    });
    option = {
        grid: {
            top: 10,
            left: 5,
            right: 5,
            bottom: 0,
            containLabel: true,
            show: false
        },
        xAxis: {
            type: 'category',
            data: ['18-Jul',
                '18-Aug',
                '18-Sep',
                '18-Oct',
                '18-Nov',
                '18-Dec',
                '19-Jan',
                '19-Feb',
                '19-Mar',
                '19-Apr',
                '19-May',
                '19-Jun',
                '19-Jul',
                '19-Aug',
                '19-Sep',
                '19-Oct',
                '19-Nov'],
            splitLine: {
                show: false
            },
            axisLabel: {
                color: '#fff',
                fontSize: 20,
            },
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            },
            axisTick: {
                lineStyle: {
                    color: '#fff'
                }
            }
        },
        yAxis: {
            type: 'value',
            splitLine: {
                show: false,
            },
            axisLabel: {
                color: '#fff',
                fontSize: 20
            },
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            },
            axisTick: {
                lineStyle: {
                    color: '#fff'
                }
            },

        },
        series: [{
            data: data,
            type: 'line',
            itemStyle: {
                color: '#e30613'
            },
        }]
    };
    // if (option && typeof option === "object") {
    myChart.setOption(option, true);

    // }
})
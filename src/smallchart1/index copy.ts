import echarts from 'echarts';
import socketIOClient from 'socket.io-client';
import moment from 'moment';
import config from '../config';
// initialize echarts instance with prepared DOM
const myChart = echarts.init(document.querySelector('#main'));
// const officeLineChart = echarts.init(document.querySelector('#office-line'));
// const industryLineChart = echarts.init(document.querySelector('#industry-line'));
// const industrialParkLineChart = echarts.init(document.querySelector('#industrial-park-line'));
// const retailLineChart = echarts.init(document.querySelector('#retail-line'));
// draw chart
const colorPalette = ['#00DEFF', '#FFA820', '#00E59A', 'yellow', 'red', '#efa18d', '#787464', '#cc7e63', '#724e58', '#4b565b'];

const socket = socketIOClient(config.url);
console.log('aaaaaaaaaaa')
interface Ipie {
    entity: string,
    property_type: string,
    Area: number
    unit: string
    percent: string
}
interface Iline {
    entity: string,
    property_type: string,
    date: Date,
    Area: number
    unit: string
}
// socket.on('pieMessage', (data: any) => {
// const pieData: [Ipie] = data.message;

// const names: [string?] = []
// const displayData = pieData.map((e, i) => {
//     names.push(e.property_type)
//     return {
//         value: e.Area,
//         name: e.property_type,
//         itemStyle: {
//             color: colorPalette[i],
//         }
//     }
// })


var xAxisData: any = [];
var data1 = [];
var data2 = [];
var data3 = [];
var data4 = [];

for (var i = 0; i < 10; i++) {
    // xAxisData.push('Class' + i);
    // data1.push((Math.random() * 2).toFixed(2));
    // data2.push(-Math.random().toFixed(2));
    data3.push((Math.random() * 5).toFixed(2));
    data4.push((Math.random() + 0.3).toFixed(2));
}

// var emphasisStyle = {
//     itemStyle: {
//         barBorderWidth: 1,
//         shadowBlur: 10,
//         shadowOffsetX: 0,
//         shadowOffsetY: 0,
//         shadowColor: 'rgba(0,0,0,0.5)'
//     }
// };

const option: any = {
    backgroundColor: '#eee',
    // legend: {
    //     data: ['bar', 'bar2', 'bar3', 'bar4'],
    //     left: 10
    // },
    // brush: {
    //     toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
    //     xAxisIndex: 0
    // },
    // toolbox: {
    //     feature: {
    //         magicType: {
    //             type: ['stack', 'tiled']
    //         },
    //         dataView: {}
    //     }
    // },
    // tooltip: {},
    xAxis: {
        data: xAxisData,
        name: 'X Axis',
        axisLine: { onZero: true },
        splitLine: { show: false },
        splitArea: { show: false }
    },
    yAxis: {
        // inverse: true,
        splitArea: { show: false }
    },
    grid: {
        // show: false,
        left: 100
    },
    // visualMap: {
    //     type: 'continuous',
    //     dimension: 1,
    //     text: ['High', 'Low'],
    //     inverse: true,
    //     itemHeight: 200,
    //     calculable: true,
    //     min: -2,
    //     max: 6,
    //     top: 60,
    //     left: 10,
    //     inRange: {
    //         colorLightness: [0.4, 0.8]
    //     },
    //     outOfRange: {
    //         color: '#bbb'
    //     },
    //     controller: {
    //         inRange: {
    //             color: '#2f4554'
    //         }
    //     }
    // },

    series: [
        // {
        //     name: 'bar',
        //     type: 'bar',
        //     stack: 'one',
        //     // emphasis: emphasisStyle,
        //     data: data1
        // },
        // {
        //     name: 'bar2',
        //     type: 'bar',
        //     stack: 'one',
        //     // emphasis: emphasisStyle,
        //     data: data2
        // },
        {
            name: 'bar3',
            type: 'bar',
            stack: 'one',
            // emphasis: emphasisStyle,
            data: data3
        },
        {
            name: 'bar4',
            type: 'bar',
            stack: 'one',
            // emphasis: emphasisStyle,
            data: data4
        }
    ]
};

// myChart.on('brushSelected', renderBrushed);

// function renderBrushed
//     () {
// var brushed = [];
// var brushComponent = params.batch[0];

// for (var sIdx = 0; sIdx < brushComponent.selected.length; sIdx++) {
//     var rawIndices = brushComponent.selected[sIdx].dataIndex;
//     brushed.push('[Series ' + sIdx + '] ' + rawIndices.join(', '));
// }

myChart.setOption({
    title: {
        backgroundColor: '#333',
        // text: 'SELECTED DATA INDICES: \n' + brushed.join('\n'),
        bottom: 0,
        right: 0,
        // width: 100,
        textStyle: {
            fontSize: 12,
            color: '#fff'
        }
    }
});
// }
// });
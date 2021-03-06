import echarts from 'echarts';
import socketIOClient from 'socket.io-client';
import moment from 'moment';
import config from '../config';
// initialize echarts instance with prepared DOM
// const myChart = echarts.init(document.querySelector('#main'));
const officeLineChart = echarts.init(document.querySelector('#office-line'));
const industryLineChart = echarts.init(document.querySelector('#industry-line'));
const industrialParkLineChart = echarts.init(document.querySelector('#industrial-park-line'));
const retailLineChart = echarts.init(document.querySelector('#retail-line'));
// draw chart
const colorPalette = ['#e30613', '#f6f5f1', '#00AED6', '#0079AF', '#005589', 'red', '#efa18d', '#787464', '#cc7e63', '#724e58', '#4b565b'];

const socket = socketIOClient(config.url);

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
    Value: number
    Area: number
    unit: string
}
// socket.emit('cliStart', { cliRequire: 'pieMessage' });
// socket.on('pieMessage', (data: any) => {
//     const pieData: [Ipie] = data.message;
//     const names: [string?] = []
//     const displayData = pieData.map((e, i) => {
//         names.push(e.property_type);
//         console.log(e)
//         // const ele = document.querySelector(`#${e.property_type}-percent`)
//         // ele.innerHTML = `${e.Area}`
//         let ele: any
//         switch (e.property_type) {
//             case 'Office/Commercial':
//                 ele = document.querySelector(`#office-percent`)
//                 ele.innerHTML = `${e.percent}`;
//                 break;
//             case 'Industrial':
//                 ele = document.querySelector(`#industry-percent`)
//                 ele.innerHTML = `${e.percent}`;
//                 break;
//             case 'Retail':
//                 ele = document.querySelector(`#retail-percent`)
//                 ele.innerHTML = `${e.percent}`;
//                 break;
//             case 'Business Park':
//                 ele = document.querySelector(`#industrial-park-percent`)
//                 ele.innerHTML = `${e.percent}`;
//                 break;
//         }
//         return {
//             value: e.Area,
//             name: e.property_type,
//             itemStyle: {
//                 color: colorPalette[i],
//             }
//         }
//     })
//     // myChart.setOption({
//     //     legend: {
//     //         show: false,
//     //         orient: 'vertical',
//     //         // x: 'left',
//     //         data: names
//     //     },
//     //     series: [
//     //         {
//     //             // name: 'title',
//     //             type: 'pie',
//     //             radius: ['30%', '90%'],
//     //             avoidLabelOverlap: false,
//     //             label: {
//     //                 normal: {
//     //                     show: false,
//     //                     position: 'center'
//     //                 },
//     //                 emphasis: {
//     //                     show: false,
//     //                     textStyle: {
//     //                         fontSize: '30',
//     //                         fontWeight: 'bold'
//     //                     }
//     //                 }
//     //             },
//     //             labelLine: {
//     //                 normal: {
//     //                     show: false
//     //                 }
//     //             },
//     //             data: displayData
//     //         }
//     //     ]
//     // });
// });
socket.emit('cliStart', { cliRequire: 'officeLineMessage' });
socket.on('officeLineMessage', (d: any) => {
    const officeLineData: [Iline] = d.message;
    const date: any = []
    const data: any = []
    officeLineData.forEach((e: any, i: number) => {
        date.push(moment(e.Month, 'YYYY-MM').format('YYYY-MM'));
        // if (i === 0 || i === officeLineData.length - 1) {
        //     date.push(moment(e.Month, 'YYYY-MM').format('YYYY'));
        // } else {
        //     date.push('')
        // }

        data.push(e.Area)
    })
    const mock = [120, 145, 166, 177, 200, 223, 555, 666];
    // const mockDate = officeLineData.map((e: any, i: number) => {
    //     // if (i === 0 || i === data.length - 1) {
    //     //     return moment(e.Month, 'YYYY-MM').format('YYYY')
    //     // } else {
    //     //     return ''
    //     // }
    //     return moment(e.Month, 'YYYY-MM').format('YYYY')
    //     // return e.Month;
    // })
    const options: any = {
        grid: {
            top: '10px',
            left: '30px',
            // right: 0,
            bottom: 0,
            // bottom: '10px',
            containLabel: true,
            show: false
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: date,
            show: true,
            // splitNumber: 1,
            axisLine: {
                show: false,
                onZero: false,

            },
            silent: true,
            axisTick: {
                show: false
            },
            axisLabel: {
                inside: false,
                color: '#fff'
            },
        },
        yAxis: {
            show: true,
            splitNumber: 1,
            position: 'right',
            axisLabel: {
                inside: false,
                color: '#fff'
            },
            axisLine: {
                show: true,
                onZero: false,
                lineStyle: {
                    color: '#fff'
                }
            },
            axisTick: {
                lineStyle: {
                    color: '#fff'
                }
            },
            splitLine: {
                show: false,
            },
            type: 'value',
        },
        series: [
            {
                name: 'Office',
                type: 'line',
                smooth: true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    color: colorPalette[0]
                },
                // markLine: {
                //     symbolSize: 0,
                //     data: [
                //         { type: 'max', name: 'Max' },
                //         { type: 'min', name: 'Min' },
                //     ]
                // },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: colorPalette[0]
                    }, {
                        offset: 1,
                        color: colorPalette[0] //'rgba(0, 222, 255, 0.7)'
                    }])
                },
                data: data
            }
        ]
    }
    officeLineChart.setOption(options);

});
socket.emit('cliStart', { cliRequire: 'industryLineMessage' });
socket.on('industryLineMessage', (d: any) => {

    const industryLineData: [Iline] = d.message;
    const date: any = []
    const data: any = []
    industryLineData.forEach((e: any, i: number) => {
        date.push(moment(e.Month, 'YYYY-MM').format('YYYY-MM'));
        // if (i === 0 || i === industryLineData.length - 1) {
        //     date.push(moment(e.Month, 'YYYY-MM').format('YYYY'));
        // } else {
        //     date.push('')
        // }
        data.push(e.Area)
    })
    const mock = [1206, 1457, 1663, 1774, 2005, 2236, 5557, 6666];

    // const mockDate = industryLineData.map((e: any, i: number) => {
    //     if (i === 0 || i === industryLineData.length - 2) {
    //         return moment(e.Month, 'YYYY-MM').format('YYYY')
    //     } else {
    //         return ''
    //     }
    // })
    // console.log(data, mockDate, industryLineData)
    const options: any = {
        grid: {
            top: '10px',
            left: '30px',
            // right: 0,
            bottom: 0,
            // bottom: '10px',
            containLabel: true,
            show: false
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: date,
            show: true,
            // splitNumber: 1,
            axisLine: {
                show: false,
                onZero: false,

            },
            silent: true,
            axisTick: {
                show: false
            },
            axisLabel: {
                inside: false,
                color: '#fff'
            },
        },
        yAxis: {
            show: true,
            splitNumber: 1,
            position: 'right',
            axisLabel: {
                inside: false,
                color: '#fff'
            },
            axisLine: {
                show: true,
                onZero: false,
                lineStyle: {
                    color: '#fff'
                }
            },
            axisTick: {
                lineStyle: {
                    color: '#fff'
                }
            },
            splitLine: {
                show: false,
            },
            type: 'value',
        },
        series: [
            {
                name: 'Office',
                type: 'line',
                smooth: true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    color: colorPalette[0]
                },
                // markLine: {
                //     symbolSize: 0,
                //     data: [
                //         { type: 'max', name: 'Max' },
                //         { type: 'min', name: 'Min' },
                //     ]
                // },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: colorPalette[0]
                    }, {
                        offset: 1,
                        color: colorPalette[0] //'rgba(0, 222, 255, 0.7)'
                    }])
                },
                data: data
            }
        ]
    }
    industryLineChart.setOption(options);

});
socket.emit('cliStart', { cliRequire: 'industrialParkLineMessage' });
socket.on('industrialParkLineMessage', (d: any) => {
    const industrialParkLineData: [Iline] = d.message;
    const date: any = []
    const data: any = []
    industrialParkLineData.forEach((e: any, i: number) => {
        date.push(moment(e.Month, 'YYYY-MM').format('YYYY-MM'));
        // if (i === 0 || i === industrialParkLineData.length - 1) {
        //     date.push(moment(e.Month, 'YYYY-MM').format('YYYY'));
        // } else {
        //     date.push('')
        // }
        data.push(e.Area)
    })
    const mock = [12077, 14577, 16666, 17766, 20066, 22366, 55566, 66666];
    // const mockDate = industrialParkLineData.map((e: any, i: number) => {
    //     if (i === 0 || i === industrialParkLineData.length - 1) {
    //         return moment(e.Month, 'YYYY-MM').format('YYYY')
    //     } else {
    //         return ''
    //     }
    // })
    // console.log(data, mockDate, industrialParkLineData)
    const options: any = {
        grid: {
            top: '10px',
            left: '30px',
            // right: 0,
            bottom: 0,
            // bottom: '10px',
            containLabel: true,
            show: false
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: date,
            show: true,
            // splitNumber: 1,
            axisLine: {
                show: false,
                onZero: false,

            },
            silent: true,
            axisTick: {
                show: false
            },
            axisLabel: {
                inside: false,
                color: '#fff'
            },
        },
        yAxis: {
            show: true,
            splitNumber: 1,
            position: 'right',
            axisLabel: {
                inside: false,
                color: '#fff'
            },
            axisLine: {
                show: true,
                onZero: false,
                lineStyle: {
                    color: '#fff'
                }
            },
            axisTick: {
                lineStyle: {
                    color: '#fff'
                }
            },
            splitLine: {
                show: false,
            },
            type: 'value',
        },
        series: [
            {
                name: 'Office',
                type: 'line',
                smooth: true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    color: colorPalette[0]
                },
                // markLine: {
                //     symbolSize: 0,
                //     data: [
                //         { type: 'max', name: 'Max' },
                //         { type: 'min', name: 'Min' },
                //     ]
                // },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: colorPalette[0]
                    }, {
                        offset: 1,
                        color: colorPalette[0] //'rgba(0, 222, 255, 0.7)'
                    }])
                },
                data: data
            }
        ]
    }
    industrialParkLineChart.setOption(options);

});
socket.emit('cliStart', { cliRequire: 'retailLineMessage' });
socket.on('retailLineMessage', (d: any) => {
    const retailLineData: [Iline] = d.message;
    const date: any = []
    const data: any = []
    retailLineData.forEach((e: any, i: number) => {
        date.push(moment(e.Month, 'YYYY-MM').format('YYYY-MM'));
        // if (i === 0 || i === retailLineData.length - 1) {
        //     date.push(moment(e.Month, 'YYYY-MM').format('YYYY'));
        // } else {
        //     date.push('')
        // }
        data.push(e.Area)
    })
    const mock = [120, 145, 166, 177, 200, 223, 555, 666];
    // const mockDate = retailLineData.map((e: any, i) => {
    //     if (i === 0 || i === retailLineData.length - 1) {
    //         return moment(e.Month, 'YYYY-MM').format('YYYY')
    //     } else {
    //         return ''
    //     }
    // })
    const options: any = {
        grid: {
            top: '10px',
            left: '30px',
            // right: 0,
            bottom: 0,
            // bottom: '10px',
            containLabel: true,
            show: false
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: date,
            show: true,
            // splitNumber: 1,
            axisLine: {
                show: false,
                onZero: false,

            },
            silent: true,
            axisTick: {
                show: false
            },
            axisLabel: {
                inside: false,
                color: '#fff'
            },
        },
        yAxis: {
            show: true,
            splitNumber: 1,
            position: 'right',
            axisLabel: {
                inside: false,
                color: '#fff'
            },
            axisLine: {
                show: true,
                onZero: false,
                lineStyle: {
                    color: '#fff'
                }
            },
            axisTick: {
                lineStyle: {
                    color: '#fff'
                }
            },
            splitLine: {
                show: false,
            },
            type: 'value',
        },
        series: [
            {
                name: 'Office',
                type: 'line',
                smooth: true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    color: colorPalette[0]
                },
                // markLine: {
                //     symbolSize: 0,
                //     data: [
                //         { type: 'max', name: 'Max' },
                //         { type: 'min', name: 'Min' },
                //     ]
                // },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: colorPalette[0]
                    }, {
                        offset: 1,
                        color: colorPalette[0] //'rgba(0, 222, 255, 0.7)'
                    }])
                },
                data: data
            }
        ]
    }
    retailLineChart.setOption(options);

});


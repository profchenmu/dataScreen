import echarts from 'echarts';
import socketIOClient from 'socket.io-client';
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
// var dom = document.getElementById("container");
// var myChart = echarts.init(dom);
var app: any = {};
let option: any = null;

var posList = [
    'left', 'right', 'top', 'bottom',
    'inside',
    'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
    'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
];

app.configParameters = {
    rotate: {
        min: -90,
        max: 90
    },
    align: {
        options: {
            left: 'left',
            center: 'center',
            right: 'right'
        }
    },
    verticalAlign: {
        options: {
            top: 'top',
            middle: 'middle',
            bottom: 'bottom'
        }
    },
    position: {
        options: (echarts as any).util.reduce(posList, function (map: any, pos: any) {
            map[pos] = pos;
            return map;
        }, {})
    },
    distance: {
        min: 0,
        max: 100
    }
};

app.config = {
    rotate: 90,
    align: 'left',
    verticalAlign: 'middle',
    position: 'insideBottom',
    distance: 3,
};

socket.emit('cliStart', { cliRequire: 'polyDataMessage' });

socket.on('polyDataMessage', (d: any) => {
    console.log(d, 'ddddddd')
    const date: [string?] = []
    const data: any = {}
    d.message.forEach((e: any) => {
        date.indexOf(e.Department) < 0 && date.push(e.Department);
        if (!data[e.month]) {
            data[e.month] = [e.value]
        } else {
            console.log(data, e.month)
            data[e.month].push(e.value)
        }
    });
    const infos: any = []
    for (let key in data) {
        infos.push({
            name: key,
            type: 'bar',
            label: {
                show: false,
                position: app.config.position,
                distance: app.config.distance,
                align: app.config.align,
                verticalAlign: app.config.verticalAlign,
                rotate: app.config.rotate,
                // formatter: '{name|{a}}',
                fontSize: 30,
                rich: {
                    name: {
                        // textBorderColor: '#fff'
                        color: '#000'
                    }
                }
            },
            data: data[key],
        })
    }

    const infoData = [infos[0]];
    option = {
        grid: {
            top: 5,
            left: 5,
            right: 5,
            bottom: 0,
            containLabel: true,
            show: false
        },
        color: ['#e30613', '#dbd6c7', '#fff', 'red'],
        yAxis: {
            type: 'category',
            data: date,
            splitLine: {
                show: false,
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
        xAxis: {
            type: 'value',
            splitLine: {
                show: false,
            },
            axisLabel: {
                color: '#fff'
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
        series: infoData,
    };
    // const data = d.message.map((e: any) => {
    //     return e.Value;
    // });
    // option = {
    //     grid: {
    //         top: 10,
    //         left: 5,
    //         right: 5,
    //         bottom: 0,
    //         containLabel: true,
    //         show: false
    //     },
    //     xAxis: {
    //         type: 'category',
    //         data: ['18-Jul',
    //             '18-Aug',
    //             '18-Sep',
    //             '18-Oct',
    //             '18-Nov',
    //             '18-Dec',
    //             '19-Jan',
    //             '19-Feb',
    //             '19-Mar',
    //             '19-Apr',
    //             '19-May',
    //             '19-Jun',
    //             '19-Jul',
    //             '19-Aug',
    //             '19-Sep',
    //             '19-Oct',
    //             '19-Nov'],
    //         splitLine: {
    //             show: false
    //         },
    //         axisLabel: {
    //             color: '#fff'
    //         },
    //         axisLine: {
    //             lineStyle: {
    //                 color: '#fff'
    //             }
    //         },
    //         axisTick: {
    //             lineStyle: {
    //                 color: '#fff'
    //             }
    //         }
    //     },
    //     yAxis: {
    //         type: 'value',
    //         splitLine: {
    //             show: false,
    //         },
    //         axisLabel: {
    //             color: '#fff'
    //         },
    //         axisLine: {
    //             lineStyle: {
    //                 color: '#fff'
    //             }
    //         },
    //         axisTick: {
    //             lineStyle: {
    //                 color: '#fff'
    //             }
    //         },

    //     },
    //     series: [{
    //         data: data,
    //         type: 'line',
    //         itemStyle: {
    //             color: '#e30613'
    //         },
    //     }]
    // };
    // if (option && typeof option === "object") {
    myChart.setOption(option, true);

    // }
})
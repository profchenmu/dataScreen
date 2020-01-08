import echarts from 'echarts';
import socketIOClient from 'socket.io-client';
import moment from 'moment';
import config from '../config';
// initialize echarts instance with prepared DOM
const myChart = echarts.init(document.querySelector('#main'));
const officeLineChart = echarts.init(document.querySelector('#office-line'));
const industryLineChart = echarts.init(document.querySelector('#industry-line'));
const industrialParkLineChart = echarts.init(document.querySelector('#industrial-park-line'));
const retailLineChart = echarts.init(document.querySelector('#retail-line'));
// draw chart
const colorPalette = ['#00FFFF', '#00AED6', '#0079AF', '#005589', 'red', '#efa18d', '#787464', '#cc7e63', '#724e58', '#4b565b'];

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
socket.on('pieMessage', (data: any) => {
    const pieData: [Ipie] = data.message;
    const names: [string?] = []
    const displayData = pieData.map((e, i) => {
        names.push(e.property_type);
        console.log(e)
        // const ele = document.querySelector(`#${e.property_type}-percent`)
        // ele.innerHTML = `${e.Area}`
        let ele: any
        switch (e.property_type) {
            case 'Office/Commercial':
                ele = document.querySelector(`#office-percent`)
                ele.innerHTML = `${e.percent}`;
                break;
            case 'Industrial':
                ele = document.querySelector(`#industry-percent`)
                ele.innerHTML = `${e.percent}`;
                break;
            case 'Retail':
                ele = document.querySelector(`#retail-percent`)
                ele.innerHTML = `${e.percent}`;
                break;
            case 'Business Park':
                ele = document.querySelector(`#industrial-park-percent`)
                ele.innerHTML = `${e.percent}`;
                break;
        }
        return {
            value: e.Area,
            name: e.property_type,
            itemStyle: {
                color: colorPalette[i],
            }
        }
    })
    myChart.setOption({
        legend: {
            show: false,
            orient: 'vertical',
            // x: 'left',
            data: names
        },
        series: [
            {
                // name: 'title',
                type: 'pie',
                radius: ['30%', '90%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: displayData
            }
        ]
    });
});

socket.on('officeLineMessage', (d: any) => {
    const officeLineData: [Iline] = d.message;
    const date: any = []
    const data: any = []
    officeLineData.forEach((e) => {
        date.push(moment(e.date).format('YYYY'));
        data.push(e.Area)
    })
    const mock = [120, 145, 166, 177, 200, 223, 555, 666];
    const mockDate = mock.map((e, i) => {
        if (i === 0) {
            return '2018'
        } else if (i === mock.length - 1) {
            return '2020'
        } else {
            return ''
        }
    })
    const options: any = {
        grid: {
            top: 0,
            // left: 0,
            // right: 0,
            bottom: 0,
            containLabel: true,
            show: false
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: mockDate,
            show: true,
            splitNumber: 1,
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
            show: false,
            splitNumber: 1,
            axisLabel: {
                inside: true,
            },
            axisLine: {
                show: true,
                onZero: false,
            },
            splitLine: {
                show: false
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
                markLine: {
                    symbolSize: 0,
                    data: [
                        { type: 'max', name: 'Max' },
                        { type: 'min', name: 'Min' },
                    ]
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: colorPalette[0]
                    }, {
                        offset: 1,
                        color: 'rgba(0, 222, 255, 0.7)'
                    }])
                },
                data: mock
            }
        ]
    }
    officeLineChart.setOption(options);

});

socket.on('industryLineMessage', (d: any) => {

    const industryLineData: [Iline] = d.message;
    const date: any = []
    const data: any = []
    industryLineData.forEach((e) => {
        date.push(moment(e.date).format('YYYY/MM/DD'));
        data.push(e.Value)
    })
    const mock = [1206, 1457, 1663, 1774, 2005, 2236, 5557, 6666];
    const mockDate = mock.map((e, i) => {
        if (i === 0) {
            return '2018'
        } else if (i === mock.length - 1) {
            return '2020'
        } else {
            return ''
        }
    })
    const options: any = {
        grid: {
            top: 0,
            // left: 0,
            // right: 0,
            bottom: 0,
            containLabel: true,
            show: false
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: mockDate,
            show: true,
            splitNumber: 1,
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
            show: false,
            splitNumber: 1,
            axisLabel: {
                inside: true,
            },
            axisLine: {
                show: true,
                onZero: false,
            },
            splitLine: {
                show: false
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
                    color: colorPalette[1]
                },
                markLine: {
                    symbolSize: 0,
                    data: [
                        { type: 'max', name: 'Max' },
                        { type: 'min', name: 'Min' },
                    ]
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: colorPalette[1]
                    }, {
                        offset: 1,
                        color: 'rgba(0, 174, 214, 0.7)'
                    }])
                },
                data: mock
            }
        ]
    }
    industryLineChart.setOption(options);

});

socket.on('industrialParkLineMessage', (d: any) => {
    const industrialParkLineData: [Iline] = d.message;
    const date: any = []
    const data: any = []
    industrialParkLineData.forEach((e) => {
        date.push(moment(e.date).format('YYYY/MM/DD'));
        data.push(e.Value)
    })
    const mock = [12077, 14577, 16666, 17766, 20066, 22366, 55566, 66666];
    const mockDate = mock.map((e, i) => {
        if (i === 0) {
            return '2018'
        } else if (i === mock.length - 1) {
            return '2020'
        } else {
            return ''
        }
    })
    const options: any = {
        grid: {
            top: 0,
            // left: 0,
            // right: 0,
            bottom: 0,
            containLabel: true,
            show: false
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: mockDate,
            show: true,
            splitNumber: 1,
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
            show: false,
            splitNumber: 1,
            axisLabel: {
                inside: true,
            },
            axisLine: {
                show: true,
                onZero: false,
            },
            splitLine: {
                show: false
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
                    color: colorPalette[2]
                },
                markLine: {
                    symbolSize: 0,
                    data: [
                        { type: 'max', name: 'Max' },
                        { type: 'min', name: 'Min' },
                    ]
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: colorPalette[2]
                    }, {
                        offset: 1,
                        color: 'rgba(0, 121, 175, 0.7)'
                    }])
                },
                data: mock
            }
        ]
    }
    industrialParkLineChart.setOption(options);

});

socket.on('retailLineMessage', (d: any) => {
    const retailLineData: [Iline] = d.message;
    const date: any = []
    const data: any = []
    retailLineData.forEach((e) => {
        date.push(moment(e.date).format('YYYY/MM/DD'));
        data.push(e.Value)
    })
    const mock = [120, 145, 166, 177, 200, 223, 555, 666];
    const mockDate = mock.map((e, i) => {
        if (i === 0) {
            return '2018'
        } else if (i === mock.length - 1) {
            return '2020'
        } else {
            return ''
        }
    })
    const options: any = {
        grid: {
            top: 0,
            // left: 0,
            // right: 0,
            bottom: 0,
            containLabel: true,
            show: false
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: mockDate,
            show: true,
            splitNumber: 1,
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
            show: false,
            splitNumber: 1,
            axisLabel: {
                inside: true,
            },
            axisLine: {
                show: true,
                onZero: false,
            },
            splitLine: {
                show: false
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
                    color: colorPalette[3]
                },
                markLine: {
                    symbolSize: 0,
                    data: [
                        { type: 'max', name: 'Max' },
                        { type: 'min', name: 'Min' },
                    ]
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: colorPalette[3]
                    }, {
                        offset: 1,
                        color: 'rgba(0, 85, 137, 0.7)'
                    }])
                },
                data: mock
            }
        ]
    }
    retailLineChart.setOption(options);

});


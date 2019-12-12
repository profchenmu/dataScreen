import echarts from 'echarts';
import socketIOClient from 'socket.io-client';
import moment from 'moment';

// initialize echarts instance with prepared DOM
const myChart = echarts.init(document.querySelector('#main'));
const officeLineChart = echarts.init(document.querySelector('#office-line'));
const industryLineChart = echarts.init(document.querySelector('#industry-line'));
const industrialParkLineChart = echarts.init(document.querySelector('#industrial-park-line'));
const retailLineChart = echarts.init(document.querySelector('#retail-line'));
// draw chart
const colorPalette = ['#00DEFF', '#FFA820', '#00E59A', 'yellow', 'red', '#efa18d', '#787464', '#cc7e63', '#724e58', '#4b565b'];

const socket = socketIOClient('http://127.0.0.1:4000');

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
socket.on('pieMessage', (data: any) => {
    const pieData: [Ipie] = data.message;

    const names: [string?] = []
    const displayData = pieData.map((e, i) => {
        names.push(e.property_type)
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
                radius: ['30%', '70%'],
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
        date.push(moment(e.date).format('YYYY/MM/DD'));
        data.push(e.Area)
    })
    const options: any = {
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: date,
            show: false,
        },
        yAxis: {
            show: false,
            type: 'value',
            boundaryGap: [0, '100%']
        },
        series: [
            {
                name: 'Office/Commercial',
                type: 'line',
                smooth: true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    color: colorPalette[0]
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
                data: data
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
        data.push(e.Area)
    })
    const options: any = {
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: date,
            show: false,
        },
        yAxis: {
            show: false,
            type: 'value',
            boundaryGap: [0, '100%']
        },
        series: [
            {
                name: 'Industry',
                type: 'line',
                smooth: true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    color: colorPalette[1]
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: colorPalette[1]
                    }, {
                        offset: 1,
                        color: 'rgba(255, 168, 32, 0.7)'
                    }])
                },
                data: data
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
        data.push(e.Area)
    })
    const options: any = {
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: date,
            show: false,
        },
        yAxis: {
            show: false,
            type: 'value',
            boundaryGap: [0, '100%']
        },
        series: [
            {
                name: 'Industrial Park',
                type: 'line',
                smooth: true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    color: colorPalette[2]
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: colorPalette[2]
                    }, {
                        offset: 1,
                        color: 'rgba(0, 229, 154, 0.7)'
                    }])
                },
                data: data
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
        data.push(e.Area)
    })
    const options: any = {
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: date,
            show: false,
        },
        yAxis: {
            show: false,
            type: 'value',
            boundaryGap: [0, '100%']
        },
        series: [
            {
                name: 'Retail',
                type: 'line',
                smooth: true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    color: colorPalette[3]
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: colorPalette[3]
                    }, {
                        offset: 1,
                        color: 'rgba(255, 255, 0, 0.7)'
                    }])
                },
                data: data
            }
        ]
    }
    retailLineChart.setOption(options);

});


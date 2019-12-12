import axios from 'axios';
import * as d3 from 'd3';
import socketIOClient from 'socket.io-client';
import './qt.scss';
const qtSvg = d3.select("#qt");
// const shanghai = svg.select("#shanghai").attr("r", "5");

interface dataQt {
    Entity: string,
    Value: number,
    unit: string,
    Date: Date,
}
const socket = socketIOClient('http://127.0.0.1:4000');
socket.on('qtMessage', (data: any) => {
    const qtArr: [dataQt] = data.message;
    qtArr.forEach((ele, index) => {
        const qtInfo: dataQt = ele;
        console.log(ele, 'ele');
        const polygons: any = d3.selectAll(`#qt-${index} #datas polygon`);
        let shining: number = 0;
        polygons.attr('style', (e: any, i: number) => {
            if (i <= qtInfo.Value) {
                const opacity: number = i / qtInfo.Value;
                return `fill: #42FBFA; opacity: ${opacity}`;
            } else {
                return 'fill: #0055be; opacity: 1';
            }
        }).attr('filter', (e: any, i: number) => {
            if (i <= parseInt(qtInfo.Value as any)) {
                return 'url(#filter-blur)'
            }
        }).attr('id', (e: any, i: number) => {
            if (i === parseInt(qtInfo.Value as any)) {
                return 'shining'
            }
        });
        d3.select(`#qt-${index} #title`).text('Title');
        d3.select(`#qt-${index} #percent`).text(qtInfo.Value);
    })
})






// interface dataCity {
//     area: number
//     city: string
//     entity: string
//     unit: string
// }
// axios.get('/api/data-screen/property-count').then((res) => {
//     const { message } = res.data;
//     console.log(message)
//     message.forEach((e: dataCity) => {
//         const cityId = '#' + e.city.replace(/[\ |']/g, '').toLowerCase();
//         const cityInMap = svg.select(cityId);
//         const citySize = e.area;
//         let sizeDisplay = 0;
//         // if (citySize > 10000000) {
//         //     sizeDisplay = e.area / 1600000;
//         // } else {
//         //     sizeDisplay = e.area / 200000;
//         //     // cityInMap.attr('style', 'fill: #FFA820')
//         // }
//         cityInMap.attr('r', '6');
//         const cityInMapClone = cityInMap.clone();

//         // setTimeout(() => {
//         const repeat = () => {
//             cityInMapClone
//                 .transition()
//                 .duration(2000)
//                 .attr("r", "30")
//                 .attr('fill-opacity', '0.3')
//                 .transition()
//                 .duration(1000)
//                 .attr("r", "10")
//                 .attr('fill-opacity', '0')
//                 .on("end", repeat);
//         }
//         repeat();
//     })
// })
import axios from 'axios';
import * as d3 from 'd3';
import socketIOClient from 'socket.io-client';
import config from '../config'
// import './map.scss';
const svg = d3.select('#svg2');
// const shanghai = svg.select("#shanghai").attr("r", "5");
const socket = socketIOClient(config.url);
socket.on('message', (data: string) => { console.log(data) });
interface dataQt {
    Entity: string,
    Value: number,
    unit: string,
    Date: Date,
}
interface dataCity {
    area: number
    city: string
    entity: string
    unit: string
}
socket.emit('cliStart', { cliRequire: 'propertyCountMessage' });

socket.on('propertyCountMessage', (data: any) => {
    // propertyCountMessage
    const { message } = data;
    message.forEach((e: dataCity) => {
        const cityId = '#' + e.city.replace(/[\ |']/g, '').toLowerCase();
        const cityInMap = svg.select(cityId);
        const citySize = e.area;
        let sizeDisplay = 0;
        cityInMap.attr('r', '6');
        const cityInMapClone = cityInMap.clone();

        // setTimeout(() => {
        const repeat = () => {
            cityInMapClone
                .transition()
                .duration(2000)
                .attr("r", "30")
                .attr('fill-opacity', '0.3')
                .transition()
                .duration(1000)
                .attr("r", "10")
                .attr('fill-opacity', '0')
                .on("end", repeat);
        }
        repeat();
    })
})

// axios.get('/api/data-screen/property-count').then((res) => {
//     const { message } = res.data;
//     message.forEach((e: dataCity) => {
//         const cityId = '#' + e.city.replace(/[\ |']/g, '').toLowerCase();
//         const cityInMap = svg.select(cityId);
//         const citySize = e.area;
//         let sizeDisplay = 0;
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
//     // console.log(e)
// })
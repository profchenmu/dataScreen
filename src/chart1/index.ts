import './chart1.scss';
import socketIOClient from 'socket.io-client';
import config from '../config';
import numeral from 'numeral';
numeral.defaultFormat('0,0.0');
const socket = socketIOClient(config.url);


interface Iproperty { property_type: string, Count: number, Area: number }

socket.on('propertyMessage', (data: any) => {
    const propertyData = data.message;
    propertyData.forEach((e: Iproperty) => {
        switch (e.property_type) {
            case 'Office/Commercial':
                console.log(document.querySelector('#chart1-office-data .count'))
                document.querySelector('#chart1-office-data .count').innerHTML = e.Count as any;
                document.querySelector('#chart1-office-data .area').innerHTML = numeral(e.Area).format();
                break;
            case 'Industry':
                document.querySelector('#chart1-industry-data .count').innerHTML = e.Count as any;
                document.querySelector('#chart1-industry-data .area').innerHTML = numeral(e.Area).format();
                break;
            case 'Industrial Park':
                document.querySelector('#chart1-park-data .count').innerHTML = e.Count as any;
                document.querySelector('#chart1-park-data .area').innerHTML = numeral(e.Area).format();
                break;
            case 'Retail':
                document.querySelector('#chart1-retail-data .count').innerHTML = e.Count as any;
                document.querySelector('#chart1-retail-data .area').innerHTML = numeral(e.Area).format();
                break;
        }
    })

})


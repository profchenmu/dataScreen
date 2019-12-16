import './chart1.scss';
import socketIOClient from 'socket.io-client';
const socket = socketIOClient('http://127.0.0.1:4000');


interface Iproperty { property_type: string, Count: number, Area: number }

socket.on('propertyMessage', (data: any) => {
    const propertyData = data.message;
    propertyData.forEach((e: Iproperty) => {
        switch (e.property_type) {
            case 'Office/Commercial':
                console.log(document.querySelector('#chart1-office-data .count'))
                document.querySelector('#chart1-office-data .count').innerHTML = e.Count as any;
                document.querySelector('#chart1-office-data .area').innerHTML = e.Area as any;
                break;
            case 'Industry':
                document.querySelector('#chart1-industry-data .count').innerHTML = e.Count as any;
                document.querySelector('#chart1-industry-data .area').innerHTML = e.Area as any;
                break;
            case 'Industrial Park':
                document.querySelector('#chart1-park-data .count').innerHTML = e.Count as any;
                document.querySelector('#chart1-park-data .area').innerHTML = e.Area as any;
                break;
            case 'Retail':
                document.querySelector('#chart1-retail-data .count').innerHTML = e.Count as any;
                document.querySelector('#chart1-retail-data .area').innerHTML = e.Area as any;
                break;
        }
    })

})


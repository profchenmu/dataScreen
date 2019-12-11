import axios from 'axios';
import * as d3 from 'd3';
import moment from 'moment';
import socketIOClient from 'socket.io-client';
import './style/index.scss';

const dataTime = d3.select('#data-time');
setInterval(()=>{
    const timeInfo = moment().format('YYYY-MM-DD hh:mm:ss')
    console.log(timeInfo);
    dataTime.text(timeInfo)
},1000)



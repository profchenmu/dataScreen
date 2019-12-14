import axios from 'axios';
import * as d3 from 'd3';
import moment from 'moment';
import socketIOClient from 'socket.io-client';
import './style/index.scss';

const dataTime = d3.select('#data-time');
window.localStorage.setItem('today', '161416')
window.localStorage.setItem('yesterday', '161386')
const today = 161416;
const yesterday = 161386;
const diffInfos = (161416 - 161386);
const arr = []
for (let i=8, j=0, d=diffInfos, y=yesterday; i>0; i--){
    if(i === 1){
        j = today - y;
    }else {
        d = d - j;
        j = (d)/i;
        let rNum = Math.round(Math.random()*j); 
        if(rNum>j){
            j = Math.round(j);
        }else{
            j = Math.round(j+rNum);
        }
    }
    const hh = 9+(8-i)>9?`${9+(8-i)}`:`0${9+(8-i)}`;
    const mm = Math.round(Math.random()*59);
    const obj = {
        time: `${moment().format('YYYY-MM-DD')} ${hh}:${mm}:00`,
        valuePlus: j,
        value: y+=j
    }
    arr.push(obj)
    // let rNum = parseInt(Math.random()*10 as any)
}
console.log(arr)

setInterval(()=>{
    const timeInfo = moment().format('YYYY-MM-DD hh:mm:ss')
    console.log(timeInfo);
    dataTime.text(timeInfo)
},1000)




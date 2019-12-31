import axios from 'axios';
import * as d3 from 'd3';
import moment from 'moment';
import socketIOClient from 'socket.io-client';
import config from './config';
import numeral from 'numeral';
import './style/index.scss';
numeral.defaultFormat('0,0.0');
window.onload = () => {
    const wHeight = window.innerHeight;
    const wWidth = window.innerWidth;
    const scale = `scale( ${wWidth / 3840}, ${wHeight / 1080}) translateY(50%)`;
    const indexHtml = document.getElementById('index-base')
    indexHtml.style.transform = scale;
    (window as any).needFresh = 1;
}


const socket = socketIOClient(config.url);
type Tcount = {
    entity: string
    date: Date
    Count: number
    unit: string
}
type Tarea = {
    entity: string
    date: Date
    Area: number
    unit: string
}
interface Itransaction {
    count: [Tcount]
    area: [Tarea]
}
interface ItransactionDataStep {
    time: string
    valuePlus: string
    value: string
    count: string
}
(window as any).needFresh = 0;
const dataTime = d3.select('#data-time');
const basicCountDom = d3.select('#data-basic-count');
const basicAreaDom = d3.select('#data-basic-area');
socket.on('transactionMessage', (data: any) => {
    const transactionData = data.message;
    console.log(data, 'dddddddddd')
    const dateTodayLocal = window.localStorage.getItem('dateTodayLocal');
    const basicCountLocal = window.localStorage.getItem('basicCountLocal');
    const areaPerSecondLocal = window.localStorage.getItem('areaPerSecondLocal');
    const basicCount = transactionData.count[0].Count;
    const dateToday = transactionData.count[0].date;
    
    if (dateTodayLocal === dateToday && 
        basicCount == basicCountLocal && 
        window.localStorage.getItem('transactionDataStep') && 
        areaPerSecondLocal &&
        !(window as any).needFresh) {
        return;
    }
    window.localStorage.setItem('dateTodayLocal', dateToday);
    window.localStorage.setItem('basicCountLocal', basicCount);
    const timeArr = [];
    const { count, area } = transactionData;
    let usefulIndex = 1;
    for (let i = 0; i < count.length; i++) {
        if (count[i].Count !== count[0].Count) {
            usefulIndex = i
            break;
        }
    }
    const today = count[0].Count;
    const yesterday = count[usefulIndex].Count;
    const diffInfos = today - yesterday;
    const secondsPerDay = 28800;
    
    const timeStep = Math.round(secondsPerDay / diffInfos);
    for (let i = 0, t = moment('09:30:00', 'HH:mm:ss'); i < diffInfos; i++) {
        t = t.add(timeStep, 'seconds');
        timeArr.push(t.format('HH:mm:ss'))
    }
    const arr = [];
    const todayArea = area[0].Area;
    const yesterdayArea = area[usefulIndex].Area;
    const areaDiffInfos = todayArea - yesterdayArea;
    const areaPerSecond = (areaDiffInfos / secondsPerDay).toFixed(1);
    window.localStorage.setItem('areaPerSecondLocal', areaPerSecond);
    window.localStorage.setItem('areayesterdayLocal', yesterdayArea);
    for (let i = timeArr.length, j = 0, d = areaDiffInfos, y = yesterdayArea, c = yesterday; i > 0; i--) {
        if (i === 1) {
            j = todayArea - y;
        } else {
            d = d - j;
            j = d / i;
            let rNum = Math.round(Math.random() * j);
            if (rNum < j) {
                j += rNum;
            }
        }
        y += j
        const obj = {
            time: `${moment().format('YYYY-MM-DD')} ${timeArr[timeArr.length - i]}`,
            valuePlus: j.toFixed(1),
            value: y.toFixed(1),
            count: c += 1,
        }
        arr.push(obj)
    }
    console.log('from server', arr)
    if ((window as any).needFresh) {
        basicCountDom.text(today)
        basicAreaDom.text(todayArea.toFixed(1));
        (window as any).needFresh = 0;
    }

    window.localStorage.setItem('transactionDataStep', JSON.stringify(arr))
})

// for (let i = 0, t = moment('09:30:00', 'HH:mm:ss'); i < secondsPerDay; i++) {
//     const area = (yesterdayArea + areaPerSecond).toFixed(1);
//     t = t.add(1, 'seconds');
//     const obj = {
//         time: `${moment().format('YYYY-MM-DD')} ${t.format('HH:mm:ss')}`,
//         area
//     }
//     areaSteps.push(obj)
// }

setInterval(() => {
    const areaPerSecondLocal:number = window.localStorage.getItem('areaPerSecondLocal') as any - 0;
    const diffSeconds = moment().diff(moment('09:30:00', 'HH:mm:ss'), 'seconds')
    const areayesterdayLocal:any = window.localStorage.getItem('areayesterdayLocal');
    if(diffSeconds>0 && diffSeconds<=28800){
        const area = areayesterdayLocal - 0 + areaPerSecondLocal*diffSeconds;
        const displayArea = numeral(area).format();
        basicAreaDom.text(displayArea);
    }
    const timeInfo = moment().format('YYYY-MM-DD HH:mm:ss')
    dataTime.text(timeInfo)
    const transactionDataStep = JSON.parse(window.localStorage.getItem('transactionDataStep'))
    console.log('from local', transactionDataStep);
    transactionDataStep.forEach((e: ItransactionDataStep) => {
        if (e.time == timeInfo) {
            // basicAreaDom.text(e.value);
            const count:any = e.count;
            basicCountDom.text(numeral(count-0).format('0,0'));
        }
    })
    
}, 1000)





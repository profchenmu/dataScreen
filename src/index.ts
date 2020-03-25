import axios from 'axios';
import * as d3 from 'd3';
import moment from 'moment';
import socketIOClient from 'socket.io-client';
import config from './config';
import numeral from 'numeral';
import './style/index.scss';
numeral.defaultFormat('0,0.0');
window.onload = () => {
    window.localStorage.setItem('countPertimeNow', 'needInit')
    const wHeight = window.innerHeight;
    const wWidth = window.innerWidth;
    // , ${wHeight / 1080}
    const scale = `scale( ${wWidth / 3840}, ${wHeight / 1080}) translateY(50%)`;
    const indexHtml = document.getElementById('index-base')
    indexHtml.style.transform = scale;
    let needFresh = true;
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
    const dateNow = d3.select('#date');
    const timeNow = d3.select('#time');
    const basicCountDom = d3.select('#data-basic-count');
    const basicAreaDom = d3.select('#data-basic-area');
    let areat: any;
    let countt: any;
    socket.emit('cliStart', { cliRequire: 'transactionMessage' });
    socket.on('transactionMessage', (data: any) => {
        const transactionData = data.message;
        // const dateTodayLocal = window.localStorage.getItem('dateTodayLocal');
        // const basicCountLocal = window.localStorage.getItem('basicCountLocal');
        // const areaPerSecondLocal = window.localStorage.getItem('areaPerSecondLocal');
        // const countPerSecondLocal = window.localStorage.getItem('countPerSecondLocal');
        // const basicCount = transactionData.count[0].Count;
        // const dateToday = transactionData.count[0].date;
        console.log(needFresh)
        // if (dateTodayLocal === dateToday &&
        //     basicCount == basicCountLocal &&
        //     window.localStorage.getItem('transactionDataStep') &&
        //     areaPerSecondLocal &&
        //     !needFresh) {
        //     return;
        // }
        // window.localStorage.setItem('dateTodayLocal', dateToday);
        // window.localStorage.setItem('basicCountLocal', basicCount);
        // const timeArr = [];
        const { count, area } = transactionData;
        let usefulIndex = 1;
        for (let i = 0; i < count.length; i++) {
            if (count[i].Count !== count[0].Count) {
                usefulIndex = i
                break;
            }
        }
        const secondsPerDay = 28800;

        const todayCount = count[0].Count;
        const yesterdayCount = count[usefulIndex].Count;
        const diffCount = todayCount - yesterdayCount;
        const countPerSecond = (diffCount / secondsPerDay) + '';
        // const timeStep = Math.round(secondsPerDay / diffInfos);
        // for (let i = 0, t = moment('09:30:00', 'HH:mm:ss'); i < diffInfos; i++) {
        //     t = t.add(timeStep, 'seconds');
        //     timeArr.push(t.format('HH:mm:ss'))
        // }
        // const arr = [];
        const todayArea = area[0].Area;
        areat = todayArea;
        countt = todayCount;
        const yesterdayArea = area[usefulIndex].Area;
        const areaDiffInfos = todayArea - yesterdayArea;
        const areaPerSecond = (areaDiffInfos / secondsPerDay).toFixed(1);

        window.localStorage.setItem('areaPerSecondLocal', areaPerSecond);
        window.localStorage.setItem('countPerSecondLocal', countPerSecond);
        window.localStorage.setItem('areayesterdayLocal', yesterdayArea);
        window.localStorage.setItem('countYesterdayLocal', yesterdayCount);
        // for (let i = timeArr.length, j = 0, d = areaDiffInfos, y = yesterdayArea, c = yesterday; i > 0; i--) {
        //     if (i === 1) {
        //         j = todayArea - y;
        //     } else {
        //         d = d - j;
        //         j = d / i;
        //         let rNum = Math.round(Math.random() * j);
        //         if (rNum < j) {
        //             j += rNum;
        //         }
        //     }
        //     y += j
        //     const obj = {
        //         time: `${moment().format('YYYY-MM-DD')} ${timeArr[timeArr.length - i]}`,
        //         valuePlus: j.toFixed(1),
        //         value: y.toFixed(1),
        //         count: c += 1,
        //     }
        //     arr.push(obj)
        // }
        // if (needFresh) {
        //     basicCountDom.text(today)
        //     basicAreaDom.text(todayArea.toFixed(1));
        // (window as any).needFresh = 0;
        // }

        // window.localStorage.setItem('transactionDataStep', JSON.stringify(arr))
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
    // console.log(needFresh)
    // if (needFresh) {

    //     needFresh = false;

    //     const timeInfoTemp = moment().format('HH')
    //     const transactionDataStep = JSON.parse(window.localStorage.getItem('transactionDataStep'));
    //     transactionDataStep.forEach((e: any) => {
    //         const timeTemp = moment(e.time, 'YYYY-MM-DD HH:mm:ss').format('HH')
    //         if (timeInfoTemp == timeTemp) {
    //             const count: any = e.count;
    //             basicCountDom.text(numeral(count - 0).format('0,0'));
    //         }
    //     })

    // }
    setInterval(() => {
        const areaPerSecondLocal: number = window.localStorage.getItem('areaPerSecondLocal') as any - 0;
        const countPerSecondLocal: number = window.localStorage.getItem('countPerSecondLocal') as any - 0;
        const areayesterdayLocal: any = window.localStorage.getItem('areayesterdayLocal');
        const countYesterdayLocal: any = window.localStorage.getItem('countYesterdayLocal');
        const diffSeconds = moment().diff(moment('09:30:00', 'HH:mm:ss'), 'seconds')
        console.log(diffSeconds, 'ddddddddddd')
        if (diffSeconds > 0 && diffSeconds <= 28800) {
            const countPertimeBefore = window.localStorage.getItem('countPertimeNow');
            const area = areayesterdayLocal - 0 + areaPerSecondLocal * diffSeconds;
            const count = countYesterdayLocal - 0 + countPerSecondLocal * diffSeconds;
            const displayArea = numeral(area).format();
            if (countPertimeBefore === 'needInit') {
                basicAreaDom.text(displayArea);
                basicCountDom.text(numeral(count - 0).format('0,0'));
                window.localStorage.setItem('countPertimeNow', numeral(count - 0).format('0,0'))
            } else {
                if (countPertimeBefore === numeral(count - 0).format('0,0')) {
                    return;
                } else {
                    basicAreaDom.text(displayArea);
                    basicCountDom.text(numeral(count - 0).format('0,0'));
                    window.localStorage.setItem('countPertimeNow', numeral(count - 0).format('0,0'))
                }
            }


            // const displayCount = numeral(area).format();
            basicAreaDom.text(displayArea);
            basicCountDom.text(numeral(count - 0).format('0,0'));
        } else if (diffSeconds > 28800) {
            basicAreaDom.text(numeral(areat - 0).format('0,0'));
            basicCountDom.text(numeral(countt - 0).format('0,0'));
        }

        // const timeInfo = moment().format('YYYY-MM-DD HH:mm:ss');
        // const dateInfo = moment().format('YYYY-MM-DD HH:mm:ss');
        dateNow.text(moment().format('YYYY-MM-DD'));
        timeNow.text(moment().format('HH:mm:ss'))
        // const transactionDataStep = JSON.parse(window.localStorage.getItem('transactionDataStep'))

        // transactionDataStep.forEach((e: ItransactionDataStep) => {
        //     if (e.time == timeInfo) {
        //         // basicAreaDom.text(e.value);
        //         const count: any = e.count;
        //         basicCountDom.text(numeral(count - 0).format('0,0'));
        //     }
        // })

    }, 1000)
}





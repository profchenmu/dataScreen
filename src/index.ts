import axios from 'axios';
import * as d3 from 'd3';
import moment from 'moment';
import socketIOClient from 'socket.io-client';
import config from './config';
import numeral from 'numeral';
import './style/index.scss';
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
numeral.defaultFormat('0,0.0');
const urlParams = new URLSearchParams(window.location.search);
const videoTime = parseInt(urlParams.get('video')) * 1000 + 2000 || 139000;
const dashboardTime = parseInt(urlParams.get('dashboard')) * 1000 + 2000 || 90000;
const video: any = document.getElementById('my-video');
const videoSource: any = document.getElementById('video-source');
const videoInput: any = document.getElementById('video-file-input')
videoInput.onchange = function (e: any) {
    const videoFile = videoInput.files[0];
    const url = URL.createObjectURL(videoFile);
    video.src = url;
    videoInput.style.display = 'none';
    // videoSource.setAttribute('src','')
    testAnimationShow()
}
video.onended = function () {
    testAnimationHide()
}
function testAnimationHide() {

    let starttime: any
    function moveit(timestamp: number, el: any, dist: number, duration: number) {
        //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date:
        const t = timestamp || new Date().getTime()
        const runtime = t - starttime
        let progress = 1 - runtime / duration

        progress = Math.min(progress, 1)
        el.style.opacity = dist * progress;
        if (runtime < duration) {
            requestAnimationFrame(function (t) {
                moveit(t, el, dist, duration)
            })
        } else {
            el.pause();
            // video.style.display = 'none';
            setTimeout(() => {
                testAnimationShow()
            }, dashboardTime)
        }
    }

    requestAnimationFrame(function (timestamp) {
        starttime = timestamp || new Date().getTime()
        moveit(timestamp, video, 1, 2000)
    })
}
function testAnimationShow() {
    // video.style.display = 'block';
    let starttime: any
    function moveit(timestamp: number, el: any, dist: number, duration: number) {
        //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date:
        const t = timestamp || new Date().getTime()
        const runtime = t - starttime
        let progress = runtime / duration
        progress = Math.min(progress, 1)
        el.style.opacity = dist * progress;
        if (runtime < duration) {
            requestAnimationFrame(function (t) {
                moveit(t, el, dist, duration)
            })
        } else {
            el.currentTime = 0;
            el.play();

            // setTimeout(() => {

            // }, videoTime)
        }
    }

    requestAnimationFrame(function (timestamp) {
        starttime = timestamp || new Date().getTime()
        moveit(timestamp, video, 1, 2000)
    })
}
window.onload = () => {
    // window.localStorage.setItem('countPertimeNow', 'needInit');

    const wHeight = window.innerHeight;
    const wWidth = window.innerWidth;
    // , ${wHeight / 1080}
    const scale = `scale( ${wWidth / 3840}, ${wHeight / 1800}) translateY(50%)`;
    const indexHtml = document.getElementById('index-base')
    indexHtml.style.transform = scale;
    let needFresh = true;
    const socket = socketIOClient(config.url);

    const dateNow = d3.select('#date');
    const timeNow = d3.select('#time');
    const basicCountDom = d3.select('#data-basic-count');
    const basicAreaDom = d3.select('#data-basic-area');

    let areat: any;
    let countt: any;

    let areatYesterday: any;
    let counttYesterday: any;

    let perSecondCount: any;
    let perSecondArea: any;

    socket.emit('cliStart', { cliRequire: 'transactionMessage' });
    socket.on('transactionMessage', (data: any) => {

        const transactionData = data.message;
        const { count, area } = transactionData;
        if (needFresh === true || moment().diff(moment(count[0].date), 'days') >= 0) {
            let usefulIndex = 1;
            for (let i = 0; i < count.length; i++) {
                if (count[i].Count !== count[0].Count) {
                    usefulIndex = i
                    break;
                }
            }
            const secondsPerDay = 32400;

            const todayCount = count[0].Count;
            const yesterdayCount = count[usefulIndex].Count;
            const diffCount = todayCount - yesterdayCount;
            const countPerSecond = (diffCount / secondsPerDay) + '';

            const todayArea = area[0].Area;

            const yesterdayArea = area[usefulIndex].Area;

            const areaPerSecond = ((todayArea - yesterdayArea) / secondsPerDay).toFixed(1);

            areat = todayArea;
            countt = todayCount;

            areatYesterday = yesterdayArea;
            counttYesterday = yesterdayCount;

            perSecondCount = countPerSecond
            perSecondArea = areaPerSecond

            needFresh = false;
        }

        // window.localStorage.setItem('areaPerSecondLocal', areaPerSecond);
        // window.localStorage.setItem('countPerSecondLocal', countPerSecond);
        // window.localStorage.setItem('areayesterdayLocal', yesterdayArea);
        // window.localStorage.setItem('countYesterdayLocal', yesterdayCount);
    })

    setInterval(() => {
        dateNow.text(moment().format('YYYY-MM-DD'));
        timeNow.text(moment().format('HH:mm:ss'))
        // const areaPerSecondLocal: number = window.localStorage.getItem('areaPerSecondLocal') as any - 0;
        // const countPerSecondLocal: number = window.localStorage.getItem('countPerSecondLocal') as any - 0;
        // const areayesterdayLocal: any = window.localStorage.getItem('areayesterdayLocal');
        // const countYesterdayLocal: any = window.localStorage.getItem('countYesterdayLocal');
        const diffSeconds = moment().diff(moment('09:00:00', 'HH:mm:ss'), 'seconds')
        if (diffSeconds > 0 && diffSeconds <= 32400) {
            // const countPertimeBefore = window.localStorage.getItem('countPertimeNow');
            const area = areatYesterday - 0 + perSecondArea * diffSeconds;
            const count = counttYesterday - 0 + perSecondCount * diffSeconds;
            const displayArea = numeral(area).format();
            const readyForInputCount = numeral(count - 0).format('0,0');
            const alreadyInputCount = basicCountDom.text();
            if (readyForInputCount !== alreadyInputCount) {
                basicAreaDom.text(displayArea);
                basicCountDom.text(readyForInputCount);
            }
            // if (countPertimeBefore === 'needInit') {
            // basicAreaDom.text(displayArea);
            // basicCountDom.text(numeral(count - 0).format('0,0'));
            // window.localStorage.setItem('countPertimeNow', numeral(count - 0).format('0,0'))
            // } else {
            //     if (countPertimeBefore === numeral(count - 0).format('0,0')) {
            //         return;
            //     } else {
            //         basicAreaDom.text(displayArea);
            //         basicCountDom.text(numeral(count - 0).format('0,0'));
            //         // window.localStorage.setItem('countPertimeNow', numeral(count - 0).format('0,0'))
            //     }
            // }


            // const displayCount = numeral(area).format();


        } else if (diffSeconds > 32400) {
            basicAreaDom.text(numeral(areat - 0).format('0,0'));
            basicCountDom.text(numeral(countt - 0).format('0,0'));
        }

    }, 1000)


    // setTimeout(() => {
    // testAnimationShow()
    // }, 1000)
}





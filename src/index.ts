import axios from 'axios';
import * as d3 from 'd3';
import moment from 'moment';
import socketIOClient from 'socket.io-client';
import config from './config';
import numeral from 'numeral';
import './style/index.scss';
import { style } from 'd3';
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
// videoInput.onchange = function (e: any) {
//     const videoFile = videoInput.files[0];
//     const url = URL.createObjectURL(videoFile);
//     video.src = url;
//     videoInput.style.display = 'none';
//     // videoSource.setAttribute('src','')
//     testAnimationShow()
// }
// video.onended = function () {
//     testAnimationHide()
// }
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

// window.localStorage.setItem('countPertimeNow', 'needInit');


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

// socket.emit('cliStart', { cliRequire: 'transactionMessage' });
// socket.on('transactionMessage', (data: any) => {

//     const transactionData = data.message;
//     const { count, area } = transactionData;
//     if (needFresh === true || moment().diff(moment(count[0].date), 'days') >= 0) {
//         let usefulIndex = 1;
//         for (let i = 0; i < count.length; i++) {
//             if (count[i].Count !== count[0].Count) {
//                 usefulIndex = i
//                 break;
//             }
//         }
//         const secondsPerDay = 32400;

//         const todayCount = count[0].Count;
//         const yesterdayCount = count[usefulIndex].Count;
//         const diffCount = todayCount - yesterdayCount;
//         const countPerSecond = (diffCount / secondsPerDay) + '';

//         const todayArea = area[0].Area;

//         const yesterdayArea = area[usefulIndex].Area;

//         const areaPerSecond = ((todayArea - yesterdayArea) / secondsPerDay).toFixed(1);

//         areat = todayArea;
//         countt = todayCount;

//         areatYesterday = yesterdayArea;
//         counttYesterday = yesterdayCount;

//         perSecondCount = countPerSecond
//         perSecondArea = areaPerSecond

//         needFresh = false;
//     }

//     // window.localStorage.setItem('areaPerSecondLocal', areaPerSecond);
//     // window.localStorage.setItem('countPerSecondLocal', countPerSecond);
//     // window.localStorage.setItem('areayesterdayLocal', yesterdayArea);
//     // window.localStorage.setItem('countYesterdayLocal', yesterdayCount);
// })

setInterval(() => {
    dateNow.text(moment().format('YYYY-MM-DD'));
    timeNow.text(moment().format('HH:mm:ss'))
    //     const diffSeconds = moment().diff(moment('09:00:00', 'HH:mm:ss'), 'seconds')
    //     if (diffSeconds > 0 && diffSeconds <= 32400) {
    //         const area = areatYesterday - 0 + perSecondArea * diffSeconds;
    //         const count = counttYesterday - 0 + perSecondCount * diffSeconds;
    //         const displayArea = numeral(area).format();
    //         const readyForInputCount = numeral(count - 0).format('0,0');
    //         const alreadyInputCount = basicCountDom.text();
    //         if (readyForInputCount !== alreadyInputCount) {
    //             basicAreaDom.text(displayArea);
    //             basicCountDom.text(readyForInputCount);
    //         }
    //     } else if (diffSeconds > 32400) {
    //         basicAreaDom.text(numeral(areat - 0).format('0,0'));
    //         basicCountDom.text(numeral(countt - 0).format('0,0'));
    //     }

}, 1000);

const dataArray = ['current', 'property', 'transaction', 'matrix', 'spotlights', 'quality', 'innovation', 'growth',];

function animationAllFrames(ids: Array<string>) {

    ids.forEach((e: string, i: number) => {
        const dataId = `#${e}-data`;
        const titleId = `#${e}-title`;
        if (!dataId || !titleId) {
            animationAllFrames(ids)
        }
        ((dataId: any, titleId: any) => {
            setTimeout(() => {
                // debugger
                if (i === 0) {
                    animationFrames(dataId, titleId, true)
                } else {
                    animationFrames(dataId, titleId, false)
                }

            }, i * 18000)
        })(dataId, titleId)
    })
    setTimeout(() => { animationAllFrames(ids) }, 18000 * dataArray.length)
}
function animationFrames(dataId: string, titleId: string, special?: boolean) {
    const dataContainer = d3.select(dataId)
    const title = d3.select(titleId)
    showAll(dataContainer, title, special)
}

function showAll(dataContainer: any, title: any, special?: boolean) {
    redDotShining(dataContainer, title, special)
}

// const title = d3.select('.data-title');
const dataBox = d3.select('.screen-data-holder');
// const dataInfos = d3.select('.screen-data-holder-in');
const redDot = d3.select('.red-dot');

// show all
const redDotShining = (dataContainer: any, titleContainer: any, special: boolean) => {
    dataContainer.style('visibility', 'visible')
    titleContainer.style('visibility', 'visible')
    redDot
        .style('opacity', 0)
        .transition()
        .style('opacity', 1)
        .transition()
        .style('opacity', 0)
        .transition()
        .style('opacity', 1)
        .on('end', () => { showTitle(dataContainer, titleContainer, special) })
}
const dataFadeIn = (data: any, title: any, special?: boolean) => {
    data
        .style('opacity', 0)
        .transition()
        .duration(4400)
        .style('opacity', 1)
        .on('end', () => {
            if (!special) {
                hideDataBox(data, title, 8000)
            } else {
                setTimeout(() => {
                    data
                        .style('opacity', 1)
                        .transition()
                        .duration(1000)
                        .style('opacity', 0);
                    titleFadeOut(data, title, special);
                }, 8000)

            }
        })
}
const showDataBox = (data: any, title: any) => {
    dataFadeIn(data, title);
    dataBox
        .style('width', '3%')
        .style('height', '0.3%')
        .transition()
        .delay(500)
        .duration(1000)
        .style('width', '88%')
        .transition()
        .duration(1000)
        .style('height', '68%')
}
const dataBoxFadeIn = () => {
    dataBox
        .style('opacity', 0)
        .transition()
        .delay(1500)
        .duration(1000)
        .style('opacity', 1);
}
const showTitle = (data: any, title: any, special?: boolean) => {
    if (!special) {
        dataBoxFadeIn();
    } else {

    }

    title
        .style('width', '0%')
        .style('opacity', 0)
        .transition()
        .delay(300)
        .duration(2000)
        .style('width', '88%')
        .style('opacity', 1)
        .on('end', () => {
            if (!special) {
                showDataBox(data, title)
            } else {
                dataFadeIn(data, title, special);
            }

        })
}

// hide all
const titleFadeOut = (dataContainer: any, title: any, special?: boolean) => {
    dataContainer.style('visibility', 'invisible')
    title.style('visibility', 'invisible');
    if (!special) {
        dataBox
            .style('opacity', 1)
            .transition()
            .delay(500)
            .duration(1000)
            .style('opacity', 0);
    }
    title
        .style('width', '88%')
        .style('opacity', 1)
        .transition()
        .duration(2000)
        .style('width', '0%')
        .style('opacity', 0)
    // .on('end', ()=>{redDotShining(dataContainer, title)})
}

function hideDataBox(dataContainer: any, title: any, delayTime: number) {
    setTimeout(() => {
        dataContainer
            .style('opacity', 1)
            .transition()
            .duration(1000)
            .style('opacity', 0);
        dataBox
            .style('height', '68%')
            .style('width', '88%')
            .transition()
            .duration(500)
            .style('height', '0.3%')
            .transition()
            .duration(500)
            .style('width', '3%')
            .on('end', () => { titleFadeOut(dataContainer, title) })
    }, delayTime)
}


window.onload = () => {
    const wHeight = window.innerHeight;
    const wWidth = window.innerWidth;
    console.log(wHeight, wWidth)
    // 3840 * 1080
    const scale = `scale( ${wWidth / 1920}, ${wHeight / 1080})`;
    const indexHtml = document.getElementById('index-body')
    indexHtml.style.transform = scale;
    animationAllFrames(dataArray);
    // redDotShining();
    // setTimeout(hideDataBox, 8000)
}






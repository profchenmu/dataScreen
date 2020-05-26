import axios from 'axios';
import * as d3 from 'd3';
import socketIOClient from 'socket.io-client';
import './incremental.scss';
// const socket = socketIOClient('http://127.0.0.1:4000');
const demo = [
    {
        title: 'MapIT',
        date: 'Managed by Research team',
        detail: `MapIT is a location intelligence platform that enables users to gain access to global market data and GIS (geographical information system) analytic insights. The platform is widely used by organizations in the industry to unlock new market opportunities.`
    },
    {
        title: 'Command Centre 智控中心',
        date: 'Managed by PAM team',
        detail: `Command Centre is our intelligent building management platform. It captures building’s operational data through existing systems as well as wireless sensors (IoT). With a centralized data storage and analysis, the platform enables real-time, remote monitoring of buildings and facilities to drive efficient operations and reduce risk.`
    },
    {
        title: 'DiChanDaDang 地产搭档',
        date: 'Managed by Markets team',
        detail: `DiChanDadang.com is JLL China’s first online marketplace for commercial real estate, offering rental and sales services for office and retail space. DiChanDaDang mini program will soon be launched internally.`
    },
    {
        title: 'Fee Forecasting System',
        date: 'Managed by TDIM team',
        detail: `Fee Forecasting System is an online dashboard empowering business intelligence and analytics, and it enables us to monitor business performance, identify opportunities and risks, and present key win projects.`
    },
    {
        title: 'Blossom',
        date: 'Managed by TDIM team',
        detail: `Blossom is a supplement to our CRM systems, and it is an innovative tool that helps our colleagues manage, share client information and business referrals across cities and departments.`
    },
    {
        title: 'MapIT',
        date: 'Managed by Research team',
        detail: `MapIT is a location intelligence platform that enables users to gain access to global market data and GIS (geographical information system) analytic insights. The platform is widely used by organizations in the industry to unlock new market opportunities.`
    },
    {
        title: 'Command Centre 智控中心',
        date: 'Managed by PAM team',
        detail: `Command Centre is our intelligent building management platform. It captures building’s operational data through existing systems as well as wireless sensors (IoT). With a centralized data storage and analysis, the platform enables real-time, remote monitoring of buildings and facilities to drive efficient operations and reduce risk.`
    },
    {
        title: 'DiChanDaDang 地产搭档',
        date: 'Managed by Markets team',
        detail: `DiChanDadang.com is JLL China’s first online marketplace for commercial real estate, offering rental and sales services for office and retail space. DiChanDaDang mini program will soon be launched internally.`
    },
    {
        title: 'Fee Forecasting System',
        date: 'Managed by TDIM team',
        detail: `Fee Forecasting System is an online dashboard empowering business intelligence and analytics, and it enables us to monitor business performance, identify opportunities and risks, and present key win projects.`
    },
    {
        title: 'Blossom',
        date: 'Managed by TDIM team',
        detail: `Blossom is a supplement to our CRM systems, and it is an innovative tool that helps our colleagues manage, share client information and business referrals across cities and departments.`
    },
]

const newsDom = demo.map((e) => {
    return `<div class="news-holder">
        <h3 class="title">${e.title}</h3>
        <p class="time">[<span>${e.date}</span>]</p>
        <p>${e.detail}</p>
    </div>`
})
const newsContainer: any = document.querySelector('#news-container')
newsContainer.innerHTML = (newsDom).join('');
const sHeight = newsContainer.scrollHeight;

// const repeat = (top: number) => {
//     top -= 2;
//     console.log(top)
//     newsContainer.style = `transform: translateY(${top}px)`
//     const topValue = newsContainer.style.transform.replace(/[A-Za-z\(\)]/g, '');
//     console.log(topValue, 'vvvvvvvvv');
//     setTimeout(() => {
//         repeat(topValue)
//     }, 100)
// }
// repeat(0);

const testAnimation = () => {
    let starttime: any
    const newsContainer: any = document.querySelector('#news-container')
    function moveit(timestamp: number, el: any, dist: number, duration: number) {
        //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date:
        const t = timestamp || new Date().getTime()
        const runtime = t - starttime
        let progress = runtime / duration
        progress = Math.min(progress, 1)
        el.style.transform = `translateY(${dist * progress}px)`
        if (runtime < duration) {
            requestAnimationFrame(function (t) {
                moveit(t, el, dist, duration)
            })
        } else {
            testAnimation()
        }
    }

    requestAnimationFrame(function (timestamp) {
        starttime = timestamp || new Date().getTime()
        moveit(timestamp, newsContainer, (-sHeight + 180), 196000)
    })
}
setTimeout(() => {
    testAnimation()
}, 1000)




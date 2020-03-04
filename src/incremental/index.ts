import axios from 'axios';
import * as d3 from 'd3';
import socketIOClient from 'socket.io-client';
import './incremental.scss';
// const socket = socketIOClient('http://127.0.0.1:4000');
const demo = [
    {
        title: 'JLL Data Dashboard Launched in Shanghai Office',
        date: '2020-03-01',
        detail: `A data dashboard will be launched in Shanghai Office’s big screen in March. The dashboard is aim to display the data assets information owned by JLL across Greater China, demonstrate the data capability of us and improve the data awareness within the organization.
 
        The dashboard reflects  JLL’s data from the quantity and quality perspectives in nearly real time, as well as utilization of data in our business.`
    },
    {
        title: 'JLL Data Dashboard Launched in Shanghai Office',
        date: '2020-03-01',
        detail: `A data dashboard will be launched in Shanghai Office’s big screen in March. The dashboard is aim to display the data assets information owned by JLL across Greater China, demonstrate the data capability of us and improve the data awareness within the organization.
 
        The dashboard reflects  JLL’s data from the quantity and quality perspectives in nearly real time, as well as utilization of data in our business.`
    },
    {
        title: 'JLL Data Dashboard Launched in Shanghai Office',
        date: '2020-03-01',
        detail: `A data dashboard will be launched in Shanghai Office’s big screen in March. The dashboard is aim to display the data assets information owned by JLL across Greater China, demonstrate the data capability of us and improve the data awareness within the organization.
 
        The dashboard reflects  JLL’s data from the quantity and quality perspectives in nearly real time, as well as utilization of data in our business.`
    },
    {
        title: 'JLL Data Dashboard Launched in Shanghai Office',
        date: '2020-03-01',
        detail: `A data dashboard will be launched in Shanghai Office’s big screen in March. The dashboard is aim to display the data assets information owned by JLL across Greater China, demonstrate the data capability of us and improve the data awareness within the organization.
 
        The dashboard reflects  JLL’s data from the quantity and quality perspectives in nearly real time, as well as utilization of data in our business.`
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
        moveit(timestamp, newsContainer, (-sHeight + 180), 200000)
    })
}
setTimeout(() => {
    testAnimation()
}, 1000)




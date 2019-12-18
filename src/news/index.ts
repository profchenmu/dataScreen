import axios from 'axios';
import * as d3 from 'd3';
import socketIOClient from 'socket.io-client';
import './news.scss';
// const socket = socketIOClient('http://127.0.0.1:4000');
const demo = [
    {
        title: 'Lorem ipsum dolor sit amet 1',
        date: '2020-01-01',
        detail: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit, 
            sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. 
            Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis 
            nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in 
            vulputate velit esse molestie consequat, vel illum dolore eu feugiat consectetuer 
            adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore 
            magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci 
            tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum`
    },
    {
        title: 'Lorem ipsum dolor sit amet 2',
        date: '2020-01-01',
        detail: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit, 
            sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. 
            Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis 
            nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in 
            vulputate velit esse molestie consequat, vel illum dolore eu feugiat consectetuer 
            adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore 
            magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci 
            tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum`
    },
    {
        title: 'Lorem ipsum dolor sit amet 3',
        date: '2020-01-01',
        detail: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit, 
            sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. 
            Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis 
            nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in 
            vulputate velit esse molestie consequat, vel illum dolore eu feugiat consectetuer 
            adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore 
            magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci 
            tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum`
    },
    {
        title: 'Lorem ipsum dolor sit amet 4',
        date: '2020-01-02',
        detail: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit, 
            sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. 
            Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis 
            nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in 
            vulputate velit esse molestie consequat, vel illum dolore eu feugiat consectetuer 
            adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore 
            magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci 
            tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum`
    },
    {
        title: 'Lorem ipsum dolor sit amet 5',
        date: '2020-01-03',
        detail: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit, 
            sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. 
            Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis 
            nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in 
            vulputate velit esse molestie consequat, vel illum dolore eu feugiat consectetuer 
            adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore 
            magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci 
            tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum`
    },
    {
        title: 'Lorem ipsum dolor sit amet 6',
        date: '2020-01-03',
        detail: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit, 
            sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. 
            Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis 
            nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in 
            vulputate velit esse molestie consequat, vel illum dolore eu feugiat consectetuer 
            adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore 
            magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci 
            tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum`
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
        console.log(runtime, duration)
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
        moveit(timestamp, newsContainer, (-sHeight + 180), 100000)
    })
}
setTimeout(() => {
    testAnimation()
}, 1000)




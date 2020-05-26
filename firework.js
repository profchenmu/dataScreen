const firework = document.getElementById('firework');
const width = firework.clientWidth;
const height = firework.clientHeight;
const ct = firework.getContext('2d');
console.log(ct, width, height)

function draw(r, step, offsetX, offsetY, length, speed, color, size) {

    ct.beginPath();
    const ratio = step * speed;
    const arr = [];
    for (let i = 0; i < length; i++) {
        ct.beginPath();
        const rd = Math.round(Math.random() * 10)
        const x = (Math.cos(Math.PI * i / (length / 2)) * ratio + offsetX) + rd;
        const y = (Math.sin(Math.PI * i / (length / 2)) * ratio + offsetY) + rd;
        arr.push({
            x,
            y
        })
        ct.arc(x, y, size, 0, 2 * Math.PI);
        ct.fillStyle = color;
        ct.closePath();
        ct.fill();
    }

    setTimeout(() => {
        arr.forEach((e) => {
            ct.clearRect(e.x - size - 2, e.y - size - 2, size * 3, size * 3);
        });
        if (step < r) {
            step++
        } else {
            step = 0
        }
        draw(r, step, offsetX, offsetY, length, speed, color, size);
    }, Math.round(1 / Math.log2(step)))
}
draw(1000, 0, 200, 200, 100, 2, 'red', 3)
setTimeout(() => {
    draw(2000, 0, 300, 250, 50, 1.5, 'green', 5)
}, 1000)

setTimeout(() => {
    draw(1500, 0, 150, 160, 200, 3, 'blue', 6)
}, 1500)

draw(500, 0, 200, 280, 170, 2, 'yellow', 3)
setTimeout(() => {
    draw(600, 0, 300, 450, 50, 1.5, 'orange', 5)
}, 1000)

setTimeout(() => {
    draw(700, 0, 400, 40, 30, 3, 'pink', 6)
}, 1500)



// const testAnimation = () => {
//     let starttime

//     function moveit(timestamp, el, dist, duration) {
//         //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date:
//         const t = timestamp || new Date().getTime()
//         const runtime = t - starttime
//         let progress = runtime / duration
//         progress = Math.min(progress, 1)
//         if (runtime < duration) {
//             requestAnimationFrame(function (t) {
//                 moveit(t, el, dist, duration)
//             })
//         } else {
//             testAnimation()
//         }
//     }

//     requestAnimationFrame(function (timestamp) {
//         starttime = timestamp || new Date().getTime()
//         moveit(timestamp, newsContainer, (-sHeight + 180), 100000)
//     })
// }
// testAnimation()`
const canvas = document.createElement("canvas");
document.body.append(canvas);

const ctx = canvas.getContext("2d");

const radius = 50;

const mousePosition = {x:-radius, y:-radius};
let touch = false;
const offset = {
    height: window.innerHeight - document.body.clientHeight,
    width: window.innerWidth - document.body.clientWidth
}

const setPos = (x, y) => {
    mousePosition.x = x;
    mousePosition.y = y;

    const top = Math.round((y - offset.height) / document.body.clientHeight * 10000) / 100;
    const left = Math.round((x - offset.width) / document.body.clientWidth * 10000) / 100;

    document.body.style.backgroundPosition = `${left}% ${top}%`;
}
const resetTouch = () => {
    mousePosition.x = -radius;
    mousePosition.y = -radius;
}

window.onmousemove = (e) => setPos(e.x, e.y);
window.ontouchstart = (e) => { touch = true; setPos([...e.changedTouches][0].clientX, [...e.changedTouches][0].clientY) }
window.ontouchmove = (e) => setPos([...e.changedTouches][0].clientX, [...e.changedTouches][0].clientY);
window.ontouchend = () => resetTouch();
window.ontouchcancel = () => resetTouch();
window.onmouseup = (e) => { if(touch) resetTouch(); }

window.onresize = (e) => {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
}
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

document.addEventListener('touchmove', function (event) {
    if (event.scale !== 1) { event.preventDefault(); }
}, { passive: false });

const animationFrameCallback = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(mousePosition.x - offset.width, mousePosition.y - offset.height, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'white';
    ctx.fill();

    requestAnimationFrame(animationFrameCallback);
};
requestAnimationFrame(animationFrameCallback);
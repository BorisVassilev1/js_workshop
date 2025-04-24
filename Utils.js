const canvas = document.getElementById('canvas-id');

const ctx = canvas.getContext('2d');

ctx.fillStyle = "#0000FF";
ctx.strokeStyle = "#FF0000";
let isKeyPressed = [];
let mouseX = 0;
let mouseY = 0;

window.addEventListener('keydown', ev => {keyDown && keyDown(ev.code); isKeyPressed[ev.code] = true});
window.addEventListener('keyup', ev => {keyUp && keyUp(ev.code); isKeyPressed[ev.code] = false});
window.addEventListener('mousedown', _ => {mouseDown && mouseDown()});
window.addEventListener('mouseup', _ => {mouseUp && mouseUp()});
window.addEventListener('mousemove', ev => {mouseX = ev.x; mouseY = ev.y;});

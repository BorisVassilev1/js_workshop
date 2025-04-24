let myX = 0;
let myY = 0;

function update() {
	myX -= (myX - mouseX) * 0.1;
	myY -= (myY - mouseY) * 0.1;
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.fillRect(myX, myY, 30, 30);

	window.requestAnimationFrame(draw);
}


function keyUp(key) {
	console.log("Key up: " + key);
}

function keyDown(key) {
	console.log("Key down: " + key);
}

window.requestAnimationFrame(draw);

setInterval(update, 33);

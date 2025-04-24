
let platformTexture = new Image();
platformTexture.src = "./assets/sprites/platforms.png"

class Platform {
	minx = 100;
	miny = 450;
	maxx = 200;
	maxy = 470;
	vy = 0;
	isUnstable = false;
	isActivated = false;
	
	isSine = false;

	startminx;
	startminy;
	startmaxx;
	startmaxy;

	constructor(minx = 100, miny = 450, maxx = 200, maxy = 470, isUnstable = false) {
		this.minx = minx;
		this.miny = miny;
		this.maxx = maxx;
		this.maxy = maxy;
		this.isUnstable = isUnstable;
		this.startminx = minx;
		this.startminy = miny;
		this.startmaxx = maxx;
		this.startmaxy = maxy;
	}


	update() {
		this.miny += this.vy * deltaTime;
		this.maxy += this.vy * deltaTime;

		if (this.isUnstable && this.isActivated) {
			this.vy += g * deltaTime;
		}
		if(this.isUnstable && this.miny < this.startminy) {
			this.minx = this.startminx;
			this.miny = this.startminy;
			this.maxx = this.startmaxx;
			this.maxy = this.startmaxy;
			this.vy = 0;
		}
		if(this.isSine) {
			this.miny = this.startminy + Math.sin(frameCounter / 100) * 200
			this.maxy = this.startmaxy + Math.sin(frameCounter / 100) * 200
		}
	}

	draw() {
		ctx.drawImage(platformTexture, 16, 0, 32, 10, this.minx, this.miny, this.maxx - this.minx, this.maxy - this.miny)
	}

	collide() {
		if (this.isUnstable) {
			setTimeout(() => {
				this.isActivated = true;
			}, 500);
			setTimeout(() => {
				this.isActivated = false;
				this.minx = this.startminx;
				this.miny = this.startminy + 1000;
				this.maxx = this.startmaxx;
				this.maxy = this.startmaxy + 1000;
				this.vy = -10000 * deltaTime;
			}, 5000);
		}
	}
}

let p = new Player();
let platforms = [
	new Platform(100, 400, 200, 430),
	new Platform(300, 400, 400, 430),
]

platforms[1].isSine = true;

for (let i = 0; i < 10; ++i) {
	platforms.push(new Platform(i * 100, 500, i * 100 + 100, 530, true))
}

function update() {
	p.update();
	for (const platform of platforms) {
		platform.update();
		p.collideWithPlatform(platform);
	}

	++frameCounter;
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	p.draw();

	for (const platform of platforms)
		platform.draw();

	window.requestAnimationFrame(draw);
}


function keyUp(key) {
}

function keyDown(key) {
	if (key == 'Space') {
		if (p.jumps > 0) {
			p.vy = -600;
			p.jumps -= 1;
		}
	}
}

window.requestAnimationFrame(draw);

setInterval(update, deltaTime * 1000);

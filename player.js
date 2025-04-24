let deltaTime = 1 / 30;
let g = 2000;
let playerSpeed = 300;
let frameCounter = 0;

let playerTexture = new Image();
playerTexture.src = "./assets/sprites/knight.png"

let animStates = {
	idle: {frames: 4, speed: 10, y: 0, perRow: 4},
	run: {frames: 16, speed: 2, y: 2, perRow: 8}
}

class Player {
	x = 0;
	y = 0;
	vx = 0;
	vy = 0;
	sizex = 45;
	sizey = 60;
	jumps = 0;
	animState = 'idle'
	direction = 1;

	update() {
		this.animState = 'idle';
		if (isKeyPressed["KeyD"]) {
			this.x += playerSpeed * deltaTime;
			this.animState = 'run';
			this.direction =1;
		}
		if (isKeyPressed["KeyA"]) {
			this.x -= playerSpeed * deltaTime;
			this.animState = 'run';
			this.direction =-1;
		}
		this.x += this.vx * deltaTime;
		this.y += this.vy * deltaTime;

		this.vy += g * deltaTime;

		if (this.y + this.sizey > canvas.height) {
			this.y = canvas.height - this.sizey
			this.jumps = 2;
			this.vy = 0;
		}
	}

	draw() {
		let state = animStates[this.animState];
		let animX = Math.floor(frameCounter / state.speed) % state.frames;
		let animY = state.y + Math.floor(animX / state.perRow);
		animX %= state.perRow;

		ctx.save()

		ctx.translate(this.x + this.sizex / 2, this.y)
		ctx.scale(this.direction, 1);
		ctx.drawImage(playerTexture,
			9 + animX * 32,
			8 + animY * 32,
			15,
			20,
			-this.sizex /2, 0, this.sizex, this.sizey);
		ctx.restore()
	}

	collideWithPlatform(p) {
		const minx = this.x;
		const miny = this.y;
		const maxx = this.x + this.sizex;
		const maxy = this.y + this.sizey;

		const distx1 = p.maxx - minx;
		const distx2 = p.minx - maxx;
		const disty1 = p.maxy - miny;
		const disty2 = p.miny - maxy;

		if (disty1 < 0) return;
		if (disty2 > 0) return;

		if (distx1 < 0) return;
		if (distx2 > 0) return;

		let distx = distx1;
		if (Math.abs(distx2) < Math.abs(distx1)) distx = distx2;

		let disty = disty1;
		if (Math.abs(disty2) < Math.abs(disty1)) disty = disty2;

		if (Math.abs(distx) < Math.abs(disty)) {
			this.vx = 0;
			//this.vy = 0;
			this.x += distx + Math.sign(distx);
			//this.jumps = 2;
		} else {
			if (this.vy > 0) {
				this.jumps = 2;
			}

			this.vy = 0;
			this.y += disty + Math.sign(disty);
		}

		p.collide();
	}
}

var fps = 30;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
var bgColor = "rgb(40,40,40)"
var ready;
var enemyScore;
var renderTimer = setInterval(render, 1 / fps * 100);
var difficultyTimer;
var spawnTimer;
var spawntime;
var gameTime;
var difficulty;
var score;
var highScore = 0;
var gameOver;
var entities = [];
var player;
var fader;
//准备开始
function reset() {
	if (score > highScore) highScore = score;
	ready = true;
	enemyScore = 0;
	gameTime = 0;
	difficulty = 1;
	score = 0;
	spawntime = 1500;
	gameOver = false;
	fader = 0;
	entities = [];
	player = null;
	clearTimers()
}

//清楚定时器
function clearTimers() {
	clearInterval(difficultyTimer);
	clearInterval(spawnTimer);
}

//初始化时间
function initializeTimers() {
	difficultyTimer = setInterval(increaseDifficulty, 2000);
	spawnTimer = setInterval(spawnEnemy, spawntime);
}

//初始化游戏
function init() {
	ready = false;
	clearTimers();
	initializeTimers();

	//产生敌人
	player = new Player();
	player.position.set(canvas.width / 2, canvas.height - player.size);
	player.render();
	entities.push(player);

}

//更新对象
function updateEntities() {
	entities.forEach(function(e) {
		if (e.position.y > canvas.height + 20) {
			if (e.name == "Enemy") {
				enemyScore += 1;
			}
			removeEntity(e);
		}
		e.update(1 / fps);
	})
}

//绘制颜色
function drawBG() {
	ctx.fillStyle = bgColor;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

//分数
function drawScore() {
	ctx.fillStyle = "#CCFF99";
	ctx.font = "24px sans-serif";
	ctx.fillText("分数: " + score, 10, 24);
	ctx.font = "16px sans-serif";
	ctx.fillText("最高分: " + highScore, 10, 48);
	var enemyScoreString = "";
	for (var i = 0; i < enemyScore; i++) {
		enemyScoreString += "X";
	}
	ctx.font = "24px sans-serif";
	ctx.fillStyle = "#FF6666";
	ctx.fillText(enemyScoreString, canvas.width - 75, 24);
	ctx.font = "16px sans-serif";
	ctx.fillText("难度: " + difficulty, canvas.width / 2 - 50, 24);
}
//正式开始
function drawStatic(alpha) {
	var s = 15;
	for (var x = 0; x < canvas.width; x += s) {
		for (var y = 0; y < canvas.width; y += s) {
			var n = Math.floor(Math.random() * 60);
			ctx.fillStyle = "rgba(" + n + "," + n + "," + n + "," + (Math.random() * alpha) + ")";
			ctx.fillRect(x, y, s, s);
		}
	}
}

function drawReadyScreen() {
	drawBG();
	//drawStatic(.25);
	drawScore();
	fader += .1 * 1 / fps;
	ctx.fillStyle = "rgba(255,255,255," + fader + ")";
	ctx.font = "72px sans-serif";
	ctx.fillText("READY?", canvas.width / 2 - 140, canvas.height / 2);
	drawScore();
}

function drawEntities() {
	entities.forEach(function(e) {
		e.render();
	});
}

function drawGameOver() {
	ctx.fillStyle = "rgba(0,0,0," + fader + ")";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	drawStatic(fader / 2);
	drawScore();
	fader += .1 * 1 / fps
	ctx.fillStyle = "rgba(255,255,255," + fader + ")";
	ctx.font = "72px sans-serif";
	ctx.fillText("GAME OVER", canvas.width / 2 - 220, canvas.height / 2);
}

function render() {
	drawBG();
	drawEntities();
	drawScore();
	if (gameOver) {
		drawGameOver();
		return;
	} else if (ready) {
		drawReadyScreen();
		return;
	}
	updateEntities();
	gameTime += 1 / fps;
	if (enemyScore >= 3) {
		clearTimers();
		gameOver = true;
		fader = 0;
	}
}

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return new Vector2(evt.clientX - rect.left,
		evt.clientY - rect.top)
}

function canvasClick() {
	if (gameOver) {
		if (fader > .5) reset();
		return;
	}
	if (ready) {
		init();
		return;
	}
	var bullet = new Bullet();
	bullet.position.set(player.position.x + player.size / 2 - bullet.size / 2, player.position.y - player.size / 2 - bullet.size / 2);
	bullet.velocity.y = -30;
	entities.push(bullet);
	if (score > 0) score -= 1;
}

function increaseDifficulty() {
	difficulty += 1;
	if (spawntime > 20) spawntime -= 20;
	clearInterval(spawnTimer);
	spawnTimer = setInterval(spawnEnemy, spawntime);
}

function setAlpha(color, alpha) {
	if (color.indexOf('a') == -1) {
		return color.replace(")", "," + alpha + ")").replace("rgb", "rgba");
	}
}

function death(entity) {
	if (entity.name == "Enemy") {
		var particleCount = Math.floor((Math.random() * 6) + 3);
		for (var i = 0; i < particleCount; i++) {
			var p = new Particle();
			p.color = entity.color;
			p.size = Math.floor((Math.random() * entity.size / 2) + 5);
			p.position.set(entity.position.x + entity.size / 2, entity.position.y + entity.size / 2);
			entities.push(p);
		}
		score += 25;
	}
	removeEntity(entity);
}

function removeEntity(entity) {
	var idx = entities.indexOf(entity);
	if (idx > -1) entities.splice(idx, 1);
}

function overlaps(entityA, entityB) {
	var sa = entityA.size;
	var x1a = entityA.position.x;
	var x2a = entityA.position.x + sa;
	var y1a = entityA.position.y;
	var y2a = entityA.position.y + sa;
	var sb = entityB.size;
	var x1b = entityB.position.x;
	var x2b = entityB.position.x + sb;
	var y1b = entityB.position.y;
	var y2b = entityB.position.y + sb;
	return (x1a < x2b && x2a > x1b && y1a < y2b && y2a > y1b);
}

function spawnEnemy() {
	var e = new Enemy();
	var px = Math.floor((Math.random() * canvas.width));
	var py = -e.size;
	var v = difficulty;
	var a = Math.floor((Math.random() * (v + 15)) + v);
	var f = Math.floor((Math.random() * (v + 15)) + v);
	e.position.set(px, py);
	var r = Math.random();
	if (r > .5) {
		straightDownMotion(e, v);
	} else if (r > .3) {
		sineMotion(e, a, f, v);
	} else if (r > .1) {
		triangularMotion(e, a, f, v);
	} else {
		sawtoothMotion(e, a, f, v);
	}
	entities.push(e);
}

function straightDownMotion(entity, speed) {
	entity.update = function(deltatime) {
		this.velocity.x = 0;
		this.velocity.y = speed;
		Entity.prototype.update.call(this, deltatime);
	}
}

function sineMotion(entity, amplitude, freq, speed) {
	entity.update = function(deltatime) {
		this.velocity.x = amplitude * Math.cos(this.position.y / freq);
		this.velocity.y = speed;
		Entity.prototype.update.call(this, deltatime);
	}
}

function sawtoothMotion(entity, amplitude, freq, speed) {
	var modifier = 1;
	if (Math.random() > .5) modifier = -1;
	entity.update = function(deltatime) {
		this.velocity.x = modifier * ((-2 * amplitude) / Math.PI) * Math.atan(1 / Math.tan(this.position.y / freq));
		this.velocity.y = speed;
		Entity.prototype.update.call(this, deltatime);
	}
}

function triangularMotion(entity, amplitude, freq, speed) {
	entity.update = function(deltatime) {
		this.velocity.x = ((2 * amplitude) / Math.PI) * Math.asin(Math.sin(this.position.y / freq));
		this.velocity.y = speed;
		Entity.prototype.update.call(this, deltatime);
	}
}

function randomColor(min, max) {
	var r = Math.floor((Math.random() * max) + min);
	var g = Math.floor((Math.random() * max) + min);
	var b = Math.floor((Math.random() * max) + min);
	var col = "rgb(" + r + "," + g + "," + b + ")";
	return col;
}

var Vector2 = function(x1, y1) {
	this.x = x1;
	this.y = y1;
}
Vector2.prototype.set = function(a, b) {
	this.x = a;
	this.y = b;
}

var Entity = function() {
	this.name = "Entity";
	this.size = 25;
	this.position = new Vector2(0, 0);
	this.velocity = new Vector2(0, 0);
	this.color = "#FFFFFF";
}
Entity.prototype.sayName = function() {
	console.log(this.name);
}
Entity.prototype.update = function(deltaTime) {
	this.position.x += this.velocity.x * deltaTime;
	this.position.y += this.velocity.y * deltaTime;
	//Keep in bounds
	if (this.position.x - this.size < 0) {
		this.position.x = this.size;
	}
	if (this.position.x + this.size > canvas.width) {
		this.position.x = canvas.width - this.size;
	}
}
Entity.prototype.render = function() {
	ctx.fillStyle = this.color;
	ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
}

var Enemy = function() {
	Entity.call(this);
	this.name = "Enemy";
	this.size = Math.floor((Math.random() * 50) + 20);
	this.color = randomColor(90, 150);
}
Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Entity;
var Player = function() {
	Entity.call(this);
	this.name = "Player";
	this.color = "#4747FF"
}
Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Entity;

var Particle = function() {
	Entity.call(this);
	this.name = "Particle";
	this.size = 10;
	this.time = 0;
	this.maxTime = Math.floor((Math.random() * 10) + 3);
	this.velocity.x = Math.floor((Math.random() * 20) - 10);
	this.velocity.y = Math.floor((Math.random() * 20) - 10);
}
Particle.prototype = Object.create(Entity.prototype);
Particle.prototype.constructor = Entity;
Particle.prototype.update = function(deltatime) {
	Entity.prototype.update.call(this, deltatime);
	this.time += deltatime;
	if (this.time >= this.maxTime) removeEntity(this);
}

var Bullet = function() {
	Entity.call(this);
	this.name = "Bullet";
	this.size = 10;
	this.time = 0;
	this.color = "rgba(200,200,200,1)";
	this.particlesDelay = .5;
}
Bullet.prototype = Object.create(Entity.prototype);
Bullet.prototype.constructor = Entity;
Bullet.prototype.update = function(deltatime) {
	Entity.prototype.update.call(this, deltatime);

	var me = this;
	entities.forEach(function(e) {
			if (e !== me && e.name != "Particle") {
				if (overlaps(me, e)) {
					death(e);
					removeEntity(me);
				}
			}
		})
	if (this.position.y < 0) removeEntity(this);

	this.time += deltatime;
	if (this.time >= this.particlesDelay) {
		this.time = 0;
		var p = new Particle();
		p.size = Math.floor((Math.random() * 5) + 2);
		p.color = setAlpha("rgb(125,125,125)", Math.random());
		//p.color = setAlpha(randomColor(100,255),Math.random()); //Rainbow colored particles
		p.velocity.x /= 2;
		p.position.x = this.position.x + this.size / 2 - p.size / 2;
		p.position.y = this.position.y - p.size / 2;
		entities.push(p);
	}
}

document.addEventListener('DOMContentLoaded', reset());

canvas.addEventListener("click", canvasClick);

canvas.addEventListener('mousemove', function(evt) {
	var mousePos = getMousePos(canvas, evt);
	if (player && !gameOver) player.position.x = mousePos.x;
}, false);
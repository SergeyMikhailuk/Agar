// 1. Button start
const startBtn = document.querySelector('#startBtn');
startBtn.addEventListener('click', openGame);

function openGame() {
    canvas.classList.remove('displayNone');
    startBtn.classList.add('displayNone');
    startBtn.classList.add('displayNone');
    canvas.addEventListener('mousemove', onMouseInput);
    context.clearRect(0, 0, canvas.width, canvas.height);
    setup(350);
    player();
}

// 2. Create window game
const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");

// 3.1 Create Object
class Ball {
    constructor(x, y, r, color) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
    }
    show() {
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }
}

// 3.2 Create player
let xmouse = canvas.width/2;
let ymouse = canvas.height/2;
let score = 0;
let radiusGrow = null;

function onMouseInput(e) {
    xmouse = e.offsetX;
    ymouse = e.offsetY;
    target(balls);
    end()
}

let x, y, dx, dy;
function player() {
   requestAnimationFrame(player);
    if (!x || !y) {
        x = xmouse;
        y = ymouse;
    } else {
        dx = (xmouse - x) / radiusGrow * 1.5;
        dy = (ymouse - y) / radiusGrow * 1.5;
        if (Math.abs(dx) + Math.abs(dy) < 0.1) {
            x = xmouse;
            y = ymouse;
        } else {
            x += dx;
            y += dy;
        }
    }

    radiusGrow = 10 + score * 0.07;
    const gamer = new Ball(x, y, radiusGrow, 'teal').show();
}

// 4.1 Create random num
function rand(num) {
    return Math.floor(Math.random() * num);
}

// 4.2 Create food
let balls = [];

function setup(amount) {
    for (let i = 0; i < amount; i++) {
        const x = rand(canvas.width);
        const y = rand(canvas.height);
        const radius = rand(7) + 4;
        const color = `rgba(${rand(255)}, ${rand(255)}, ${rand(255)}, 1)`;
        clearanceX = x < radius * 2 ? x + radius : x - radius;
        clearanceY = y < radius * 2 ? y + radius : y - radius;
        balls[i] = new Ball(clearanceX, clearanceY, radius, color);
    }
}
setInterval(draw, 30)
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = balls.length - 1; i >= 0; i--) {
        balls[i].show();
    }
    context.font = "22px Verdana";
    context.fillText(`Score: ${score}`, 10, 30);
}

// 5. Target search and eat
function target(balls) {
    for (let i = 0; i < balls.length; i++) {
        const diffX = x - balls[i].x
        const diffY = y - balls[i].y
        const distance = Math.sqrt((diffX ** 2) + (diffY ** 2));
        if (distance < radiusGrow){
            score += balls[i].r;
            balls.splice(i, 1);
        }
    }
}

// 6. The end
function end() {
    if (balls.length === 0) {
        canvas.removeEventListener('mousemove', onMouseInput);
        canvas.classList.add('displayNone');
        startBtn.classList.remove('displayNone');
        startBtn.innerHTML = `You Won! Score: ${score}, Try again`;
        score = 0;
    }
}

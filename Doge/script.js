// FPS at which doge will move
const FPS = 60;

// Initial Dimensions of window
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

// Doge Image Object
let doge = document.getElementById("bouncy");

// These values are measured in pixels
let dogePosX = 0;
let dogePosY = 0;

// These values are measured in pixels per frame
let dogeVelX = 1;
let dogeVelY = 1;

function updateDoge() {
    dogePosX += dogeVelX;
    dogePosY += dogeVelY;
}

function moveDoge() {
    doge.style.left = `${dogePosX}px`;
    doge.style.top = `${dogePosY}px`;
}

function runLoop() {
    updateDoge();
    moveDoge();
}

intervalId = setInterval(runLoop, 1000 / FPS)
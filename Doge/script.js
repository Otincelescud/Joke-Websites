// FPS at which doge will move
const FPS = 60;

// Initial Dimensions of window
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

// Doge Image Object
let doge = document.getElementById("bouncy");

// These values are measured in pixels
let DOGEWIDTH;
let DOGEHEIGHT;

let dogePosX = 0;
let dogePosY = 0;

let collisionPointXDist;
let collisionPointYDist;

// These values are measured in pixels per frame
let dogeVelX = 5;
let dogeVelY = 5;

function isPointInRect(x, y, w, h) {
    return x >= 0 && x < w && y >= 0 && y < h;
}

function detectCollisionPoints(vector_x, vector_y, pos_x, pos_y, w, h) {
    let colls = [[0, null], [WIDTH, null], [null, 0], [null, HEIGHT]];

    // Y coordonates for points that lie on the vertical edges of the window
    if (vector_y != 0) {
        colls[0][1] = pos_y - vector_y*pos_x/vector_x;
        colls[1][1] = pos_y - vector_y*(pos_x - w)/vector_x;
    }

    // X coordonates for points that lie on the orizontal edges of the window
    if (vector_x != 0) {
        colls[2][0] = pos_x - vector_x*pos_y/vector_y;
        colls[3][0] = pos_x - vector_x*(pos_y - h)/vector_y;
    }

    return colls;
}

function handleCollisions() {
    if (dogeVelX >= 0) collisionPointXDist = DOGEWIDTH;
    else collisionPointXDist = 0;

    if (dogeVelY >= 0) collisionPointYDist = DOGEHEIGHT;
    else collisionPointYDist = 0;

    let newPos = [dogePosX, dogePosY];
    const newDir = [[-1, 1], [-1, 1], [1, -1], [1, -1], [1, 1]];
    let newDirI = 4;


    if (!isPointInRect(dogePosX + collisionPointXDist, dogePosY + collisionPointYDist, WIDTH, HEIGHT)) {
        newPos = [1000000, 10000000];
        let collPointList = detectCollisionPoints(dogeVelX, dogeVelY, dogePosX + collisionPointXDist, dogePosY + collisionPointYDist, WIDTH, HEIGHT);
        for (let i = 0; i < 4; i++) {
            let posX = collPointList[i][0] - collisionPointXDist;
            let posY = collPointList[i][1] - collisionPointYDist;
            
            // Checks which point is closest and sets newPos to the position where the collision occurred
            if (posX != null && posY != null && Math.sqrt((dogePosX - posX)*(dogePosX - posX) + (dogePosY - posY)*(dogePosY - posY)) <
            Math.sqrt((dogePosX - newPos[0])*(dogePosX - newPos[0]) + (dogePosY - newPos[1])*(dogePosY - newPos[1]))) {
                newPos[0] = posX;
                newPos[1] = posY;
                newDirI = i;
            }
        }
    }
    dogeVelX *= newDir[newDirI][0];
    dogeVelY *= newDir[newDirI][1];
    dogePosX = newPos[0];
    dogePosY = newPos[1];
}

function updateDoge() {
    dogePosX += dogeVelX;
    dogePosY += dogeVelY;
    
    handleCollisions();
}

function moveDoge() {
    doge.style.left = `${dogePosX}px`;
    doge.style.top = `${dogePosY}px`;
}

function runLoop() {
    updateDoge();
    moveDoge();
}

document.addEventListener("DOMContentLoaded", function (e) {
    console.log("Loaded");
    DOGEWIDTH = doge.offsetWidth;
    DOGEHEIGHT = doge.offsetHeight;
    collisionPointXDist = DOGEWIDTH;
    collisionPointYDist = DOGEHEIGHT;
    intervalId = setInterval(runLoop, 1000 / FPS);
});
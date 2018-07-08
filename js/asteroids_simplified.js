var ship = {
    "width": 0,
    "height": 0,
    "position": {
        "x": 0,
        "y": 0
    },
    "velocity": {
        "x": 0,
        "y": 0
    },
    "acceleration": {
        "x": 0,
        "y": 0
    },
    "rotate": {
        "increment": 0,
        "angle": 0
    }
};

var shots = [];

function setup () {
    createCanvas(windowWidth, windowHeight);
    ship.width = 50;
    ship.height = 50;
    ship.position.x = -ship.width/2 + windowWidth/2;
    ship.position.y = ship.height/2 + windowHeight/2;
    ship.acceleration.x = 1;
    ship.acceleration.y = 1;
    ship.rotate.increment = 5;
    ship.rotate.angle = 180;
}

function draw () {
    background(55);
    shoot();
    updateShip();
}

function shoot () {
    drawShots();
    moveShots();
}

function drawShots () {
    shots.forEach(drawShot);
}

function drawShot (shot) {
    fill(0,200,255);
    ellipse(shot.x, shot.y, 10, 10);
    fill(255);
}

function moveShots () {
    shots.forEach(moveShot);
}

function moveShot (shot) {
    shot.y += 5 * cos(radians(shot.angle));
    shot.x -= 5 * sin(radians(shot.angle));
}

function updateShip() {
    var xMid = ship.position.x + ship.width/2;
    var yMid = ship.position.y - ship.height/2;
    translate(xMid, yMid);
    rotate(radians(ship.rotate.angle));
    arrowKeysPressed();
    drawShip();
    loopShip();
    ship.position.x += ship.velocity.x;
    ship.position.y += ship.velocity.y;
}

function arrowKeysPressed () {
    if (keyIsDown(LEFT_ARROW)) {
        ship.rotate.angle -= ship.rotate.increment;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        ship.rotate.angle += ship.rotate.increment;
    }
    if (keyIsDown(UP_ARROW)) {
        ship.velocity.y += ship.acceleration.y * cos(radians(ship.rotate.angle));
        ship.velocity.x -= ship.acceleration.x * sin(radians(ship.rotate.angle));
    }
    if (keyIsDown(DOWN_ARROW)) {
        ship.velocity.y -= ship.acceleration.y * cos(radians(ship.rotate.angle));
        ship.velocity.x += ship.acceleration.x * sin(radians(ship.rotate.angle));
    }
}

function drawShip() {
    var xOffset = -ship.width/2;
    var yOffset = -ship.height/2;
    triangle(xOffset, yOffset, xOffset + ship.width, yOffset, xOffset + ship.width/2, yOffset + ship.height);
}

function loopShip () {
    if (ship.position.x > windowWidth)
        ship.position.x = -ship.width;
    else if (ship.position.x < -ship.width)
        ship.position.x = windowWidth;
    if (ship.position.y - ship.height > windowHeight)
        ship.position.y = -ship.height;
    else if (ship.position.y < -ship.height)
        ship.position.y = windowHeight;
}

function keyPressed () {
    if (key === " ") {
        shots.push(
            {
                "x": ship.position.x + ship.width/2,
                "y": ship.position.y - ship.height/2,
                "angle": ship.rotate.angle
            }
        );
    }
}

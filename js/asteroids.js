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
        "amount": 0,
        "current": 0
    }
};

function setup () {
    createCanvas(windowWidth, windowHeight);
    ship.width = 50;
    ship.height = 50;
    ship.position.x = -ship.width/2 + windowWidth/2;
    ship.position.y = ship.height/2 + windowHeight/2;
    ship.rotate.amount = PI / 4;
    ship.rotate.current = 180;
    ship.acceleration.x = 0.5;
    ship.acceleration.y = 0.5;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw () {
    background(55);
    var xMid = ship.position.x + ship.width/2;
    var yMid = ship.position.y - ship.height/2;
    translate(xMid, yMid);
    rotate(radians(ship.rotate.current));
    drawShip();
    moveShip();
    loopShip();
    updateShipPosition();
}

function updateShipPosition () {
    ship.position.x += ship.velocity.x;
    ship.position.y += ship.velocity.y;
}

function moveShip () {
    if (keyIsDown(LEFT_ARROW)) {
        ship.rotate.current -= ship.rotate.amount;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        ship.rotate.current += ship.rotate.amount;
    }
    if (keyIsDown(UP_ARROW)) {
        ship.velocity.y += ship.acceleration.y * cos(radians(ship.rotate.current));
        ship.velocity.x -= ship.acceleration.x * sin(radians(ship.rotate.current));
    }
    if (keyIsDown(DOWN_ARROW)) {
        ship.velocity.y -= ship.acceleration.y * cos(radians(ship.rotate.current));
        ship.velocity.x += ship.acceleration.x * sin(radians(ship.rotate.current));
    }
}

function loopShip () {
    if (ship.position.x > windowWidth)
        ship.position.x = -ship.width;
    else if (ship.position.x < -ship.width)
        ship.position.x = windowWidth;
    if (ship.position.y > windowHeight)
        ship.position.y = -ship.height;
    else if (ship.position.y < -ship.height)
        ship.position.y = windowHeight;
}

function drawShip() {
    var xOffset = -ship.width/2;
    var yOffset = -ship.height/2;
    triangle(xOffset, yOffset, xOffset + ship.width, yOffset, xOffset + ship.width/2, yOffset + ship.height);
}

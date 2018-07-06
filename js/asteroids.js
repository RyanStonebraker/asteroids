var ship = {
    "width": 50,
    "height": 50,
    "position": {
        "x": 0,
        "y": 0
    },
    "velocity": {
        "x": 0,
        "y": 0
    },
    "acceleration": {
        "x": 0.5,
        "y": 0.5
    },
    "rotate": {
        "amount": 3.1415926535 / 4,
        "current": 0
    }
};

function setup () {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw () {
    background(55);
    moveShip();
    translate(ship.position.x + ship.width, ship.position.y + ship.height);
    rotate(radians(ship.rotate.current));
    drawShip();
    loopShip();
    updateShipPosition();
}

function updateShipPosition () {
    ship.position.x += ship.velocity.x;
    ship.position.y += ship.velocity.y;
}

function moveShip () {
    if (keyIsDown(LEFT_ARROW))
        ship.rotate.current -= ship.rotate.amount;
        // ship.velocity.x -= ship.acceleration.x;
    if (keyIsDown(RIGHT_ARROW))
        ship.rotate.current += ship.rotate.amount;
        // ship.velocity.x += ship.acceleration.x;
    if (keyIsDown(UP_ARROW))
        ship.velocity.y -= ship.acceleration.y;
    if (keyIsDown(DOWN_ARROW))
        ship.velocity.y += ship.acceleration.y;
}

function loopShip () {
    if (ship.position.x > windowWidth)
        ship.position.x = -ship.width;
    else if (ship.position.x < -ship.width)
        ship.position.x = windowWidth - 1;
    if (ship.position.y > windowHeight)
        ship.position.y = -ship.height;
    else if (ship.position.y < -ship.height)
        ship.position.y = windowHeight - 1;
}

function drawShip() {
    var xOffset = -ship.width;
    var yOffset = -ship.height;
    triangle(ship.position.x + xOffset, ship.position.y + yOffset,
             ship.position.x + xOffset + ship.width, ship.position.y + yOffset,
             ship.position.x + xOffset + ship.width / 2, ship.position.y + yOffset + ship.height);
}

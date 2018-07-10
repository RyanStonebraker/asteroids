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
    "angle": 0
};

function setup () {
    createCanvas(windowWidth, windowHeight);
    ship.width = 50;
    ship.height = 50;
    ship.position.x = -ship.width/2 + windowWidth/2;
    ship.position.y = ship.height/2 + windowHeight/2;
    ship.angle = 180;
}

function draw () {
    background(55);
    updateShip();
}

function updateShip() {
    var xMid = ship.position.x + ship.width/2;
    var yMid = ship.position.y - ship.height/2;
    translate(xMid, yMid);
    rotate(radians(ship.angle));
    monitorArrowKeys();
    drawShip();
    ship.position.x += ship.velocity.x;
    ship.position.y += ship.velocity.y;
}

function monitorArrowKeys () {
    if (keyIsDown(LEFT_ARROW)) {
        ship.angle -= 5;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        ship.angle += 5;
    }
    if (keyIsDown(UP_ARROW)) {
        ship.velocity.y += 1 * cos(radians(ship.angle));
        ship.velocity.x -= 1 * sin(radians(ship.angle));
    }
    if (keyIsDown(DOWN_ARROW)) {
        ship.velocity.y += 1 * cos(radians(ship.angle));
        ship.velocity.x -= 1 * sin(radians(ship.angle));
    }
}

function drawShip() {
    var xOffset = -ship.width/2;
    var yOffset = -ship.height/2;
    fill(255);
    triangle(xOffset, yOffset, xOffset + ship.width, yOffset, xOffset + ship.width/2, yOffset + ship.height);
}

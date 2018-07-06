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

var shots = [];
var asteroids = [];

function setup () {
    createCanvas(windowWidth, windowHeight);
    ship.width = 50;
    ship.height = 50;
    ship.position.x = -ship.width/2 + windowWidth/2;
    ship.position.y = ship.height/2 + windowHeight/2;
    ship.rotate.amount = 5;
    ship.rotate.current = 180;
    ship.acceleration.x = 0.5;
    ship.acceleration.y = 0.5;
    spawnAsteroids();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw () {
    background(55);
    shoot();
    drawAsteroids();
    moveAsteroids();
    loopAsteroids();
    updateShip();
    checkForCollisions();
}

function checkAsteroidCollisions (asteroid) {
    shots.forEach(function (shot) {
        if (shot.x >= asteroid.position.x
            && shot.x <= asteroid.position.x + asteroid.width
            && shot.y >= asteroid.position.y
            && shot.y <= asteroid.position.y + asteroid.height) {
                // DELETE ASTEROID
            }
    });
}

function checkForCollisions () {
    asteroids.forEach(checkAsteroidCollisions);
}

function loopAsteroid (asteroid) {
    if (asteroid.position.x > windowWidth)
        asteroid.position.x = -asteroid.width;
    else if (asteroid.position.x < -asteroid.width)
        asteroid.position.x = windowWidth;
    if (asteroid.position.y - asteroid.height > windowHeight)
        asteroid.position.y = -asteroid.height;
    else if (asteroid.position.y < -asteroid.height)
        asteroid.position.y = windowHeight;
}


function loopAsteroids () {
    asteroids.forEach(loopAsteroid);
}

function moveAsteroid (asteroid) {
    asteroid.position.y += random(3) * cos(radians(asteroid.angle));
    asteroid.position.x -= random(3) * sin(radians(asteroid.angle));
}

function moveAsteroids () {
    asteroids.forEach(moveAsteroid);
}

function drawAsteroid (asteroid) {
    fill(110,110,110);
    ellipse(asteroid.position.x, asteroid.position.y, asteroid.width, asteroid.height);
    fill(255);
}

function drawAsteroids () {
    asteroids.forEach(drawAsteroid);
}

function spawnAsteroids () {
    for (var i = 0; i < random(5,10); ++i) {
        asteroids.push({
            "position": {
                "x": random(windowWidth),
                "y": random(windowHeight)
            },
            "width": random(100),
            "height": random(100),
            "angle": random(360)
        });
    }
}

function updateShip() {
    var xMid = ship.position.x + ship.width/2;
    var yMid = ship.position.y - ship.height/2;
    translate(xMid, yMid);
    rotate(radians(ship.rotate.current));
    drawShip();
    arrowKeysPressed();
    loopShip();
    moveShip();
}

function moveShip () {
    ship.position.x += ship.velocity.x;
    ship.position.y += ship.velocity.y;
}

function moveShot (shot) {
    shot.y += 5 * cos(radians(shot.angle));
    shot.x -= 5 * sin(radians(shot.angle));
}

function moveShots () {
    shots.forEach(moveShot);
}

function drawShot (shot) {
    fill(0,200,255);
    ellipse(shot.x, shot.y, 10, 10);
    fill(255);
}

function drawShots () {
    shots.forEach(drawShot);
}

function shoot () {
    drawShots();
    moveShots();
}

function keyPressed () {
    if (key === " ") {
        shots.push(
            {
                "x": ship.position.x + ship.width/2,
                "y": ship.position.y - ship.height/2,
                "angle": ship.rotate.current
            }
        );
    }
}

function arrowKeysPressed () {
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
    if (ship.position.y - ship.height > windowHeight)
        ship.position.y = -ship.height;
    else if (ship.position.y < -ship.height)
        ship.position.y = windowHeight;
}

function drawShip() {
    var xOffset = -ship.width/2;
    var yOffset = -ship.height/2;
    triangle(xOffset, yOffset, xOffset + ship.width, yOffset, xOffset + ship.width/2, yOffset + ship.height);
}

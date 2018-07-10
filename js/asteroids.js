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
var stars = [];

var alive = true;

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
    spawnStars();
    spawnAsteroids();
}

function windowResized () {
  resizeCanvas(windowWidth, windowHeight);
  stars = [];
  spawnStars();
}

function spawnStars () {
    for (var i = 0; i < random(100, 1000); ++i) {
        stars.push({
            "x": random(windowWidth),
            "y": random(windowHeight)
        });
    }
}

function spawnAsteroids () {
    for (var i = 0; i < random(5,10); ++i) {
        asteroids.push({
            "position": {
                "x": random(windowWidth),
                "y": random(windowHeight)
            },
            "width": random(20, 150),
            "height": random(20, 150),
            "angle": random(360)
        });
    }
}

function draw () {
    if (alive && asteroids.length > 0) {
        drawBackground();
        updateAsteroids();
        checkForCollisions();
        shoot();
        updateShip();
    }
    else if (asteroids.length === 0) {
        win();
    }
    else {
        lose();
    }
}

function drawBackground () {
    background(55);
    fill(255,255,0);
    noStroke();
    stars.forEach(drawStar);
}

function drawStar (star) {
    ellipse(star.x, star.y, 1, 1);
}

function updateAsteroids () {
    drawAsteroids();
    moveAsteroids();
    loopAsteroids();
}

function drawAsteroids () {
    asteroids.forEach(drawAsteroid);
}

function drawAsteroid (asteroid) {
    fill(110,110,110);
    ellipse(asteroid.position.x, asteroid.position.y, asteroid.width, asteroid.height);
    fill(255);
}

function moveAsteroids () {
    asteroids.forEach(moveAsteroid);
}

function moveAsteroid (asteroid) {
    asteroid.position.y += random(3) * cos(radians(asteroid.angle));
    asteroid.position.x -= random(3) * sin(radians(asteroid.angle));
}

function loopAsteroids () {
    asteroids.forEach(loopAsteroid);
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

function checkForCollisions () {
    asteroids.forEach(checkAsteroidCollisions);
}

function checkAsteroidCollisions (asteroid, asteroidsIndex, asteroidsObject) {
    if (ship.position.x >= asteroid.position.x - asteroid.width / 2
        && ship.position.x <= asteroid.position.x + asteroid.width / 2
        && ship.position.y >= asteroid.position.y - asteroid.height / 2
        && ship.position.y <= asteroid.position.y + asteroid.height / 2) {
            alive = false;
        }
    shots.forEach(function (shot, shotsIndex, shotsObject) {
        if (shot.x >= asteroid.position.x - asteroid.width / 2
            && shot.x <= asteroid.position.x + asteroid.width / 2
            && shot.y >= asteroid.position.y - asteroid.height / 2
            && shot.y <= asteroid.position.y + asteroid.height / 2) {
                asteroidsObject.splice(asteroidsIndex, 1);
                shotsObject.splice(shotsIndex, 1);
            }
    });
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
    rotate(radians(ship.rotate.current));
    arrowKeysPressed();
    drawShip();
    loopShip();
    moveShip();
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

function moveShip () {
    ship.position.x += ship.velocity.x;
    ship.position.y += ship.velocity.y;
}

function keyPressed () {
    if (key === " " && alive) {
        shots.push(
            {
                "x": ship.position.x + ship.width/2,
                "y": ship.position.y - ship.height/2,
                "angle": ship.rotate.current
            }
        );
    }
    else if (key === " ") {
        resetGame();
    }
}

function resetGame () {
    ship.velocity.x = 0;
    ship.velocity.y = 0;
    shots = [];
    asteroids = [];
    stars = [];
    setup();
    alive = true;
}

function win () {
    alive = false;
    background(255);
    textSize(32);
    textAlign("center");
    fill(0,255,0);
    text("You Win!", windowWidth/2, windowHeight/2);
}

function lose () {
    background(255);
    textSize(32);
    textAlign("center");
    fill(255,0,0);
    text("You Lose!", windowWidth/2, windowHeight/2);
}

/**
 * Frogfrogfrog
 * Pippin Barr
 * 
 * A game of catching flies with your frog-tongue
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * 
 * 
 * Additions to the game - Bianca Granata
 *
 *  increase of fly size with mouse wheel
 * scoreboard
 *  change in color by clicking s key (day and night)
 *  instructions
 * frog jumps with spacebar
 * 
 * 
 * 
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 520,
        size: 150
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, // Will be random
    size: 5,
    //This was the issue before ->
    maxSize: 20,
    speed: 3
};

const sunMoon = {
    // Position
    x: 500,
    y: 100,
    // Size
    size: 100,
    // fill
    fill: "#ffffff",
    // fills
    fills: {
        white: "#ffffff",
        yellow: "#FFF169",

    }
}

//creating the scoreboard
var scoreboard = 0;

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);

    // Give the fly its first random position
    resetFly();
}
//drawing the features unto the canvas
function draw() {
    //default background color
    background("#1A417C");
    //background("#83B2F9");
    //83B2F9, daytime color
    moveFly();
    drawFly();
    moveFrog();
    moveTongue();
    drawFrog();
    checkTongueFlyOverlap();
    //instructions of the game and its features
    textSize(15);
    text(scoreboard, 350, 40);
    text("Catch as many flies", 50, 40);
    text("Click to reach fly", 50, 60);
    text("Use mouse wheel to increase fly size", 50, 80);
    text("press S to change moon to sun (daytime)", 50, 100);

    //draw moon/ sun
    push();
    noStroke();
    fill(sunMoon.fill);
    ellipse(sunMoon.x, sunMoon.y, sunMoon.size);
    pop();
}
// meant to change the sun/moon color by pressing "s"
function keyPressed(event) {
    if (event.key === "s") {
        sunMoon.fill = sunMoon.fills.yellow;
    }

}
function keyReleased() {
    if (event.key === "s") {
        sunMoon.fill = sunMoon.fills.white;
    }
}
function moveFly() {
    // Move the fly
    fly.x += fly.speed;
    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly();
    }
}

/**
 * Draws the fly as a black circle
 */
function drawFly() {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();


}
//allows for the user to increase and decrease the size of the fly using the mousewheel
function mouseWheel(event) {
    if (event.delta > 0) {
        fly.size += 2;
    }
    else {
        fly.size -= 2;
    }
}

/**
 * Resets the fly to the left with a random y
 */
function resetFly() {
    fly.x = 0;
    fly.y = random(0, 300);
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    frog.body.x = mouseX;

}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the frog's x
    frog.tongue.x = frog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        frog.tongue.y += -frog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.y <= 0) {
            frog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.y += frog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
    // Draw the tongue tip
    push();
    fill("#F70848");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#F70848");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill("#3C5F20");
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();
}

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + fly.size / 2);
    if (eaten) {
        //each time the frog eats a fly, a point is added to the scoreboard
        scoreboard = scoreboard + 1;

        // Reset the fly
        resetFly();
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }
}



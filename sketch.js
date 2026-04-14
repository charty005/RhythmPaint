let logoImg;
let buttonImg;

let buttonScale = 1;
let isHovering = false;

function preload() {
  // Replace with your file names
  logoImg = loadImage("RP.Title.png");
  buttonImg = loadImage("RP.Start.Button.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  drawPinwheelBackground();

  let centerX = width / 2;
  let centerY = height / 2;

  // Pulsing logo
  let pulse = sin(frameCount * 0.05) * 0.05 + 1;
  image(logoImg, centerX, centerY, 500 * pulse, 400 * pulse);

  // Button position
  let btnX = centerX;
  let btnY = centerY + 200;

  // Hover detection
  isHovering =
    mouseX > btnX - 100 &&
    mouseX < btnX + 100 &&
    mouseY > btnY - 40 &&
    mouseY < btnY + 40;

  // Smooth scale animation
  if (isHovering) {
    buttonScale = lerp(buttonScale, 0.9, 0.1);
  } else {
    buttonScale = lerp(buttonScale, 1, 0.1);
  }

  // Draw button
  push();
  translate(btnX, btnY);
  scale(buttonScale);
  image(buttonImg, 0, 0, 200, 80);
  pop();
}

// Spinning Pinwheel Background
function drawPinwheelBackground() {
  let colors = [color(14, 218, 114), color(153, 217, 234)];
  let numSlices = 20;

  translate(width / 2, height / 2);

  for (let i = 0; i < numSlices; i++) {
    fill(colors[i % 2]);
    noStroke();

    let angle = TWO_PI / numSlices;
    let start = i * angle + frameCount * 0.005; // Speed 
    let end = start + angle;

    arc(0, 0, width * 2, height * 2, start, end);
  }

  resetMatrix();
}

function mousePressed() {
  if (isHovering) {
    // OPTION 1: switch state (recommended later)
    // gameState = "play";

    // OPTION 2: go to another page
    //window.location.href = "game.html";
    console.log('test');
  }
}
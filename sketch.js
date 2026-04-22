// ============================================================
//  RHYTHM PAINT — FULL MERGED GAME
// ============================================================

// ===== TOP LEVEL SCREEN =====
// "title" | "menu" | "freepaint" | "rhythm"
let topScreen = "title";

// ===== SHARED ASSETS =====
let canvasTexture;

// ===== TITLE + MENU IMAGES =====
let logoImg;
let buttonImg;
let freePaintBtn;
let rhythmPaintBtn;

// ===== TITLE + MENU STATE =====
let buttonScale  = 1;
let isHovering   = false;
let hoverFree    = false;
let hoverRhythm  = false;
let scaleFree    = 1;
let scaleRhythm  = 1;

// ===== FADE =====
let fadeAlpha     = 0;
let isFading      = false;
let fadeDirection = 1;
let fadeSpeed     = 4;
let fadeTarget    = "menu"; // which screen to land on after fade

// ===== BACKGROUND MUSIC =====
let bgMusic;
let bgMusicVolume = 1.0; // used to fade it out

// ===== FREE PAINT ASSETS =====
let brushImg, pencilImg, eraserImg;
let paletteImg;
let undoImg, redoImg, saveImg, clearImg, menuImg;

// ===== FREE PAINT STATE =====
let clr          = [0, 0, 0];
let currentTool  = "pencil";
let smoothSize   = 5;
let toolbarWidth = 240;
let drawLayer;
let history      = [];
let redoStack    = [];

let toolX      = 0;
let toolW      = 240;
let toolH      = 100;
let toolOffset = -20;
let brushY     = 120;
let pencilY    = 200;
let eraserY    = 290;
let topBtnSize = 75;

// ===== RHYTHM GAME ASSETS =====
let leftImg, upImg, rightImg, spaceImg;
let studioBg;
let elephantTalk1, elephantTalk2;
let elephantPaint1, elephantPaint2;
let resultGood, resultOk, resultBad;
let rhythmSong;

// ===== RHYTHM GAME STATE =====
let gameState   = "intro"; // "intro" | "game" | "result"
let introStep   = 0;
let arrows      = [];
let arrowSpeed;
let hitZoneY;
let score       = 0;
let maxScore    = 0;
let recordMode  = true;
let recordedChart = [];
let gameX, gameW, laneWidth;
let songStarted = false;
let startTime   = 0;

// ===== ELEPHANT =====
let elephantState = "idle";
let paintTimer    = 0;
let talkFrame     = 0;
let talkTimer     = 0;

let introTexts = [
  "Hey! I'm Pig!\nI have always wanted to learn to paint... Can you help me?\n(Press SPACE)",
  "Hit the arrows in time as they fall!\nPress ENTER to start!\nLet's paint to the rhythm!"
];

// ===== TYPEWRITER =====
let typewriterIndex   = 0;
let typewriterTimer   = 0;
let typewriterSpeed   = 2;
let currentDisplayText = "";

// ===== RESULT SCREEN =====
let resultPhase    = "suspense";
let suspenseTimer  = 0;
let suspenseDuration = 180;
let revealAngle    = 0;
let revealAlpha    = 0;
let dotTimer       = 0;
let dotCount       = 0;

// ===== CHART =====
let chart = [
  {"time":1469.3,"type":"left"},{"time":1880,"type":"up"},{"time":2160,"type":"right"},{"time":2530.7,"type":"space"},{"time":2989.3,"type":"left"},{"time":3440,"type":"up"},{"time":3930.7,"type":"left"},{"time":4309.3,"type":"right"},{"time":5920,"type":"left"},{"time":6349.3,"type":"up"},{"time":7040,"type":"right"},{"time":7538.7,"type":"left"},{"time":7920,"type":"up"},{"time":9269.3,"type":"space"},{"time":9450.7,"type":"space"},{"time":9730.7,"type":"up"},{"time":10090.7,"type":"space"},{"time":10309.3,"type":"space"},{"time":10549.3,"type":"right"},{"time":10960,"type":"space"},{"time":11138.7,"type":"space"},{"time":11429.3,"type":"up"},{"time":11829.3,"type":"space"},{"time":12018.7,"type":"space"},{"time":12349.3,"type":"right"},{"time":12709.3,"type":"space"},{"time":12890.7,"type":"space"},{"time":13240,"type":"up"},{"time":13669.3,"type":"space"},{"time":13858.7,"type":"space"},{"time":14149.3,"type":"right"},{"time":14530.7,"type":"space"},{"time":14730.7,"type":"space"},{"time":15098.7,"type":"up"},{"time":15520,"type":"space"},{"time":15690.7,"type":"space"},{"time":15978.7,"type":"right"},{"time":16360,"type":"space"},{"time":16530.7,"type":"space"},{"time":16880,"type":"up"},{"time":17320,"type":"space"},{"time":17498.7,"type":"space"},{"time":17818.7,"type":"right"},{"time":18178.7,"type":"space"},{"time":18360,"type":"space"},{"time":18690.7,"type":"up"},{"time":19149.3,"type":"space"},{"time":19320,"type":"space"},{"time":19650.7,"type":"right"},{"time":19989.3,"type":"space"},{"time":20178.7,"type":"space"},{"time":20538.7,"type":"up"},{"time":20949.3,"type":"space"},{"time":21120,"type":"space"},{"time":21480,"type":"right"},{"time":21818.7,"type":"space"},{"time":22018.7,"type":"space"},{"time":22410.7,"type":"up"},{"time":22890.7,"type":"left"},{"time":23309.3,"type":"up"},{"time":23800,"type":"left"},{"time":24258.7,"type":"right"},{"time":24709.3,"type":"left"},{"time":25109.3,"type":"up"},{"time":25538.7,"type":"left"},{"time":26050.7,"type":"right"},{"time":26498.7,"type":"left"},{"time":26938.7,"type":"up"},{"time":27400,"type":"left"},{"time":27880,"type":"right"},{"time":28360,"type":"left"},{"time":28829.3,"type":"up"},{"time":29250.7,"type":"left"},{"time":29720,"type":"right"},{"time":30178.7,"type":"left"},{"time":30610.7,"type":"up"},{"time":31029.3,"type":"left"},{"time":31450.7,"type":"right"},{"time":31930.7,"type":"left"},{"time":32400,"type":"up"},{"time":32818.7,"type":"left"},{"time":33309.3,"type":"right"},{"time":33730.7,"type":"left"},{"time":34138.7,"type":"up"},{"time":34629.3,"type":"left"},{"time":35120,"type":"right"},{"time":35560,"type":"left"},{"time":36050.7,"type":"up"},{"time":36520,"type":"left"},{"time":36938.7,"type":"right"},{"time":37370.7,"type":"space"},{"time":37549.3,"type":"space"},{"time":37829.3,"type":"up"},{"time":38269.3,"type":"space"},{"time":38450.7,"type":"space"},{"time":38760,"type":"right"},{"time":39189.3,"type":"space"},{"time":39349.3,"type":"space"},{"time":39629.3,"type":"up"},{"time":40018.7,"type":"space"},{"time":40189.3,"type":"space"},{"time":40538.7,"type":"right"},{"time":40960,"type":"space"},{"time":41138.7,"type":"space"},{"time":41458.7,"type":"up"},{"time":41829.3,"type":"space"},{"time":42000,"type":"space"},{"time":42338.7,"type":"right"},{"time":42738.7,"type":"space"},{"time":42930.7,"type":"space"},{"time":43250.7,"type":"up"},{"time":43629.3,"type":"space"},{"time":43789.3,"type":"space"},{"time":44170.7,"type":"right"},{"time":44589.3,"type":"space"},{"time":44770.7,"type":"space"},{"time":45090.7,"type":"up"},{"time":45370.7,"type":"space"},{"time":45570.7,"type":"space"},{"time":46050.7,"type":"right"},{"time":46429.3,"type":"space"},{"time":46618.7,"type":"space"},{"time":46909.3,"type":"up"},{"time":47189.3,"type":"space"},{"time":47378.7,"type":"space"},{"time":47778.7,"type":"right"},{"time":48200,"type":"space"},{"time":48378.7,"type":"space"},{"time":48680,"type":"up"},{"time":49050.7,"type":"space"},{"time":49250.7,"type":"space"},{"time":49618.7,"type":"right"},{"time":50029.3,"type":"space"},{"time":50210.7,"type":"space"},{"time":50520,"type":"up"},{"time":50898.7,"type":"space"},{"time":51058.7,"type":"space"},{"time":51458.7,"type":"right"},{"time":51858.7,"type":"space"},{"time":52050.7,"type":"space"},{"time":52370.7,"type":"up"},{"time":52629.3,"type":"space"},{"time":52840,"type":"space"},{"time":53010.7,"type":"space"},{"time":53360,"type":"right"},{"time":53749.3,"type":"space"},{"time":53920,"type":"space"},{"time":54210.7,"type":"up"},{"time":54690.7,"type":"space"},{"time":54858.7,"type":"space"},{"time":55138.7,"type":"right"},{"time":55560,"type":"space"},{"time":55730.7,"type":"space"},{"time":56018.7,"type":"up"},{"time":56389.3,"type":"space"},{"time":56570.7,"type":"space"},{"time":56920,"type":"right"},{"time":57370.7,"type":"space"},{"time":57538.7,"type":"space"},{"time":57829.3,"type":"up"},{"time":58160,"type":"space"},{"time":58338.7,"type":"space"},{"time":58749.3,"type":"right"},{"time":59160,"type":"space"},{"time":59338.7,"type":"space"},{"time":59629.3,"type":"up"},{"time":59960,"type":"space"},{"time":60149.3,"type":"space"},{"time":60560,"type":"right"},{"time":60960,"type":"space"},{"time":61138.7,"type":"space"},{"time":61496,"type":"up"},{"time":61810.7,"type":"space"},{"time":62000,"type":"space"},{"time":62330.7,"type":"right"},{"time":62800,"type":"space"},{"time":62970.7,"type":"space"},{"time":63298.7,"type":"up"},{"time":63680,"type":"space"},{"time":63858.7,"type":"space"},{"time":64170.7,"type":"right"},{"time":64629.3,"type":"space"},{"time":64789.3,"type":"space"},{"time":65138.7,"type":"up"},{"time":65400,"type":"space"},{"time":65589.3,"type":"space"},{"time":66000,"type":"right"},{"time":66938.7,"type":"left"},{"time":67378.7,"type":"up"},{"time":67650.7,"type":"right"},{"time":68040,"type":"left"},{"time":68490.7,"type":"up"},{"time":68880,"type":"space"},{"time":69378.7,"type":"right"},{"time":69749.3,"type":"up"},{"time":71400,"type":"left"},{"time":71829.3,"type":"right"},{"time":72520,"type":"space"},{"time":72989.3,"type":"up"},{"time":73418.7,"type":"left"},{"time":74138.7,"type":"left"},{"time":74530.7,"type":"up"},{"time":74810.7,"type":"right"},{"time":75189.3,"type":"space"},{"time":75749.3,"type":"up"},{"time":76200,"type":"left"},{"time":76610.7,"type":"space"},{"time":77050.7,"type":"right"},{"time":78658.7,"type":"up"},{"time":79098.7,"type":"left"},{"time":79810.7,"type":"space"},{"time":80258.7,"type":"right"},{"time":80650.7,"type":"up"},{"time":81360,"type":"right"},{"time":81800,"type":"up"},{"time":82080,"type":"left"},{"time":82400,"type":"right"},{"time":83090.7,"type":"up"},{"time":83450.7,"type":"space"},{"time":83930.7,"type":"left"},{"time":84370.7,"type":"right"},{"time":85890.7,"type":"up"},{"time":86338.7,"type":"left"},{"time":87018.7,"type":"space"},{"time":87520,"type":"right"},{"time":87949.3,"type":"up"},{"time":88709.3,"type":"left"},{"time":89130.7,"type":"up"},{"time":89469.3,"type":"left"},{"time":89789.3,"type":"space"},{"time":90370.7,"type":"right"},{"time":90770.7,"type":"up"},{"time":91218.7,"type":"left"},{"time":91658.7,"type":"space"},{"time":93160,"type":"left"},{"time":93578.7,"type":"up"},{"time":94290.7,"type":"right"},{"time":94738.7,"type":"up"}
];

let chartIndex  = 0;
let spawnOffset;


// ============================================================
//  PRELOAD — all assets in one place
// ============================================================
function preload() {
  // shared
  canvasTexture  = loadImage("canvasTexture.jpg");

  // title + menu
  logoImg        = loadImage("RP.Title.png");
  buttonImg      = loadImage("RP.Start.png");
  freePaintBtn   = loadImage("RP.FreePaint.Button.png");
  rhythmPaintBtn = loadImage("RP.RhythmPaint.Button.png");

  // free paint toolbar
  brushImg  = loadImage("brush.png");
  pencilImg = loadImage("pencil.png");
  eraserImg = loadImage("eraser.png");
  paletteImg = loadImage("palette.png");
  undoImg   = loadImage("undo2.png");
  redoImg   = loadImage("redo.png");
  saveImg   = loadImage("save2.png");
  clearImg  = loadImage("clear2.png");
  menuImg   = loadImage("menu.png");

  // rhythm game
  leftImg       = loadImage("left.png");
  upImg         = loadImage("up.png");
  rightImg      = loadImage("right.png");
  spaceImg      = loadImage("down.png");
  studioBg      = loadImage("Screenshot 2026-04-21 132622.png");
  elephantTalk1 = loadImage("RP.talk1.png");
  elephantTalk2 = loadImage("PR.talk2.png");
  elephantPaint1 = loadImage("RP.paint1.png");
  elephantPaint2 = loadImage("Rp.paint2.png");
  resultGood    = loadImage("RP.great.png");
  resultOk      = loadImage("RP.good.png");
  resultBad     = loadImage("RP.ok.png");

  // music
  bgMusic    = loadSound("Richards-Emory-WRL1-W6-BOUNCE2.mp3");
  rhythmSong = loadSound("Video Project 6.mp3");
}


// ============================================================
//  SETUP
// ============================================================
function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);

  drawLayer = createGraphics(windowWidth, windowHeight);
  drawLayer.clear();

  setupRhythmGame();
  bgMusic.loop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  let newLayer = createGraphics(windowWidth, windowHeight);
  newLayer.image(drawLayer, 0, 0);
  drawLayer = newLayer;
  setupRhythmGame();
}

function setupRhythmGame() {
  gameX     = width / 2;
  gameW     = width / 2;
  laneWidth = gameW / 4;
  arrowSpeed = height * 0.01;
  hitZoneY  = height * 0.8;
  spawnOffset = (hitZoneY / arrowSpeed) * 16.67;
}


// ============================================================
//  DRAW — top level router
// ============================================================
function draw() {
  if (topScreen === "title") {
    drawTitleScreen();
  } else if (topScreen === "menu") {
    drawMenuScreen();
  } else if (topScreen === "freepaint") {
    drawFreePaintScreen();
  } else if (topScreen === "rhythm") {
    drawRhythmScreen();
  }

  // bg music fade out (used when launching rhythm game)
  if (bgMusicVolume < 1.0 && bgMusic.isPlaying()) {
    bgMusicVolume -= 0.01;
    if (bgMusicVolume <= 0) {
      bgMusicVolume = 0;
      bgMusic.stop();
    }
    bgMusic.setVolume(bgMusicVolume);
  }

  // fade overlay — always drawn on top
  if (isFading) {
    noStroke();
    fill(0, fadeAlpha);
    rect(0, 0, width, height);

    fadeAlpha += fadeSpeed * fadeDirection;

    if (fadeDirection === 1 && fadeAlpha >= 255) {
      fadeAlpha = 255;
      if (fadeTarget === "menu_from_rhythm") {
        resetRhythmGame();
        topScreen = "menu";
        bgMusicVolume = 1.0;
        bgMusic.setVolume(1.0);
        bgMusic.loop();
      } else {
        topScreen = fadeTarget;
      }
      fadeDirection = -1;
    }

    if (fadeDirection === -1 && fadeAlpha <= 0) {
      fadeAlpha = 0;
      isFading = false;
      fadeDirection = 1;
    }
  }
}

function fadeTo(target) {
  fadeTarget = target;
  isFading = true;
  fadeAlpha = 0;
  fadeDirection = 1;
}


// ============================================================
//  TITLE SCREEN
// ============================================================
function drawTitleScreen() {
  drawTScreen();

  let centerX = width / 2;
  let centerY = height / 2;

  let pulse = sin(frameCount * 0.05) * 0.05 + 1;
  let logoW = min(width * 0.99, 800) * pulse;
  let logoH = logoW * 0.8;
  imageMode(CENTER);
  image(logoImg, centerX, centerY - height * 0.05, logoW, logoH);

  let btnX = centerX;
  let btnY = centerY + height * 0.38;

  isHovering =
    mouseX > btnX - 100 && mouseX < btnX + 100 &&
    mouseY > btnY - 40  && mouseY < btnY + 40;

  buttonScale = lerp(buttonScale, isHovering ? 0.9 : 1, 0.1);
  cursor(isHovering ? HAND : ARROW);

  push();
  translate(btnX, btnY);
  scale(buttonScale);
  imageMode(CENTER);
  image(buttonImg, 0, 0, 200, 80);
  pop();
}

function drawTScreen() {
  imageMode(CORNER);
  image(canvasTexture, 0, 0, width, height);
  imageMode(CENTER);
  noStroke();
  fill(255, 240, 210, 60);
  rect(0, 0, width, height);
}


// ============================================================
//  MENU SCREEN
// ============================================================
function drawMenuScreen() {
  imageMode(CORNER);
  image(canvasTexture, 0, 0, width, height);
  imageMode(CENTER);

  noStroke();
  fill(255, 240, 210, 60);
  rect(0, 0, width, height);

  let btnW = min(width * 0.9, 420);
  let btnH = btnW * 0.85;

  let btn1X = width * 0.3;
  let btn1Y = height * 0.52;

  hoverFree =
    mouseX > btn1X - btnW / 2 && mouseX < btn1X + btnW / 2 &&
    mouseY > btn1Y - btnH / 2 && mouseY < btn1Y + btnH / 2;

  scaleFree = lerp(scaleFree, hoverFree ? 1.06 : 1, 0.12);

  push();
  translate(btn1X, btn1Y);
  scale(scaleFree);
  noFill();
  noStroke();
  rect(-btnW / 2 + 6, -btnH / 2 + 6, btnW, btnH, 12);
  imageMode(CENTER);
  image(freePaintBtn, 0, 0, btnW, btnH);
  pop();

  let btn2X = width * 0.7;
  let btn2Y = height * 0.52;

  hoverRhythm =
    mouseX > btn2X - btnW / 2 && mouseX < btn2X + btnW / 2 &&
    mouseY > btn2Y - btnH / 2 && mouseY < btn2Y + btnH / 2;

  scaleRhythm = lerp(scaleRhythm, hoverRhythm ? 1.06 : 1, 0.12);

  push();
  translate(btn2X, btn2Y);
  scale(scaleRhythm);
  noFill();
  noStroke();
  rect(-btnW / 2 + 6, -btnH / 2 + 6, btnW, btnH, 12);
  imageMode(CENTER);
  image(rhythmPaintBtn, 0, 0, btnW, btnH);
  pop();

  cursor(hoverFree || hoverRhythm ? HAND : ARROW);

  fill(60);
  noStroke();
  textAlign(RIGHT, BOTTOM);
  textSize(min(width, height) * 0.025);
  textStyle(ITALIC);
  text("Music by Emory Richards (Scary Em)", width - 20, height - 16);
  textStyle(NORMAL);
}


// ============================================================
//  FREE PAINT SCREEN
// ============================================================
function drawFreePaintScreen() {
  background(180);

  imageMode(CORNER);
  image(canvasTexture, toolbarWidth, 0, width - toolbarWidth, height);
  image(drawLayer, 0, 0);

  drawFreePaintToolbar();

  let hoverRadius = 20;
  let palettePoints = [
    { x: 73, y: 491 }, { x: 99, y: 471 },  { x: 126, y: 464 },
    { x: 155, y: 471 },{ x: 173, y: 499 }, { x: 176, y: 537 },
    { x: 162, y: 573 },{ x: 52, y: 519 },  { x: 143, y: 600 },
  ];
  for (let p of palettePoints) {
    if (dist(mouseX, mouseY, p.x, p.y) < hoverRadius) {
      noFill();
      stroke(0, 255, 0);
      strokeWeight(2);
      ellipse(p.x, p.y, hoverRadius * 2);
    }
  }

  if (currentTool === "brush") cursor("crosshair");
  else if (currentTool === "eraser") cursor("grab");
  else cursor("default");

  if (mouseIsPressed && mouseX > toolbarWidth) {
    if (currentTool === "eraser") {
      drawLayer.erase();
      drawLayer.strokeWeight(20);
    } else {
      drawLayer.noErase();
      drawLayer.stroke(clr);
      if (currentTool === "brush") {
        let speed = dist(mouseX, mouseY, pmouseX, pmouseY);
        let dynamicSize = constrain(speed, 5, 30);
        smoothSize = lerp(smoothSize, dynamicSize, 0.2);
        drawLayer.strokeWeight(smoothSize);
      } else {
        drawLayer.strokeWeight(3);
      }
    }
    drawLayer.line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function drawFreePaintToolbar() {
  fill(200);
  noStroke();
  rect(0, 0, toolbarWidth, height, 20);

  // top row: save, clear, menu
  let smallBtn = 100; // undo/redo slightly bigger
  imageMode(CORNER);
  image(saveImg,  10,  700, topBtnSize, topBtnSize);
  image(clearImg, 85,  700, topBtnSize, topBtnSize);
  image(menuImg,  160, 700, topBtnSize, topBtnSize);

  // second row: undo + redo
  image(undoImg,  25,  44, smallBtn, smallBtn);
  image(redoImg,  125, 44, smallBtn, smallBtn);

  // tool highlight
  fill(255, 255, 0, 100);
  noStroke();
  if (currentTool === "brush")  rect(toolX, brushY,  toolW, toolH, 10);
  if (currentTool === "pencil") rect(toolX, pencilY, toolW, toolH, 10);
  if (currentTool === "eraser") rect(toolX, eraserY, toolW, toolH, 10);

  image(brushImg,  toolX, brushY  + toolOffset, toolW, toolH + 40);
  image(pencilImg, toolX, pencilY + toolOffset, toolW, toolH + 40);
  image(eraserImg, toolX, eraserY + toolOffset, toolW, toolH + 40);

  let paletteY = height * 0.53;
  image(paletteImg, 0, paletteY, toolbarWidth, 250);
}


// ============================================================
//  RHYTHM GAME SCREEN
// ============================================================
function drawRhythmScreen() {
  background(0);

  if (gameState === "result") {
    drawResult();
    return;
  }

  drawElephantSide();

  if (gameState === "game") {
    drawRhythmSide();
  } else {
    imageMode(CORNER);
    image(canvasTexture, gameX, 0, gameW, height);
  }

  if (paintTimer > 0) {
    paintTimer--;
  } else {
    elephantState = "idle";
  }

  drawScore();

  if (songStarted && !rhythmSong.isPlaying() && gameState !== "result") {
    gameState = "result";
    resultPhase = "suspense";
    suspenseTimer = 0;
    revealAlpha = 0;
    dotTimer = 0;
    dotCount = 0;
  }
}

function drawElephantSide() {
  imageMode(CORNER);
  image(studioBg, 0, 0, width / 2, height);

  let img;

  if (gameState === "intro") {
    talkTimer++;
    if (talkTimer > 20) {
      talkFrame = (talkFrame + 1) % 2;
      talkTimer = 0;
    }
    img = (talkFrame === 0) ? elephantTalk1 : elephantTalk2;
    drawSpeechBubble(introTexts[introStep]);
  } else {
    img = (elephantState === "paint") ? elephantPaint2 : elephantPaint1;
  }

  imageMode(CENTER);
  let eleSize = width * 0.5;
  image(img, width / 4, height * 0.65, eleSize, eleSize);
}

function drawRhythmSide() {
  imageMode(CORNER);
  image(canvasTexture, gameX, 0, gameW, height);
  drawLanes();
  drawTargetArrows();
  handleChartSpawning();
  handleArrows();
}

function drawLanes() {
  stroke(100);
  for (let i = 0; i <= 4; i++) {
    line(gameX + i * laneWidth, 0, gameX + i * laneWidth, height);
  }
}

function drawTargetArrows() {
  let types = ['left', 'space', 'up', 'right'];
  for (let i = 0; i < 4; i++) {
    let x = gameX + i * laneWidth + laneWidth / 2;
    push();
    translate(x, hitZoneY);
    imageMode(CENTER);
    tint(255, 150);
    drawArrowByType(types[i], 0, 0);
    pop();
  }
}

function handleChartSpawning() {
  if (!songStarted) return;
  let currentTime = millis() - startTime;
  while (chartIndex < chart.length &&
         currentTime >= chart[chartIndex].time - spawnOffset) {
    spawnArrow(chart[chartIndex]);
    chartIndex++;
  }
}

function spawnArrow(note) {
  let types = ['left', 'space', 'up', 'right'];
  let laneIndex = types.indexOf(note.type);
  let x = gameX + laneIndex * laneWidth + laneWidth / 2;
  arrows.push({ x, y: -50, type: note.type });
}

function handleArrows() {
  for (let i = arrows.length - 1; i >= 0; i--) {
    let a = arrows[i];
    a.y += arrowSpeed;
    drawArrowByType(a.type, a.x, a.y);
    if (a.y > height) arrows.splice(i, 1);
  }
}

function drawArrowByType(type, x, y) {
  let size = gameW * 0.12;
  imageMode(CENTER);
  if (type === 'left')  image(leftImg,  x, y, size, size);
  if (type === 'up')    image(upImg,    x, y, size, size);
  if (type === 'right') image(rightImg, x, y, size, size);
  if (type === 'space') image(spaceImg, x, y, size, size);
}

function drawScore() {
  fill(255);
  noStroke();
  textSize(30);
  textAlign(RIGHT, TOP);
  text("Score: " + score, width - 20, 20);
}

function drawSpeechBubble(txt) {
  if (txt !== currentDisplayText) {
    currentDisplayText = txt;
    typewriterIndex = 0;
    typewriterTimer = 0;
  }

  typewriterTimer++;
  if (typewriterTimer >= typewriterSpeed && typewriterIndex < txt.length) {
    typewriterTimer = 0;
    typewriterIndex++;
  }

  let visibleText = txt.substring(0, typewriterIndex);

  let boxW = width * 0.38;
  let boxH = height * 0.2;
  let x = width * 0.04;
  let y = height * 0.06;
  let radius = 16;

  fill(0);
  noStroke();
  rect(x + 6, y + 6, boxW, boxH, radius);

  fill(255, 252, 220);
  stroke(0);
  strokeWeight(4);
  rect(x, y, boxW, boxH, radius);

  fill(255, 252, 220);
  stroke(0);
  strokeWeight(4);
  triangle(x + 30, y + boxH, x + 70, y + boxH, x + 110, y + boxH + 100);
  fill(255, 252, 220);
  noStroke();
  rect(x + 33, y + boxH - 4, 38, 7);

  fill(10);
  noStroke();
  textSize(min(width, height) * 0.025);
  textAlign(LEFT, TOP);
  textLeading(min(width, height) * 0.034);
  text(visibleText, x + 18, y + 18, boxW - 30, boxH - 24);

  if (typewriterIndex < txt.length && frameCount % 20 < 10) {
    fill(10, 150);
    noStroke();
    let lastLine = visibleText.split('\n').pop();
    let cursorX = x + 18 + textWidth(lastLine);
    let cursorY = y + 18 + (visibleText.split('\n').length - 1) * min(width, height) * 0.034;
    rect(cursorX + 2, cursorY + 2, 2, min(width, height) * 0.022);
  }
}

function drawResult() {
  if (resultPhase === "suspense") {
    drawSuspenseScreen();
  } else {
    drawRevealScreen();
  }
}

function drawSuspenseScreen() {
  background(0);
  suspenseTimer++;

  dotTimer++;
  if (dotTimer > 30) {
    dotCount = (dotCount + 1) % 4;
    dotTimer = 0;
  }

  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(min(width, height) * 0.045);
  text("let's see how we did" + ".".repeat(dotCount), width / 2, height / 2);

  if (suspenseTimer > 90) {
    fill(255, map(suspenseTimer, 90, suspenseDuration, 0, 140));
    textSize(min(width, height) * 0.018);
    text("press SPACE to reveal", width / 2, height * 0.62);
  }
}

function drawRevealScreen() {
  background(0);
  revealAngle += 0.008;
  if (revealAlpha < 255) revealAlpha += 4;

  let ratio = (maxScore > 0) ? score / maxScore : 0;
  let resultImg, flavourText;

  if (ratio > 0.8) {
    resultImg   = resultGood;
    flavourText = "what a masterpiece!!";
  } else if (ratio > 0.5) {
    resultImg   = resultOk;
    flavourText = "fridge material :)";
  } else {
    resultImg   = resultBad;
    flavourText = "i think i need some more practice...";
  }

  drawPinwheel(width / 2, height / 2, max(width, height) * 2.85, revealAngle);

  let imgSize = min(width, height) * 0.92;
  tint(255, revealAlpha);
  imageMode(CENTER);
  image(resultImg, width / 2, height / 2, imgSize, imgSize);
  noTint();

  fill(255, revealAlpha);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(min(width, height) * 0.04);
  text(flavourText, width / 2, height * 0.82);

  fill(255, revealAlpha * 0.7);
  textSize(min(width, height) * 0.022);
  text(score + " pts", width / 2, height * 0.89);

  if (revealAlpha > 200) {
    fill(255, 160);
    textSize(min(width, height) * 0.018);
    text("press SPACE to go back to menu", width / 2, height * 0.95);
  }
}

function drawPinwheel(cx, cy, size, angle) {
  let slices = 7;
  let r = size / 2;
  let colours = [
    color(255, 100, 100), color(255, 180, 60),  color(255, 230, 60),
    color(100, 210, 100), color(60,  180, 255),  color(160, 100, 255),
    color(255, 120, 200),
  ];
  push();
  translate(cx, cy);
  rotate(angle);
  noStroke();
  for (let i = 0; i < slices; i++) {
    let a1 = (TWO_PI / slices) * i;
    let a2 = (TWO_PI / slices) * (i + 1);
    fill(colours[i % colours.length]);
    beginShape();
    vertex(0, 0);
    for (let t = 0; t <= 1; t += 0.1) {
      let a = lerp(a1, a2, t);
      vertex(cos(a) * r, sin(a) * r);
    }
    endShape(CLOSE);
  }
  pop();
}

function undo() {
  if (history.length > 0) {
    redoStack.push(drawLayer.get());
    let newLayer = createGraphics(width, height);
    newLayer.image(history.pop(), 0, 0);
    drawLayer = newLayer;
  }
}

function redo() {
  if (redoStack.length > 0) {
    history.push(drawLayer.get());
    let newLayer = createGraphics(width, height);
    newLayer.image(redoStack.pop(), 0, 0);
    drawLayer = newLayer;
  }
}


// ============================================================
//  MOUSE
// ============================================================
function mousePressed() {

  if (topScreen === "title" && isHovering && !isFading) {
    fadeTo("menu");
    return;
  }

  if (topScreen === "menu") {
    if (hoverFree) {
      fadeTo("freepaint");
      return;
    }
    if (hoverRhythm) {
      bgMusicVolume = 0.99;
      fadeTo("rhythm");
      return;
    }
  }

  if (topScreen === "freepaint") {
     // menu button
    if (mouseX > 160 && mouseX < 160 + topBtnSize && mouseY > 700 && mouseY < 700 + topBtnSize) {
      if (!bgMusic.isPlaying()) {
        bgMusicVolume = 1.0;
        bgMusic.setVolume(1.0);
        bgMusic.loop();
      }
      fadeTo("menu");
      return;
    }

    if (mouseX > toolbarWidth) {
      history.push(drawLayer.get());
      redoStack = [];
    }

    if (dist(mouseX, mouseY, 47,  737) < 30) saveCanvas("drawing.png");
    if (dist(mouseX, mouseY, 122, 737) < 30) drawLayer.clear();
    if (dist(mouseX, mouseY, 75,  94)  < 30) undo();
    if (dist(mouseX, mouseY, 175, 94)  < 30) redo();

    if (mouseX > toolX && mouseX < toolX + toolW) {
      if (mouseY > brushY  && mouseY < brushY  + toolH) currentTool = "brush";
      if (mouseY > pencilY && mouseY < pencilY + toolH) currentTool = "pencil";
      if (mouseY > eraserY && mouseY < eraserY + toolH) currentTool = "eraser";
    }

    if (dist(mouseX, mouseY, 73,  491) < 20) clr = ["#ff3131"];
    if (dist(mouseX, mouseY, 99,  471) < 20) clr = ["#ff914d"];
    if (dist(mouseX, mouseY, 126, 464) < 20) clr = ["#ffde59"];
    if (dist(mouseX, mouseY, 155, 471) < 20) clr = ["#00bf63"];
    if (dist(mouseX, mouseY, 173, 499) < 20) clr = ["#1432d0"];
    if (dist(mouseX, mouseY, 176, 537) < 20) clr = ["#8c52ff"];
    if (dist(mouseX, mouseY, 162, 573) < 20) clr = [0, 0, 0];
    if (dist(mouseX, mouseY, 52,  519) < 20) clr = [255, 255, 255];
    if (dist(mouseX, mouseY, 143, 600) < 20) clr = ["#7c5934"];
  }
}


// ============================================================
//  KEYBOARD
// ============================================================
function keyPressed() {

  if (topScreen !== "rhythm") return;

  if (key === 't') {
    gameState    = "result";
    resultPhase  = "suspense";
    suspenseTimer = 0;
    revealAlpha  = 0;
    dotTimer = 0;
    dotCount = 0;
    return;
  }

  if (gameState === "result") {
    if (key === ' ') {
      if (resultPhase === "suspense") {
        resultPhase = "reveal";
        revealAlpha = 0;
      } else {
        fadeTo("menu_from_rhythm");
      }
    }
    return;
  }

  if (gameState === "intro" && key === ' ') {
    introStep++;
    typewriterIndex = 0;
    typewriterTimer = 0;
    currentDisplayText = "";
    if (introStep >= 2) {
      gameState = "game";
      elephantState = "idle";
    }
    return;
  }

  if (keyCode === ENTER && !songStarted) {
    rhythmSong.play();
    startTime = millis();
    songStarted = true;
    return;
  }

  if (!songStarted) return;

  let inputType =
    keyCode === LEFT_ARROW  ? 'left'  :
    keyCode === UP_ARROW    ? 'up'    :
    keyCode === RIGHT_ARROW ? 'right' :
    key === ' '             ? 'space' : null;

  if (!inputType) return;

  if (recordMode) {
    recordedChart.push({ time: millis() - startTime, type: inputType });
    console.log(JSON.stringify(recordedChart));
  }

  for (let i = arrows.length - 1; i >= 0; i--) {
    let a = arrows[i];
    if (a.type === inputType) {
      let d = abs(a.y - hitZoneY);
      if      (d < 20) score += 100;
      else if (d < 40) score += 70;
      else if (d < 70) score += 40;
      else continue;

      maxScore += 100;
      elephantState = "paint";
      paintTimer = 5;
      arrows.splice(i, 1);
      break;
    }
  }
}

function resetRhythmGame() {
  gameState    = "intro";
  introStep    = 0;
  score        = 0;
  maxScore     = 0;
  arrows       = [];
  chartIndex   = 0;
  songStarted  = false;
  resultPhase  = "suspense";
  suspenseTimer = 0;
  dotTimer     = 0;
  dotCount     = 0;
  revealAngle  = 0;
  revealAlpha  = 0;
  typewriterIndex = 0;
  typewriterTimer = 0;
  currentDisplayText = "";
  elephantState = "idle";
  paintTimer = 0;
}

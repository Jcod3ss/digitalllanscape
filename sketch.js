let x = 100;
let y = 280;
let skyColor = 200;
let sound;

function setup() {
  createCanvas(600, 400);

  // Create a simple sound
  sound = new p5.Oscillator("sine");
  sound.freq(440);
  sound.amp(0);
  sound.start();
}

function draw() {
  // Sky
  background(skyColor, 100, 220);

  // Sun
  fill(255, 220, 80);
  circle(480, 80, 70);

  // Mountains
  fill(90, 100, 170);
  triangle(50, 300, 200, 100, 350, 300);
  triangle(250, 300, 420, 130, 580, 300);

  // Ground
  fill(60, 170, 100);
  rect(0, 300, 600, 100);

  // Read the game controller
  let controllers = navigator.getGamepads();
  let controller = controllers[0];

  if (controller) {
    // Left stick: move the character
    if (controller.axes[0] < -0.3) {
      x = x - 3;
    }

    if (controller.axes[0] > 0.3) {
      x = x + 3;
    }

    if (controller.axes[1] < -0.3) {
      y = y - 3;
    }

    if (controller.axes[1] > 0.3) {
      y = y + 3;
    }

    // D-pad: move left and right
    if (controller.buttons[14].pressed) {
      x = x - 3;
    }

    if (controller.buttons[15].pressed) {
      x = x + 3;
    }

    // X button: change sky color
    if (controller.buttons[2].pressed) {
      skyColor = random(150, 255);
    }

    // A button: make a sound
    if (controller.buttons[0].pressed) {
      userStartAudio();
      sound.freq(random(300, 700));
      sound.amp(0.2, 0.05);
      sound.amp(0, 0.3);
    }
  }

  // Keyboard controls as a backup
  if (keyIsDown(LEFT_ARROW)) x = x - 3;
  if (keyIsDown(RIGHT_ARROW)) x = x + 3;
  if (keyIsDown(UP_ARROW)) y = y - 3;
  if (keyIsDown(DOWN_ARROW)) y = y + 3;

  // Keep the character inside the canvas
  x = constrain(x, 15, 585);
  y = constrain(y, 15, 285);

  // Character
  fill(255, 100, 150);
  circle(x, y, 35);

  // Instructions
  fill(255);
  textSize(13);
  text("LEFT STICK: MOVE", 15, 25);
  text("X BUTTON: CHANGE SKY", 15, 45);
  text("A BUTTON: SOUND", 15, 65);
}

function mousePressed() {
  userStartAudio();
}
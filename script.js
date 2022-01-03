import { updateGround, setupGround } from "./ground.js";
import { updateDino, setupDino, getDinoRect, setDinoLose } from "./dino.js";
import { updateCactus, setupCactus, getCactusRects } from "./cactus.js";

const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const SPEED_SCALE_INCREASE = 0.00001;

const world = document.querySelector("[data-world]");
const score_element = document.querySelector("[data-score]");
const startScreen = document.querySelector("[data-start-screen]");

setPixelToWorldScale();
window.addEventListener("resize", setPixelToWorldScale);
document.addEventListener("keydown", handleStart, { once: true });

let lastTime;
let speedScale; //should be gradually faster as the game proceeds
let score;

function update(time) {
  // for first time
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }
  const delta = time - lastTime;

  updateGround(delta, 1);
  updateDino(delta, speedScale);
  updateCactus(delta, speedScale);
  updateSpeedScale(delta);
  updateScore(delta);
  if (checkLose()) return handleLose();

  lastTime = time;
  window.requestAnimationFrame(update);
}

// world scaling
function setPixelToWorldScale() {
  // if current window is wider than world ratio -> pixel scale based on width (limiting factor); else based on height
  let worldToPixelScale =
    window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT
      ? window.innerWidth / WORLD_WIDTH
      : window.innerHeight / WORLD_HEIGHT;

  world.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
  world.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
}

function handleStart() {
  lastTime = null;
  speedScale = 1;
  score = 0;
  setupGround();
  setupDino();
  setupCactus();

  startScreen.classList.add("hide");
  window.requestAnimationFrame(update); //start loop
}

function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE;
}

function updateScore(delta) {
  score += delta * 0.01;
  score_element.textContent = Math.floor(score);
}

function checkLose() {
  const dinoRect = getDinoRect();
  return getCactusRects().some((rect) => isCollision(rect, dinoRect));
}

function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  );
}

function handleLose() {
  setDinoLose();
  setTimeout(() => {
    document.addEventListener("keydown", handleStart, { once: true });
    setLoseMessages();
  }, 100);
}

function setLoseMessages() {
  startScreen.innerHTML = `
        <b style="font-size:5vmin; color:red">Game Over</b> 
        <u style="font-size:3vmin">Final Score: ${score_element.textContent}</u>
        <span style="font-size:2vmin">Press Any Key to Retart</span>
    `;
  startScreen.style.cssText += "white-space: pre-line"; //display \n properly
  startScreen.style.top = "30%";
  startScreen.style.textAlign = "center";
  startScreen.classList.remove("hide");
}

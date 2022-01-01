const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;


const world = document.querySelector('[data-world]');


setPixelToWorldScale();
window.addEventListener("resize", setPixelToWorldScale);

let lastTime;

function update(time){
    // for first time
    if (lastTime == null) {
        lastTime = time;
        window.requestAnimationFrame(update);
        return;
    }
      const delta = time - lastTime;
}

window.requestAnimationFrame(update);


// world scaling
function setPixelToWorldScale() {
    // if current window is wider than world ratio -> pixel scale based on width (limiting factor); else based on height
    let worldToPixelScale = window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT ? window.innerWidth / WORLD_WIDTH : window.innerHeight / WORLD_HEIGHT;
  
    world.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
    world.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
  }

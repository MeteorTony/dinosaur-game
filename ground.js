import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js";

const SPEED = 0.05;
const grounds = document.querySelectorAll("[data-ground]");

export function setupGround() {
  setCustomProperty(grounds[0], "--left", 0);
  setCustomProperty(grounds[1], "--left", 300); // since width of ground class is 300%
}

export function updateGround(delta, speedScale) {
  grounds.forEach((ground) => {
    // every update -> move leftwards
    // -1: move backwards
    incrementCustomProperty(ground, "--left", delta * speedScale * SPEED * -1);

    // when right side of ground just moved off the edge of screen
    // prevent grounds from running out
    if (getCustomProperty(ground, "--left") <= -300) {
      incrementCustomProperty(ground, "--left", 600); //600: placed after 2nd ground element
    }
  });
}

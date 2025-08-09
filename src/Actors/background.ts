import { Actor, vec } from "excalibur";
import { Resources } from "../resources";
import { globalScaling } from "../main";

export class Background extends Actor {
  constructor() {
    super({
      pos: vec(0, 0), // Position at the top-left corner
      width: 1920,
      height: 1080,
      anchor: vec(0, 0), // Anchor at the top-left corner
      z: -100, // Ensure the background is behind other actors
    });
    this.graphics.use(Resources.bgnd.toSprite());
  }
}

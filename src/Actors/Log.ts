import { Actor, Engine, vec } from "excalibur";
import { Resources } from "../resources";

export class Log extends Actor {
  constructor(direction: "left" | "right") {
    super({
      pos: vec(1980 / 2 - 150, 750), // Example position
      width: 300, // Example width
      height: 120, // Example height
      anchor: vec(0, 0), // Anchor at the bottom center
      z: 5, // Default z-index for the log
    });
    if (direction === "right") this.vel = vec(-3400, -200);
    else this.vel = vec(3400, -200);
    this.graphics.use(Resources.log.toSprite());
  }

  onPreUpdate(engine: Engine, elapsed: number): void {
    if (this.pos.x < 0 || this.pos.x > engine.screen.width) this.kill();
  }
}

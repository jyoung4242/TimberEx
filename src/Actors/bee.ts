import { Actor, Engine, Random } from "excalibur";
import { Resources } from "../resources";
import { Signal } from "../Lib/Signals";

export class Bee extends Actor {
  rng: Random;
  OOTSignal: Signal = new Signal("outOfTime");
  resetSignal: Signal = new Signal("resetGame");
  speed: number;
  isPaused: boolean = true;
  constructor() {
    super({ width: 60, height: 40, z: 5 });
    this.graphics.use(Resources.bee.toSprite());
    this.rng = new Random();
    this.pos.y = this.rng.integer(500, 800); // Random vertical position
    this.speed = this.rng.floating(0.2, 4.0);
    this.OOTSignal.listen(() => {
      this.isPaused = true; // Pause the cloud when out of time
    });
    this.resetSignal.listen(() => {
      this.isPaused = false;
    });
  }

  onPreUpdate(engine: Engine, elapsed: number): void {
    if (this.isPaused) return;
    // Move the cloud to the right
    this.pos.x -= this.speed;
    if (this.pos.x < -100) {
      // Reset position to the left side of the screen
      this.pos.x = engine.screen.width + 100;
      this.pos.y = this.rng.integer(500, 800);
      this.speed = this.rng.floating(0.2, 4.0);
    }
  }
}

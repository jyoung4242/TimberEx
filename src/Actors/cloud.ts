import { Actor, Engine, Random, vec, Vector } from "excalibur";
import { Resources } from "../resources";
import { Signal } from "../Lib/Signals";

export class Cloud extends Actor {
  isPaused: boolean = true;
  OOTSignal: Signal = new Signal("outOfTime");
  resetSignal: Signal = new Signal("resetGame");
  rng: Random;
  speed: number = 0.25; // Speed of the cloud movement
  constructor(pos: Vector = vec(0, 0)) {
    super({
      pos, // Example position
      width: 300, // Example width
      height: 150, // Example height
      anchor: Vector.Zero, // Anchor at the center
      z: -50, // Ensure the cloud is behind other actors but above the background
    });
    this.graphics.use(Resources.cloud.toSprite());
    this.rng = new Random();
    this.speed = this.rng.floating(0.1, 2.5);
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
    this.pos.x += this.speed;
    if (this.pos.x > engine.screen.width + 325) {
      // Reset position to the left side of the screen
      this.pos.x = -350;
      this.pos.y = this.rng.integer(0, 500);
      this.speed = this.rng.floating(0.1, 2.5);
    }
  }
}

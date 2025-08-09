import { Actor, Color, Engine, Rectangle, vec } from "excalibur";
import { Signal } from "../Lib/Signals";
import { getScore, showMessage } from "../UI/UI";
import { Resources } from "../resources";

export class TimerBar extends Actor {
  isPaused: boolean = true;
  timeRemaining: number = 6000;
  OOTSignal: Signal = new Signal("outOfTime");
  ResetSignal: Signal = new Signal("resetGame");
  addTimeSignal: Signal = new Signal("addTime");
  gameOverSignal: Signal = new Signal("gameOver");

  constructor() {
    super({
      width: 400,
      height: 30,
      pos: vec(1980 / 2 - 200, 1000), // Example position
      scale: vec(1, 1),
      color: Color.Red,
      anchor: vec(0, 0), // Center the timer bar
      z: 50,
    });
    this.ResetSignal.listen(() => {
      this.isPaused = false;
      this.timeRemaining = 6000;
    });
    this.addTimeSignal.listen(() => {
      let score = getScore();
      this.timeRemaining += (2 / score) * 100 + 150;
    });
    this.gameOverSignal.listen(() => {
      this.isPaused = true;
    });
  }

  onPreUpdate(engine: Engine, elapsed: number): void {
    if (!this.isPaused) this.timeRemaining -= elapsed;
    let percentTimeRemaining = this.timeRemaining / 6000;
    this.scale.x = percentTimeRemaining;

    if (this.timeRemaining <= 0) {
      this.isPaused = true;
      this.OOTSignal.send();
      showMessage("OUT OF TIME!");
      Resources.OOT.play();
    }
  }

  addTime() {}
}

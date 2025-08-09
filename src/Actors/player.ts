import { Actor, vec, Graphic, Engine, KeyEvent, Scene } from "excalibur";
import { Resources } from "../resources";
import { Axe } from "./Axe";
import { Log } from "./Log";
import { hideMessage, incrementScore, resetUI } from "../UI/UI";
import { Signal } from "../Lib/Signals";
import { Tree } from "./tree";

export class Player extends Actor {
  side: "left" | "right" = "left"; // Player's side
  axe: Axe;
  graphicRight: Graphic;
  graphicLeft: Graphic;
  gravestone: Graphic = Resources.rip.toSprite();
  scene: Scene | null = null;
  OOTSignal: Signal = new Signal("outOfTime");
  ResetSignal: Signal = new Signal("resetGame");
  addTimeSignal: Signal = new Signal("addTime");
  gameOverSignal: Signal = new Signal("gameOver");
  isPaused: boolean = true;
  tree: Tree;
  constructor(tree: Tree) {
    super({
      pos: vec(750, 800), // Example position
      width: 150, // Example width
      height: 192, // Example height
      z: 10, // Default z-index
    });
    this.graphicRight = Resources.player.toSprite();
    this.graphicLeft = Resources.player.toSprite().clone();
    this.graphicLeft.flipHorizontal = true; // Flip the sprite for left side
    this.graphics.use(this.graphicLeft);
    this.axe = new Axe();
    this.addChild(this.axe);
    this.OOTSignal.listen(() => {
      this.isPaused = true; // Pause the cloud when out of time
    });
    this.gameOverSignal.listen(() => {
      this.isPaused = true;
      this.graphics.use(this.gravestone);
      this.axe.hide();
      Resources.death.play();
    });
    this.ResetSignal.listen(() => {
      this.isPaused = false;
      this.graphics.use(this.side === "left" ? this.graphicLeft : this.graphicRight);
    });
    this.tree = tree;
  }

  onInitialize(engine: Engine): void {
    this.scene = engine.currentScene;
  }

  onKeyDown = (e: KeyEvent): void => {
    if (!this.isPaused) {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return; // Only handle left/right arrow keys

      switch (e.key) {
        case "ArrowLeft":
          this.side = "left";
          this.graphics.use(this.graphicLeft);
          this.pos = vec(750, 800);
          break;
        case "ArrowRight":
          this.side = "right";
          this.graphics.use(this.graphicRight);
          this.pos = vec(1250, 800);
          break;
      }
      this.scene?.add(new Log(this.side));
      incrementScore();
      this.axe.show(this.side);
      this.addTimeSignal.send();
      this.tree.updateBranches(this.side);
      Resources.chop.play();
    } else {
      // waiting for enter key
      if (e.key === "Enter") {
        this.isPaused = false; // Pause the cloud when out of time
        this.ResetSignal.send();
        hideMessage();
        resetUI();
      }
    }
  };

  onKeyUp(e: KeyEvent): void {
    if (this.isPaused) return; // Ignore input if paused
    this.axe.hide();
  }
}

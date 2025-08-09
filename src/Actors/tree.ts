import { Actor, Random, vec } from "excalibur";
import { Resources } from "../resources";
import { Branch } from "./branch";
import { Signal } from "../Lib/Signals";
import { showMessage } from "../UI/UI";

export class Tree extends Actor {
  rng: Random;
  branches: Array<Branch | null> = [null, null, null, null, null];
  gameOverSignal: Signal = new Signal("gameOver");
  resetSignal: Signal = new Signal("resetGame");
  constructor() {
    super({
      pos: vec(1980 / 2 - 150, 0), // Example position
      width: 300, // Example width
      height: 900, // Example height
      anchor: vec(0, 0), // Anchor at the bottom center
      z: 0, // Default z-index
    });
    this.graphics.use(Resources.tree.toSprite());
    this.rng = new Random();
    this.resetSignal.listen(() => {
      this.branches.forEach(branch => {
        if (branch) {
          branch.kill();
        }
      });
      this.branches = [null, null, null, null, null];
    });
  }

  updateBranches(playerside: "left" | "right"): void {
    //remove the last branch
    if (this.branches[4]) {
      this.removeChild(this.branches[4]);
      let branch = this.branches[4] as Branch;
      branch.kill(); // Remove the branch from the game
      this.branches[4] = null;
    }
    //shift branches down the array
    for (let i = this.branches.length - 1; i > 0; i--) {
      this.branches[i] = this.branches[i - 1];
      //lower branch position
      if (this.branches[i]) this.branches[i]!.pos.y += 200;
    }
    //randomly add a new branch in index 0
    let rnd = this.rng.integer(0, 10);
    let coinflip = this.rng.bool();

    if (rnd < 4) {
      let direction: "left" | "right" = coinflip ? "left" : "right";
      this.branches[0] = new Branch(direction);
      this.addChild(this.branches[0]);
    } else {
      this.branches[0] = null;
    }

    if (this.branches[4] && (this.branches[4] as Branch).direction === playerside) {
      showMessage("SQUISHED!!");
      this.gameOverSignal.send(); // Send game over signal if player hits the branch
      return;
    }
  }
}

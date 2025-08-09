import { Actor, Graphic, vec, Vector } from "excalibur";
import { Resources } from "../resources";

export class Branch extends Actor {
  direction: "left" | "right" = "left";
  leftGraphic: Graphic;
  rightGraphic: Graphic;

  constructor(direction: "left" | "right") {
    let startingposition = direction === "left" ? { x: -220, y: 0 } : { x: 520, y: 0 };
    super({ pos: vec(startingposition.x, startingposition.y), width: 440, height: 80, anchor: Vector.Half });
    this.direction = direction;
    this.rightGraphic = Resources.branch.toSprite();
    this.leftGraphic = Resources.branch.toSprite().clone();
    this.leftGraphic.flipHorizontal = true;
    this.graphics.use(this.direction === "left" ? this.leftGraphic : this.rightGraphic);
  }
}

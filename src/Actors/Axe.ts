import { Actor, Graphic, vec, Vector } from "excalibur";
import { Resources } from "../resources";

export class Axe extends Actor {
  side: "left" | "right" = "left";
  graphicLeft: Graphic;
  graphicRight: Graphic;
  constructor() {
    super({
      pos: vec(0, 0), // Example position
      width: 152, // Example width
      height: 28, // Example height
      anchor: Vector.Zero,
      z: 20, // Default z-index for the axe
    });
    this.graphicLeft = Resources.axe.toSprite();
    this.graphicRight = Resources.axe.toSprite().clone();
    this.graphicRight.flipHorizontal = true;

    this.hide();
  }

  show(side: "left" | "right") {
    if (side === "left") {
      this.graphics.use(this.graphicLeft);
      this.pos = vec(0, 0);
    } else {
      this.graphics.use(this.graphicRight);
      this.pos = vec(-152, 0);
    }
  }

  hide() {
    this.graphics.hide();
  }
}

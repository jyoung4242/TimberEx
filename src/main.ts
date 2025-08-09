// main.ts
import "./style.css";

import { UI } from "@peasy-lib/peasy-ui";
import { Engine, DisplayMode, vec, KeyEvent } from "excalibur";
import { model, resizeUI, showMessage, template } from "./UI/UI";
import { loader } from "./resources";
import { Background } from "./Actors/background";
import { Tree } from "./Actors/tree";
import { Cloud } from "./Actors/cloud";
import { Bee } from "./Actors/bee";
import { Player } from "./Actors/player";
import { TimerBar } from "./Actors/TimerBar";

await UI.create(document.body, model, template).attached;

const game = new Engine({
  width: 1920, // the width of the canvas
  height: 1080, // the height of the canvas
  canvasElementId: "cnv", // the DOM canvas element ID, if you are providing your own
  displayMode: DisplayMode.FitScreen, // the display mode
  pixelArt: true,
});

await game.start(loader);
// set global scaling by viewport size

resizeUI(game.screen.viewport.width, game.screen.viewport.height);

const tree = new Tree();
game.add(new Background());
game.add(tree);
game.add(new Cloud(vec(0, 100))); // Example position for the cloud
game.add(new Cloud(vec(0, 200))); // Another cloud at a different position
game.add(new Cloud(vec(0, 300))); // Another cloud at a different position
game.add(new Bee());
let player = new Player(tree);
game.add(player);
game.add(new TimerBar());

game.input.keyboard.on("press", (e: KeyEvent) => {
  player.onKeyDown(e);
});
game.input.keyboard.on("release", (e: KeyEvent) => {
  player.onKeyUp(e);
});

showMessage("PRESS ENTER TO START");

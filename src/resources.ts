// resources.ts
import { FontSource, ImageSource, Loader, Sound, Sprite, SpriteSheet } from "excalibur";
import bgnd from "./Assets/graphics/background.png"; // replace this
import axe from "./Assets/graphics/axe.png"; // replace this
import player from "./Assets/graphics/player.png"; // replace this
import bee from "./Assets/graphics/bee.png"; // replace this
import cloud from "./Assets/graphics/cloud.png"; // replace this
import rip from "./Assets/graphics/rip.png"; // replace this
import branch from "./Assets/graphics/branch.png"; // replace this
import myFont from "./Assets/fonts/KOMIKAP.ttf"; // replace this src\Assets\fonts\KOMIKAP.ttf
import chop from "./Assets/sound/chop.wav"; // replace this
import death from "./Assets/sound/death.wav"; // replace this
import OOT from "./Assets/sound/out_of_time.wav"; // replace this
import tree from "./Assets/graphics/tree.png";
import log from "./Assets/graphics/log.png"; // replace this

export const Resources = {
  log: new ImageSource(log),
  bgnd: new ImageSource(bgnd),
  axe: new ImageSource(axe),
  player: new ImageSource(player),
  bee: new ImageSource(bee),
  cloud: new ImageSource(cloud),
  rip: new ImageSource(rip),
  branch: new ImageSource(branch),
  myFont: new FontSource(myFont, "myfont"),
  chop: new Sound(chop),
  death: new Sound(death),
  tree: new ImageSource(tree),
  OOT: new Sound(OOT),
};

export const loader = new Loader();

for (let res of Object.values(Resources)) {
  loader.addResource(res);
}

import k from "../context";
import renderSonic from "../gameObjects/sonic";

const menu = () => {

  // play menu music
  const sfx = k.play("menu", { volume: 0.3, loop: true });

  // set best score
  if (!k.getData("best")) {
    k.setData("best", 0);
  }

  // set button action
  k.onButtonPress("jump", () => {
    k.go("game", sfx);
  });

  // set infinite background
  const bgWidth = 1920;
  const bgs = [
    k.add([k.sprite("bg"), k.pos(0, -60), k.scale(1.2), k.opacity(0.8)]),
    k.add([
      k.sprite("bg"),
      k.pos(bgWidth * 1.2, -60),
      k.scale(1.2),
      k.opacity(0.8),
    ]),
  ];

  // add platforms
  const platforms = [
    k.add([k.sprite("platform"), k.pos(0, 400), k.scale(3)]),
    k.add([k.sprite("platform"), k.pos(1280 * 3, 400), k.scale(3)]),
  ];

  // get sonic
  renderSonic(k.vec2(240, 600));
  k.add([
    k.rect(1920, 100),
    k.area(),
    k.body({ isStatic: true }),
    k.pos(0, 690),
    k.opacity(0),
  ]);

  // title text
  k.add([
    k.text("SONIC BOOM", { font: "mania", size: 48, styles: "underline" }),
    k.pos(k.center().x, 200),
    k.anchor("center"),
    k.scale(2),
  ]);

  // best score
  k.add([
    k.text("BEST SCORE : " + k.getData("best"), { font: "mania", size: 24 }),
    k.pos(k.center().x, 300),
    k.anchor("center"),
    k.scale(2),
  ]);

  // start text
  k.add([
    k.text("PRESS 'space' OR 'click' TO START", { font: "mania", size: 24 }),
    k.pos(k.center().x, 350),
    k.anchor("center"),
    k.scale(2),
  ]);

  // set updating function
  k.onUpdate(() => {
    // if bgs[1] is out of screen
    if (bgs[1].pos.x < 0) {
      bgs[0].moveTo(bgs[1].pos.x + bgWidth * 1.2, -60);
      const temp = bgs[0];
      bgs[0] = bgs[1];
      bgs[1] = temp;
    }

    // for platforms
    if (platforms[1].pos.x < 0) {
      platforms[0].moveTo(platforms[1].pos.x + 1280 * 3, 400);
      const temp = platforms[0];
      platforms[0] = platforms[1];
      platforms[1] = temp;
    }

    // move bg
    bgs[0].move(-150, 0);
    // bgs[1].move(-400, 0);
    bgs[1].moveTo(bgs[0].pos.x + bgWidth * 1.2, bgs[0].pos.y);

    // move platforms
    platforms[0].move(-1200, 0);
    platforms[1].move(-1200, 0);
  });
};

export default menu;

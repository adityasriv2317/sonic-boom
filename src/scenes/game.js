import k from "../context";
import renderRing from "../gameObjects/ring";
import renderSonic from "../gameObjects/sonic";
import motoBug from "../gameObjects/motoBug";

const gameScene = (sfx) => {
  if (sfx) sfx.paused = true;
  console.log("Game Scene");

  // play bg music
  const music = k.play("ingame", { volume: 0.3, loop: true });

  // set infinite background
  const bgWidth = 1920;
  const bgs = [
    k.add([k.sprite("bg"), k.pos(0, 0), k.scale(1.2), k.opacity(0.8)]),
    k.add([
      k.sprite("bg"),
      k.pos(bgWidth * 1.2, 0),
      k.scale(1.2),
      k.opacity(0.8),
    ]),
  ];

  // k.add([k.text("GAME")]);

  // add platforms
  const platforms = [
    k.add([k.sprite("platform"), k.pos(0, 400), k.scale(3)]),
    k.add([k.sprite("platform"), k.pos(1280 * 3, 400), k.scale(3)]),
  ];

  // game speed
  let gameSpeed = 300;

  k.loop(1, () => {
    gameSpeed += 10;
  });

  // ring for score UI
  let score = 0;
  const ringUi = renderRing(k.vec2(60, 40));
  ringUi.scaleTo(3);
  ringUi.play("spinUI");
  const UI = k.add([
    k.text(" 0", { font: "mania", size: 48 }),
    k.pos(90, 42),
    k.anchor("left"),
  ]);

  // ring for score
  const spawnRing = () => {
    const ring = renderRing(k.vec2(1940, 630));
    ring.onUpdate(() => {
      ring.move(-gameSpeed, 0);
    });

    ring.onExitScreen(() => {
      ring.destroy();
    });

    const waitTime = k.rand(1, 1.8);
    k.wait(waitTime, () => {
      spawnRing();
    });
  };
  spawnRing();

  k.setGravity(3500);
  // get sonic
  const sonic = renderSonic(k.vec2(240, 600));
  sonic.setControls();
  sonic.setEvents();
  sonic.onCollide("bug", (bug) => {
    if (!sonic.isGrounded()) {
      k.play("destroy", { volume: 0.7 });
      k.wait(0.1, () => {
        k.play("hyperRing", { volume: 0.7 });
      });
      bug.destroy();
      sonic.play("jump");
      score += 5;
      UI.text = ` ${score}`;

      sonic.plusUI.text = "+5";
      k.wait(0.5, () => {
        sonic.plusUI.text = "";
      });
    } else {
      k.setData("score", score);
      k.play("hurt", { volume: 0.7 });
      k.go("gameOver", music);
    }
  });
  sonic.onCollide("ring", (ring) => {
    ring.destroy();
    k.play("ring", { volume: 0.7 });
    score++;
    UI.text = ` ${score}`;
  });

  // sonic base collider
  k.add([
    k.rect(1920, 100),
    k.area(),
    k.body({ isStatic: true }),
    k.pos(0, 690),
    k.opacity(0),
  ]);

  // enemy spawn
  const spawnBug = () => {
    const bug = motoBug(k.vec2(1940, 630));
    bug.onUpdate(() => {
      if (gameSpeed < 3000) {
        bug.move(-(gameSpeed + 300), 0);
        return;
      }
      bug.move(-gameSpeed, 0);
    });

    bug.onExitScreen(() => {
      bug.destroy();
    });

    const waitTime = k.rand(0.75, 1.7);
    k.wait(waitTime, () => {
      spawnBug();
    });
  };
  spawnBug();

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
    // bgs[1].move(-400, 0);
    bgs[0].move(-150, 0);
    bgs[1].moveTo(bgs[0].pos.x + bgWidth * 1.2, bgs[0].pos.y);

    // jump for bg
    bgs[0].moveTo(bgs[0].pos.x, -sonic.pos.y / 10);
    bgs[1].moveTo(bgs[1].pos.x, -sonic.pos.y / 10);

    // move platforms
    platforms[0].move(-gameSpeed * 4, 0);
    // bgs[1].moveTo(bgs[0].pos.x + bgWidth * 1.2, 0);
    platforms[1].moveTo(platforms[0].pos.x + 1280 * 3, 400);
  });
};

export default gameScene;

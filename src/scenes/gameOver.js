import k from "../context";

const gameOver = (sfx) => {
  sfx.paused = true;

  k.add([
    k.text("GAME OVER", { font: "mania", size: 72 }),
    k.pos(k.width() / 2, 200),
    k.anchor("center"),
  ]);
  k.add([
    k.text("press 'SPACE' to restart", { font: "mania", size: 44 }),
    k.pos(k.width() / 2, 290),
    k.anchor("center"),
  ]);
  k.add([
    k.text("press 'M' to go to menu", { font: "mania", size: 44 }),
    k.pos(k.width() / 2, 340),
    k.anchor("center"),
  ]);

  //   score and highscore
  const score = k.getData("score");
  const best = k.getData("best");
  if (score > best) {
    k.setData("best", score);
  }
  k.add([
    k.text("SCORE : " + score, { font: "mania", size: 36 }),
    k.pos(k.width() / 2, k.height() / 2),
    k.anchor("center"),
  ]);
  k.add([
    k.text("BEST SCORE : " + k.getData("best"), { font: "mania", size: 36 }),
    k.pos(k.width() / 2, k.height() / 2 + 72),
    k.anchor("center"),
  ]);

  k.onButtonPress("jump", () => {
    k.go("game");
  });
  k.onKeyPress("m", () => {
    k.go("menu");
  });   
};

export default gameOver;

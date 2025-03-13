import k from "./src/context";
import menu from "./src/scenes/menu";
import game from "./src/scenes/game";
import splash from "./src/scenes/splash";

// loading assets
k.loadSprite("bg", "assets/bg.jpg");
k.loadSprite("platform", "assets/platform.png");

// loading sprites
k.loadSprite("sonic", "assets/sonic.png", {
  sliceX: 8,
  sliceY: 2,
  anims: {
    run: { from: 0, to: 7, loop: true, speed: 30 },
    jump: { from: 8, to: 15, loop: true, speed: 50 },
  },
});

k.loadSprite("ring", "assets/ring.png", {
  sliceX: 16,
  sliceY: 1,
  anims: {
    spin: { from: 0, to: 15, loop: true, speed: 30 },
    spinUI: { from: 0, to: 15, loop: true, speed: 24 },
  },
});

k.loadSprite("motoBug", "assets/motoBug.png", {
  sliceX: 5,
  sliceY: 1,
  anims: {
    run: { from: 0, to: 4, loop: true, speed: 30 },
  },
});

// loading fonts
// k.loadFont("sonicMaina", "assets/sonicMaina.ttf");

// loading sounds
k.loadSound("menu", "./music/menu.mp3")
k.loadSound("ring", "./music/ring.wav");
k.loadSound("jump", "./music/jump.wav");
k.loadSound("hurt", "./music/hurt.wav");
k.loadSound("destroy", "./music/destroy.wav");
k.loadSound("hyperRing", "./music/hyperRing.wav");

// loading scenes
k.scene("splash", splash);
k.scene("menu", menu);
k.scene("game", game);

k.go("splash");
// k.go("menu");
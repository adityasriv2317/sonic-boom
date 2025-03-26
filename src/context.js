import kaplay from "kaplay";

const k = kaplay({
  width: 1920,
  height: 1080,
  letterbox: true,
  background: "#000000",
  fullscreen: true,
  global: false,
  touchToMouse: true,
  buttons: {
    jump: {
      keyboard: ["space", "up"],
      mouse: "left",
    },
  },

  debugKey: "0",
  debug: false,
});

export default k;

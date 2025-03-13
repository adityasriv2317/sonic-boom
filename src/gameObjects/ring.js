import k from "../context";

const renderRing = (pos) => {
  const ring = k.add([
    k.sprite("ring", { anim: "spin" }),
    k.area(),
    k.scale(4),
    k.anchor("center"),
    k.pos(pos),
    k.offscreen(),
    "ring",
  ]);

  return ring;
};

export default renderRing;

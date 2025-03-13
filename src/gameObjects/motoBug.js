import k from "../context";

const motoBug = (pos) => {
  const bug = k.add([
    k.sprite("motoBug", { anim: "run" }),
    k.pos(pos),
    k.scale(2),
    k.area(),
    k.anchor("center"),
    k.offscreen(),
    "bug",
  ]);

  return bug;
};

export default motoBug;

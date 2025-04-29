import k from "../context";

const renderSonic = (pos) => {
  const sonic = k.add([
    k.sprite("sonic", { anim: "run" }),
    k.area(),
    k.body({ jumpForce: 1500 }),
    k.scale(4),
    k.anchor("center"),
    k.pos(pos),

    {
      plusUI: null,
      setControls() {
        k.onButtonPress("jump", () => {
          if (this.isGrounded()) {
           // console.log("jump");
            this.jump();
            k.play("jump", { volume: 0.7 });
            this.play("jump");
          }
        });
      },
      setEvents() {
        this.onGround(() => {
          this.play("run");
        });
      },
    },
  ]);

  sonic.plusUI = sonic.add([
    k.text(" ", { font: "mania", size: 18 }),
    k.pos(30, -10),
    k.anchor("center"),
    k.color(255, 215, 20),
  ])

  return sonic;
};

export default renderSonic;

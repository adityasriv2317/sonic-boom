import k from "../context";

const splash = () => {
    k.add([k.text("Loading... \npress 'space' or 'up'\nor click to start"), k.pos(k.width() / 2, k.height() / 2),]);

    k.onButtonPress("jump", () => {
        k.go("menu");
    });
}

export default splash;
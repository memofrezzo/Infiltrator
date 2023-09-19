import Phaser from "phaser";
import Preload from "./scenes/Preload";
import Menu from "./scenes/Menu";
import Nivel1 from "./scenes/Nivel1";
import GameOver from "./scenes/GameOver";
import Creditos from "./scenes/Creditos";
import UI from "./scenes/UI";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 800,
      height: 600,
    },
    max: {
      width: 1600,
      height: 1200,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      debug: false,
    },
  },
  scene: [Preload, Menu, Nivel1, GameOver, Creditos, UI],
};

export default new Phaser.Game(config);

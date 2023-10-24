import Phaser from "phaser";

export default class Placar extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, llaveTexture) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.llaveDisponible = true;
    this.tipoLlave = llaveTexture;

    // Crea un área de interacción para el jugador
    this.zonaInteraccion = new Phaser.Geom.Rectangle(x - 16, y - 16, 48, 48);
  }
}

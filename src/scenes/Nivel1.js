import Phaser from "phaser";



export default class Nivel1 extends Phaser.Scene {
  constructor() {
    super("Nivel1");
  }

  create() {
    // Agrega el fondo al juego
    this.add.image(0, 0, 'FondoJuego').setOrigin(0, 0);

    // Crea al personaje principal como un sprite
    this.personaje = this.physics.add.sprite(100, 100, 'cuadrado'); // 'cuadrado' es la clave de la imagen del personaje

    // Configura las colisiones con los bordes del mundo
    this.personaje.setCollideWorldBounds(true);

    // Configura las teclas de flecha para mover al personaje
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    // Mueve al personaje con las teclas de flecha
    if (this.cursors.left.isDown) {
      this.personaje.setVelocityX(-200);
    } else if (this.cursors.right.isDown) {
      this.personaje.setVelocityX(200);
    } else {
      this.personaje.setVelocityX(0);
    }

    if (this.cursors.up.isDown) {
      this.personaje.setVelocityY(-200);
    } else if (this.cursors.down.isDown) {
      this.personaje.setVelocityY(200);
    } else {
      this.personaje.setVelocityY(0);
    }
  }
}


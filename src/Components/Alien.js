import Phaser from 'phaser';

export default class Alien extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    // console.log("alien");
    super(scene, x, y, texture);

    // Agrega el alien a la escena
    scene.add.existing(this);

    // Activa la física del alien
    scene.physics.add.existing(this);

    // Configura la velocidad de movimiento
    this.velocidad = 200; // Velocidad normal
  }
  }
import Phaser from 'phaser';

export default class Creditos extends Phaser.Scene {
  constructor() {
    super({ key: 'Creditos' });
  }

  init(data)  {
  this.time = data.time
  }

  create() {
      const video2 = this.add.video(this.cameras.main.centerX, this.cameras.main.centerY, 'Creditos').setScale(0.6);
      video2.play();

      video2.on('complete', () => {
        this.scene.start('menu'); // Cambia 'Menu' al nombre de tu escena de menú
      });
    }
  }
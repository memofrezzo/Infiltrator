import Phaser from 'phaser';

export default class WinCinematica extends Phaser.Scene {
  constructor() {
    super({ key: 'winCinematica' });
  }

  create() {
    const video1 = this.add.video(this.cameras.main.centerX, this.cameras.main.centerY, 'cinematicaFinal');
    video1.play();
    //hacer un video con la música de alarmaCinemática

    video1.on('complete', () => {
      const video2 = this.add.video(this.cameras.main.centerX, this.cameras.main.centerY, 'Creditos');
      video2.play();

      video2.on('complete', () => {
        this.scene.start('win'); // Cambia 'Menu' al nombre de tu escena de menú
      });
    });
  }
}
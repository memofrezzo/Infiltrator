import Phaser from "phaser";

export default class GameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

  create() {
    // Configura el mensaje de Game Over en el centro de la pantalla
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;
    const mensajeGameOver = this.add.text(centerX, centerY, "Game Over", {
      fontFamily: 'Arial',
      fontSize: 48,
      color: '#ff0000', // Color rojo
    });
    mensajeGameOver.setOrigin(0.5);

    // Habilita la interacción del usuario haciendo clic en cualquier parte de la pantalla
    this.input.on('pointerdown', () => {
      this.scene.start('Menu'); // Cambia a la escena del menú principal
    });
  }
}

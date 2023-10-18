import Phaser from "phaser";
import { EN_US, ES_AR, PT_BR } from "../enums/languages";
import { FETCHED, FETCHING, READY, TODO } from "../enums/status";
import { getTranslations, getPhrase } from "../services/translations";
import keys from "../enums/keys";
export default class GameOver extends Phaser.Scene {
  #wasChangedLanguage = TODO;
  constructor() {
    super("GameOver");
  }

  create() {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    // Mensaje de Game Over
    const mensajeGameOver = this.add.text(centerX, centerY - 50, "Game Over", {
      fontFamily: 'Arial',
      fontSize: 48,
      color: '#ff0000', // Color rojo
    });
    mensajeGameOver.setOrigin(0.5);

    // Botón de Restart
    const botonRestart = this.add.text(centerX, centerY + 50, "Restart", {
      fontFamily: 'Arial',
      fontSize: 24,
      color: '#ffffff', // Color blanco
    });
    botonRestart.setOrigin(0.5);

    // Agranda el texto cuando el mouse se acerca al botón
    botonRestart.on('pointerover', () => {
      botonRestart.setScale(1.2); // Escala el texto al 120%
    });

    // Achica el texto cuando el mouse se aleja del botón
    botonRestart.on('pointerout', () => {
      botonRestart.setScale(1); // Restaura la escala original
    });

    botonRestart.setInteractive(); // Habilita la interacción con el botón
    botonRestart.on('pointerdown', () => {
      // Cuando se hace clic en el botón Restart, reinicia el nivel1
      this.scene.start('Nivel1');
    });

    // Botón de Volver al Menú Principal
    const botonVolverMenu = this.add.text(centerX, centerY + 100, "Volver al Menú Principal", {
      fontFamily: 'Arial',
      fontSize: 24,
      color: '#ffffff', // Color blanco
    });
    botonVolverMenu.setOrigin(0.5);

    // Agranda el texto cuando el mouse se acerca al botón
    botonVolverMenu.on('pointerover', () => {
      botonVolverMenu.setScale(1.2); // Escala el texto al 120%
    });

    // Achica el texto cuando el mouse se aleja del botón
    botonVolverMenu.on('pointerout', () => {
      botonVolverMenu.setScale(1); // Restaura la escala original
    });

    botonVolverMenu.setInteractive(); // Habilita la interacción con el botón
    botonVolverMenu.on('pointerdown', () => {
      // Cuando se hace clic en el botón de volver al menú principal, cambia a la escena del menú
      this.scene.start('Menu');
    });
  }
}

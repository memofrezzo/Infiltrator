import Phaser from "phaser";

export default class Menu extends Phaser.Scene {
  constructor() {
    super("Menu");
  }

  create() {
    // Fondo del menú
    const fondoMenu = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'fondoMenu');
    fondoMenu.setScale(this.cameras.main.width / fondoMenu.width, this.cameras.main.height / fondoMenu.height);
    // Logo Principal
       // Configura un evento para volver al menú al hacer clic en cualquier parte de la pantalla
        this.input.on('pointerdown', () => {
          this.scene.start("Nivel1"); // Cambia "Menu" por el nombre de tu escena de menú
        });    
    const selectOptionSound = this.sound.add('selectOption');
    const logo = this.add.image(this.cameras.main.centerX -180, this.cameras.main.centerY + 60 , 'Alien2').setScale(0.3).setOrigin(0.5);
    logo.setInteractive();
    
    logo.on('pointerover', () => {
      selectOptionSound.play();
      logo.setScale(0.37);
    });
    
    logo.on('pointerout', () => {
      logo.setScale(0.3);
    });

    logo.on('pointerup', () => {
      this.game.scale.startFullscreen();
      this.scene.start('Nivel1'); 
    });
  }
}

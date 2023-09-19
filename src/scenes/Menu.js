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
    const logo = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY - 150, 'Logo').setOrigin(0.5);
    logo.setInteractive();
    
    logo.on('pointerover', () => {
      selectOptionSound.play();
      logo.setScale(1.1);
    });
    
    logo.on('pointerout', () => {
      logo.setScale(1);
    });

    logo.on('pointerup', () => {
      this.game.scale.startFullscreen();
      this.scene.start('Nivel1'); 
    });

    // controles
    this.add.image(this.cameras.main.centerX, this.cameras.main.centerY + 260, 'Controls').setOrigin(0.5).setScale(0.65);

    // Icono de GitHub
    const Github = this.add.image(this.cameras.main.centerX -400, this.cameras.main.centerY + 250, 'Github').setOrigin(0.5);
    Github.setInteractive();
    Github.on('pointerover', () => {
      Github.setScale(1.2);
      selectOptionSound.play();
    });

    Github.on('pointerout', () => {
      Github.setScale(1);
    });

    Github.on('pointerup', () => {
      window.open('https://memofrezzo.github.io/Portfolio-2023-Alain/', '_blank');
    });
    
    // Donaciones
    const Donaciones = this.add.image(this.cameras.main.centerX +400, this.cameras.main.centerY + 250, 'Donaciones').setOrigin(0.5);
    Donaciones.setInteractive();
    Donaciones.on('pointerover', () => {
      selectOptionSound.play();
      Donaciones.setScale(1.2);
    });

    Donaciones.on('pointerout', () => {
      Donaciones.setScale(1);
    });

    Donaciones.on('pointerup', () => {
      window.open('https://memofrezzo.github.io/Donations/', '_blank');
    });    
  }
}

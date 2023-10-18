import Phaser from "phaser";

export default class Preload extends Phaser.Scene {
  // escena para optimiozar tiempos
  // carga el preload solo una vez y sirve para todo el juego
  constructor() {
    super("Preload");
  }

  preload() {
    // load assets
    // video
    // rest of immages
    this.load.image("Alien", "./assets/Images/Alien.png");
    this.load.image("Alien2", "./assets/Images/Alien2.png");
    this.load.image("fondoMenu", "./assets/Images/fondoMenu.jpeg");
    this.load.image("Logo", "./assets/Images/Logo.jpeg");
    this.load.image("Github", "./assets/Images/Github.png");
    this.load.image("FondoJuego", "./assets/Images/FondoJuego.png");
    //this.load.image("ControlsInfiltrator", "./assets/Images/Controls.png");
    this.load.image("Donaciones", "./assets/Images/Donaciones.png");
    this.load.image("Argentina", "./assets/Images/Argentina.jpeg");
    this.load.image("Brazil", "./assets/Images/Brazil.jpeg");
    this.load.image("EEUU", "./assets/Images/EEUU.jpeg");
    this.load.tilemapTiledJSON("mapa", "./assets/Tiled/pruebe.json");
      this.load.image("tilesPlataforma", "./assets/Images/Plataforma.png");
      this.load.image("tilesFondo", "./assets/Images/Fondo.png");
      this.load.image("PersonajePrincipal", "./assets/Images/boceto pj.png");
    // Audio
    this.load.audio("selectOption", "./assets/Audio/selectOption.mp3");
    // video
    this.load.video("Creditos", "./assets/Images/Creditos.mp4" );
  }

  create() {
     this.scene.start("Menu");
  }
}

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
    this.load.image("PersonajePrincipal", "./assets/Images/PersonajePrincipal.png");
    this.load.tilemapTiledJSON("mapa", "./assets/tilemap/tutorial.json");
    this.load.image("tilesPlataforma", "./assets/images/mapa1.png");
    this.load.image("tilesFondo", "./assets/images/mapa2.png");

    this.load.image("Alien", "./assets/Images/Alien.png");
    this.load.image("Alien2", "./assets/Images/Alien2.png");
    this.load.image("fondoMenu", "./assets/Images/fondoMenu.jpeg");
    this.load.image("Logo", "./assets/Images/Logo.jpeg");
    this.load.image("Github", "./assets/Images/Github.png");
    this.load.image("FondoJuego", "./assets/Images/FondoJuego.png");
    this.load.image("puertaAbierta", "./assets/Images/puertaAbierta.png");
    this.load.image("puertaCerrada", "./assets/Images/puertaCerrada.png");
    this.load.image("mueble", "./assets/Images/mueble.png");
    this.load.image("armario", "./assets/Images/armario.png");
    this.load.image("salida", "./assets/Images/salida.png");
    //this.load.image("ControlsInfiltrator", "./assets/Images/Controls.png");
    this.load.image("Donaciones", "./assets/Images/Donaciones.png");
    this.load.image("Argentina", "./assets/Images/Argentina.png");
    this.load.image("EEUU", "./assets/Images/EEUU.png");
    this.load.tilemapTiledJSON("mapa", "./assets/Tiled/tutorial.json");
      this.load.image("tilesPlataforma", "./assets/Images/mapa1.png");
      this.load.image("tilesFondo", "./assets/Images/mapa2.png");
      this.load.image("PersonajePrincipal", "./assets/Images/boceto pj.png");
    // Audio
    this.load.audio("selectOption", "./assets/Audio/selectOption.mp3");
    this.load.audio("alarma", "./assets/Audio/alarma.mp3");
    this.load.audio("grito", "./assets/Audio/grito.mp3");
    this.load.audio("sonidoDeFondo", "./assets/Audio/sonidoDeFondo.mp3");
    this.load.audio("sonidoDeFondo2", "./assets/Audio/sonidoDeFondo2.mp3");

    // video
    this.load.video("Creditos", "./assets/Images/Creditos.mp4" );
  }

  create() {
     this.scene.start("login");
  }
}

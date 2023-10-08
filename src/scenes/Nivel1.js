import Phaser from "phaser";
import Jugador from "../Components/Jugador";
import Alien from "../Components/Alien";

export default class Nivel1 extends Phaser.Scene {
  constructor() {
    super("Nivel1");
  }

  create() {
    // Agrega el fondo al juego
    this.add.image(0, 0, 'FondoJuego').setOrigin(0, 0);
  
    // Crea al personaje principal como un sprite utilizando la imagen 'PersonajePrincipal'
      // Crea al personaje principal como un sprite utilizando la imagen 'PersonajePrincipal'
      this.jugador = new Jugador(this, 400, 200, 'PersonajePrincipal').setScale(0.1);  
      this.add.existing(this.jugador);
      this.alien = new Alien(this, 400, 300, 'Alien').setScale(0.03);
      this.add.existing(this.alien);
  // Obtiene las dimensiones originales del sprite

  // Define las nuevas dimensiones de la hitbox (la mitad del tamaño original

  // Ajusta la hitbox del personaje principal
      this.jugador.setSize(300,400);
  
    // Crea la figura geométrica que causará Game Over como un sprite utilizando la imagen 'Alien'
  
    // Configura las colisiones con la figura geométrica
    this.physics.add.collider(this.jugador, this.alien, this.colisionConAlien, null, this);
  
    // Configura las teclas de flecha para mover al personaje
    this.cursors = this.input.keyboard.createCursorKeys();
  
    // Configura la cámara para seguir al personaje
    this.cameras.main.startFollow(this.jugador);
  
    // Aumenta el zoom al 300%
    this.cameras.main.setZoom(3); // 3 veces el tamaño original
  }

  update() {
    // Mueve al personaje con las teclas de flecha
    this.jugador.actualizar();

    // Actualiza el alien
   // this.alien.actualizar();
  }

  colisionConAlien() {
    // Cambiar a la escena de Game Over
    this.scene.start('GameOver');
  }
}

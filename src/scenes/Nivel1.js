import Phaser from "phaser";
import Jugador from "../Components/Jugador";
import Alien from "../Components/Alien";

export default class Nivel1 extends Phaser.Scene {
  constructor() {
    super("Nivel1");
  }

  create() {
    const mapa = this.make.tilemap({ key: "mapa" });
      const capaFondo = mapa.addTilesetImage("mapa2", "tilesFondo");
      const capaPlataform = mapa.addTilesetImage("mapa1", "tilesPlataforma");
  
      const FondoLayer = mapa.createLayer("background", capaFondo, 0, 0);
      const PlataformaLayer = mapa.createLayer("platform", capaPlataform, 0, 0);
      PlataformaLayer.setCollisionByProperty({ collision: true });
  
    // Crea al personaje principal como un sprite utilizando la imagen 'PersonajePrincipal'
      // Crea al personaje principal como un sprite utilizando la imagen 'PersonajePrincipal'
      this.jugador = new Jugador(this,144, 176, 'PersonajePrincipal').setScale(0.1);  
      this.add.existing(this.jugador);
      this.alien = new Alien(this, 1324, 902, 'Alien').setScale(1);
      this.add.existing(this.alien);
      //Timer
      this.tiempoInicial = 1000;
    this.tiempoRestante = this.tiempoInicial;

    // Crea un texto en pantalla para mostrar el tiempo restante
    this.textoTiempo = this.add.text(16, 16, `Tiempo: ${this.tiempoRestante}`, {
      fontSize: "13px",
      color: "#ffffff",
    });
  // Define las nuevas dimensiones de la hitbox (la mitad del tamaño original

  // Ajusta la hitbox del personaje principal
      this.jugador.setSize(300,400);
  
    // Crea la figura geométrica que causará Game Over como un sprite utilizando la imagen 'Alien'
  
    // Configura las colisiones con la figura geométrica
    this.physics.add.collider(this.jugador, this.alien, this.colisionConAlien, null, this);
    this.physics.add.collider(this.jugador, PlataformaLayer);
    //this.physics.add.collider(this.alien, PlataformaLayer);
    this.physics.add.collider(
      this.jugador,
      this.alien,
      null
    );
  
    // Configura las teclas de flecha para mover al personaje
    this.cursors = this.input.keyboard.createCursorKeys();
  
    // Configura la cámara para seguir al personaje
    this.cameras.main.startFollow(this.jugador);
  
    // Aumenta el zoom al 300%
    this.cameras.main.setZoom(2.5); // 3 veces el tamaño original
  }

  update() {
    if (this.tiempoRestante > 0) {
      this.tiempoRestante -= 1;
      this.textoTiempo.setText(`Tiempo: ${this.tiempoRestante}`);
    }

    // Si el tiempo llega a 0, cambia a la escena 'GameOver'
    if (this.tiempoRestante === 0) {
      this.scene.start("GameOver");
    }
    // Mueve al personaje con las teclas de flecha
    this.jugador.actualizar();
    this.textoTiempo.x = this.jugador.x - this.cameras.main.width / 5 + 10;
    this.textoTiempo.y = this.jugador.y - this.cameras.main.height / 5 + 10;
    // Actualiza el alien
    this.alien.actualizar();
  }

  colisionConAlien() {
    // Cambiar a la escena de Game Over
    this.scene.start('GameOver');
  }
}

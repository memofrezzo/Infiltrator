import Phaser from "phaser";
import Jugador from "../Components/Jugador";
import Alien from "../Components/Alien";
import { EN_US, ES_AR } from "../enums/languages";
import { FETCHED, FETCHING, READY, TODO } from "../enums/status";
import { getTranslations, getPhrase } from "../services/translations";
import keys from "../enums/keys";

export default class Nivel1 extends Phaser.Scene {
  #wasChangedLanguage = TODO;
  constructor() {
    super("Nivel1");
    const { Tiempo } = keys.Nivel1;
    this.tiempo = Tiempo;
  }

  create() {
    this.timer;
    this.countdown = 120;
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
    // Crea un texto en pantalla para mostrar el tiempo restante
    this.textoTiempo = this.add.text(250, 190, getPhrase(this.tiempo), {
      fontSize: "13px",
      color: "#ffffff",
    });
    this.textoTiempo.setScrollFactor(0);
    this.tiempoInicial = this.add.text(380, 190, this.countdown.toString(), {
      fontSize: "13px",
      color: "#ffffff",
    });
    this.tiempoInicial.setScrollFactor(0);
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

    this.timer = this.time.addEvent({
      delay: 1000, // 1000 milisegundos (1 segundo)
      callback: this.updateTime,
      callbackScope: this,
      loop: true
  });
    
  }

  updateTime() {
    this.countdown--;

    // Actualiza el texto en pantalla para mostrar el tiempo restante.
    this.tiempoInicial.setText(""+ this.countdown);

    // Comprueba si el contador ha llegado a 0.
    if (this.countdown === 0) {
        // Realiza alguna acción cuando el contador llega a 0, por ejemplo, detener el temporizador o realizar otra tarea.
      this.scene.start ("GameOver");        // Otra acción que quieras realizar cuando el contador llega a 0.
    }
}

  update() {
    if (this.#wasChangedLanguage === FETCHED) {
      this.#wasChangedLanguage = READY;
      this.textoTiempo.setText(getPhrase(this.tiempo));
    }
    // Mueve al personaje con las teclas de flecha
    this.jugador.actualizar();
    // Actualiza el alien
    this.alien.actualizar();
  }

  updateWasChangedLanguage = () => {
    this.#wasChangedLanguage = FETCHED;
  };

  async getTranslations(language) {
    this.language = language;
    this.#wasChangedLanguage = FETCHING;
    await getTranslations(language, this.updateWasChangedLanguage);
  }
  
  colisionConAlien() {
    // Cambiar a la escena de Game Over
    this.scene.start('GameOver');
  }
}

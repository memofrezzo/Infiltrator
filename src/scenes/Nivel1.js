import Phaser from "phaser";
import Jugador from "../Components/Jugador";
import Alien from "../Components/Alien";
import Placar from "../Components/Placar";
import Puerta from "../Components/Puerta";
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
      this.placares = this.physics.add.group();

    // Placares
    this.placar1 = new Placar(this, 100, 200, "placar1", "llave1");   
    this.placar2 = new Placar(this, 150, 250, "placar2", "llave2");
    this.placar3 = new Placar(this, 200, 300, "placar3", "llave3");
    this.add.existing(this.placar1)
    this.add.existing(this.placar2)
    this.add.existing(this.placar3);
    //Puertas
    this.puerta1 = new Puerta(this, 544, 346, "puertaCerrada", "puertaAbierta");
    this.puerta2 = new Puerta(this, 226, 798, "puertaCerrada", "puertaAbierta");
    this.add.existing(this.puerta1);
    this.add.existing(this.puerta2);    
    this.jugador = new Jugador(this,144, 176, 'PersonajePrincipal').setScale(0.1);  
    this.add.existing(this.jugador);
    this.alien = new Alien(this, 1324, 902, 'Alien').setScale(1);
    this.add.existing(this.alien);
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
    this.physics.add.collider(this.jugador, this.placar1, this.interactuarPlacar1, null);
    this.physics.add.collider(this.jugador, this.placar2, this.interactuarPlacar2, null);
    this.physics.add.collider(this.jugador, this.placar3, this.interactuarPlacar3, null);
    this.physics.add.collider(this.jugador, this.puerta1, this.interactuarPuerta1, null);
    this.physics.add.collider(this.jugador, this.puerta2, this.interactuarPuerta2, null);
    this.physics.add.collider(this.jugador, this.alien, this.colisionConAlien, null, this);
    this.physics.add.collider(this.jugador, PlataformaLayer); 
  
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
     this.input.keyboard.on("keydown-E", (event) => {
      if (event.repeat) return; // Evita el procesamiento repetido de la tecla
      this.jugador.isEPressed = true;
  });

  this.input.keyboard.on("keyup-E", () => {
      this.jugador.isEPressed = false;
  });
  }

  interactuarPlacar1(jugador, placar1) {
    if (placar1.llaveDisponible && jugador.isEPressed) {
      jugador.recogerLlave(); // El jugador recoge una llave
      placar1.llaveDisponible = false; // Ya no hay una llave disponible en este placar
      console.log("llave1");
    }
  }
  interactuarPlacar2(jugador, placar2) {
    if (placar2.llaveDisponible && jugador.isEPressed) {
      jugador.recogerLlave(); // El jugador recoge una llave
      placar2.llaveDisponible = false; 
      console.log("llave2");// Ya no hay una llave disponible en este placar
    }
  }
  interactuarPlacar3(jugador, placar3) {
    if (placar3.llaveDisponible && jugador.isEPressed) {
      jugador.recogerLlave(); placar3.llaveDisponible = false; console.log("llave3");
    }
    }

  interactuarPuerta1(jugador, puerta1) {
                if (jugador.llaves > 0 && puerta1.estado === "cerrada") {
                    puerta1.abrir();
                    jugador.llaves--; 
                    console.log(puerta1)
                    puerta1.body.checkCollision.none = true// Re
                }
            }

  interactuarPuerta2(jugador, puerta2) {
                if (jugador.llaves > 0 && puerta2.estado === "cerrada") {
                    puerta2.abrir();
                    jugador.llaves--; 
                    console.log(puerta2.estado)
                    puerta2.body.checkCollision.none = true// Reduce la cantidad de llaves del jugador
                }
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

    if (this.puerta1.estado === 'abierta') {
      // Puerta abierta, usar overlap
  }
  if (this.puerta2.estado === 'abierta') {
    // Puerta abierta, usar overlap
    this.puerta2.body.checkCollision.none = true// Reduce la cantidad de llaves del jugador
}
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

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
      this.sonidoDeFondo2 = this.sound.add('sonidoDeFondo2');
      this.sonidoDeFondo2.play({ loop: true });
  
      const FondoLayer = mapa.createLayer("background", capaFondo, 0, 0);
      const PlataformaLayer = mapa.createLayer("platform", capaPlataform, 0, 0);
      PlataformaLayer.setCollisionByProperty({ collision: true });
  
    // Crea al personaje principal como un sprite utilizando la imagen 'PersonajePrincipal'
      // Crea al personaje principal como un sprite utilizando la imagen 'PersonajePrincipal'
      this.placares = this.physics.add.group();


    // Placares
    this.placar1 = new Placar(this, 240, 258, "mueble"); 
    this.placar2 = new Placar(this, 779, 258, "armario") .setScale(0.8);   
    this.placar3 = new Placar(this, 57, 710, "armario") .setScale(0.8); 
    this.placar4 = new Placar(this, 475, 705, "mueble"); 
    this.placar5 = new Placar(this, 1230, 705, "armario") .setScale(0.8); 
    this.add.existing(this.placar1);
    this.add.existing(this.placar2);
    this.add.existing(this.placar3);
    this.add.existing(this.placar4);
    this.add.existing(this.placar5);
    //Puertas
    this.puerta1 = new Puerta(this, 544, 333, "puertaCerrada", "puertaAbierta");
    this.puerta2 = new Puerta(this, 224, 787, "puertaCerrada", "puertaAbierta");
    this.puerta3 = new Puerta(this, 548, 491, "puertaCerrada", "puertaAbierta");
    this.puerta4 = new Puerta(this, 1157, 787, "puertaCerrada", "puertaAbierta");
    this.puertaFinal = new Puerta(this, 1234, 332, "puertaCerrada", "puertaAbierta");
    this.add.existing(this.puerta1);
    this.add.existing(this.puerta2); 
    this.add.existing(this.puerta3);
    this.add.existing(this.puerta4);    
    this.jugador = new Jugador(this, 144, 176, 'PersonajePrincipal').setScale(0.1);  
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
  this.salidaGroup = this.physics.add.group();

// Luego, crea el sprite de salida y agrégalo al grupo.
this.salida = this.salidaGroup.create(1210, 104, "salida").setScale(0.4).setDepth(2);
this.add.existing(this.salida);
      
  
    // Crea la figura geométrica que causará Game Over como un sprite utilizando la imagen 'Alien'
  
    // Configura las colisiones con la figura geométrica
    this.physics.add.collider(this.jugador, this.placar1, this.interactuarPlacar1, null);
    this.physics.add.collider(this.jugador, this.placar2, this.interactuarPlacar2, null);
    this.physics.add.collider(this.jugador, this.placar3, this.interactuarPlacar3, null);
    this.physics.add.collider(this.jugador, this.placar4, this.interactuarPlacar4, null);
    this.physics.add.collider(this.jugador, this.placar5, this.interactuarPlacar5, null);
    this.physics.add.collider(this.jugador, this.puerta1, this.interactuarPuerta1, null);
    this.physics.add.collider(this.jugador, this.puerta2, this.interactuarPuerta2, null);
    this.physics.add.collider(this.jugador, this.puerta3, this.interactuarPuerta3, null);
    this.physics.add.collider(this.jugador, this.puerta4, this.interactuarPuerta4, null);
    this.physics.add.collider(this.jugador, this.puertaFinal, this.interactuarPuertaFinal, null);
    this.physics.add.collider(this.jugador, this.alien, this.colisionConAlien, null, this);
    this.physics.add.collider(this.jugador, this.salida, this.colisionSalida, null, this);
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
      jugador.recogerLlave(); // El jugador recoge una llave
      placar3.llaveDisponible = false; 
      console.log("llave2");// Ya no hay una llave disponible en este placar
    }
  }
  interactuarPlacar4(jugador, placar4) {
    if (placar4.llaveDisponible && jugador.isEPressed) {
      jugador.recogerLlave(); // El jugador recoge una llave
      placar4.llaveDisponible = false; 
      console.log("llave2");// Ya no hay una llave disponible en este placar
    }
  }
  interactuarPlacar5(jugador, placar5) {
    if (placar5.llaveDisponible && jugador.isEPressed) {
      jugador.recogerLlave(); // El jugador recoge una llave
      placar5.llaveDisponible = false; 
      console.log("llave2");// Ya no hay una llave disponible en este placar
    }
  }

  interactuarPuerta1(jugador, puerta1) {
    if (jugador.llaves > 0 && puerta1.estado === "cerrada") {
      puerta1.abrir();
      jugador.llaves--; 
      puerta1.body.checkCollision.none = true
    }
  }

  interactuarPuerta2(jugador, puerta2) {
                if (jugador.llaves > 0 && puerta2.estado === "cerrada") {
                    puerta2.abrir();
                    jugador.llaves--; 
                    puerta2.body.checkCollision.none = true// Reduce la cantidad de llaves del jugador
                }
            }
  interactuarPuerta3(jugador, puerta3) {
                if (jugador.llaves > 0 && puerta3.estado === "cerrada") {
                    puerta3.abrir();
                    jugador.llaves--; 
                    puerta3.body.checkCollision.none = true// Reduce la cantidad de llaves del jugador
                }
            }
  interactuarPuerta4(jugador, puerta4) {
                if (jugador.llaves > 0 && puerta4.estado === "cerrada") {
                    puerta4.abrir();
                    jugador.llaves--; 
                    puerta4.body.checkCollision.none = true// Reduce la cantidad de llaves del jugador
                }
            }
  interactuarPuertaFinal(jugador, puertaFinal) {
                if (jugador.llavesAgarradas === 5) {
                    puertaFinal.abrir(); 
                    puertaFinal.body.checkCollision.none = true
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
    const distancia = Phaser.Math.Distance.Between(this.jugador.x, this.jugador.y, this.alien.x, this.alien.y);

  // Ajusta el volumen del sonido del alien según la distancia
  const distanciaMaxima = 600; // Puedes ajustar esta distancia máxima según tus necesidades
  const volumenMaximo = 100;
  const volumen = Phaser.Math.Clamp(1 - distancia / distanciaMaxima, 0, 1) * volumenMaximo + 10;

  this.sonidoDeFondo2.setVolume(0.01 * volumen);
  console.log(volumen);
  }

  updateWasChangedLanguage = () => {
    this.#wasChangedLanguage = FETCHED;
  };

  async getTranslations(language) {
    this.language = language;
    this.#wasChangedLanguage = FETCHING;
    await getTranslations(language, this.updateWasChangedLanguage);
  }
  
  colisionSalida(jugador, salida) {
    // Llamar a la escena de Win cuando el jugador toque la salida
    this.scene.start('win');
  }
  colisionConAlien() {
    // Cambiar a la escena de Game Over
    this.scene.start('GameOver');
  }
}

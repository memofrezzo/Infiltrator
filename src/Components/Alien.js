import Phaser from 'phaser';

export default class Alien extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    // Agrega el alien a la escena
    scene.add.existing(this);

    // Activa la física del alien
    scene.physics.add.existing(this);

    // Configura la velocidad de movimiento
    this.velocidad = 200; // Velocidad normal

    // Número total de patrones de movimiento disponibles
    this.NumeroDePatrones = 1;

    // Elige un patrón de movimiento aleatorio al crear el Alien
    this.elegirPatronAleatorio();

    // Array de coordenadas
    this.coordenadas = [
      { x: 342, y: 918 }, // Punto A
      { x: 342, y: 90 }, // Punto B
      { x: 886, y: 90 }, // Punto C
      { x: 886, y: 430 }, // Punto D
      { x: 1340, y: 430 }, // Punto E
    ];

    // Índice actual en el array de coordenadas
    this.indiceCoordenadaActual = 0;

    // Dirección de movimiento (1 para avanzar, -1 para retroceder)
    this.direccionMovimiento = 1;

    // Temporizador para cambiar de coordenada

    // Variable para rastrear si el Alien ha completado un patrón
    this.completoPatron = false;
  }

  elegirPatronAleatorio() {
    // Genera un número aleatorio entre 1 y el número total de patrones disponibles
    this.patronActual = Phaser.Math.Between(1, this.NumeroDePatrones);
    console.log(this.patronActual);
  }

  actualizar() {
    // Movimiento del alien basado en el patrón actual
    this.moverSegunPatron();
  }

  /* cambiarCoordenada() {
    // Detiene el temporizador si está en ejecución
  
    // Cambia a la siguiente coordenada en la dirección actual
    this.indiceCoordenadaActual += this.direccionMovimiento;
  
    // Si llega al final, cambia la dirección
    if (
      this.indiceCoordenadaActual >= this.coordenadas.length ||
      this.indiceCoordenadaActual < 0
    ) {
      this.direccionMovimiento *= -1;
  
      // Marca que ha completado un patrón
      this.completoPatron = true;
    }
  
    // Si ha completado un patrón, elige un nuevo patrón aleatorio
    if (this.completoPatron) {
      this.elegirPatronAleatorio();
      this.completoPatron = false;
    }
  } */
  

  moverSegunPatron() {
    // Implementa los movimientos para cada patrón aquí
    switch (this.patronActual) {
      case 1:
        this.moverPatron1();
        break;
      // Agrega más casos para otros patrones de movimiento si es necesario
    }
  } 

  moverPatron1() {
    // Coordenadas para el patrón 1
    const coordenadasPatron1 = [
      { x: 342, y: 918 }, // Punto 1
      { x: 342, y: 90 },  // Punto 2
      { x: 886, y: 90 },  // Punto 3
      { x: 886, y: 415 }, // Punto 4
      { x: 1340, y: 415 },  // Punto 5
      { x: 1340, y: 908 },  // Punto inicio
      { x: 342, y: 918 }, // Punto 1
      { x: 342, y: 436 },  // Punto 7
      { x: 1340, y: 415 },  // Punto 5 
      { x: 886, y: 415 }, // Punto 4
      { x: 886, y: 90 },  // Punto 3
      { x: 342, y: 90 },  // Punto 2
      { x: 342, y: 918 }, // Punto 1
      { x: 1340, y: 908 },  // Punto inicio
      { x: 342, y: 918 }, // Punto 1
      { x: 342, y: 90 },  // Punto 2
      { x: 886, y: 90 },  // Punto 3
      { x: 886, y: 415 }, // Punto 4
      { x: 1340, y: 415 },  // Punto 5
      { x: 1340, y: 908 },  // Punto inicio
      { x: 342, y: 918 }, // Punto 1
      { x: 342, y: 436 },  // Punto 7
      { x: 1340, y: 415 },  // Punto 5 
      { x: 886, y: 415 }, // Punto 4
      { x: 886, y: 90 },  // Punto 3
      { x: 342, y: 90 },  // Punto 2
      { x: 342, y: 918 }, // Punto 1
      { x: 1340, y: 908 },  // Punto inicio
      { x: 342, y: 918 }, // Punto 1
      { x: 342, y: 90 },  // Punto 2
      { x: 886, y: 90 },  // Punto 3
      { x: 886, y: 415 }, // Punto 4
      { x: 1340, y: 415 },  // Punto 5
      { x: 1340, y: 908 },  // Punto inicio
      { x: 342, y: 918 }, // Punto 1
      { x: 342, y: 436 },  // Punto 7
      { x: 1340, y: 415 },  // Punto 5 
      { x: 886, y: 415 }, // Punto 4
      { x: 886, y: 90 },  // Punto 3
      { x: 342, y: 90 },  // Punto 2
      { x: 342, y: 918 }, // Punto 1
      { x: 1340, y: 908 },  // Punto inicio
    ];
  
    // Obtiene la coordenada actual
    const coordenadaActual = coordenadasPatron1[this.indiceCoordenadaActual];
  
    // Calcula la dirección hacia la coordenada actual
    const direccionX = coordenadaActual.x - this.x;
    const direccionY = coordenadaActual.y - this.y;
  
    // Calcula la distancia al punto actual
    const distancia = Phaser.Math.Distance.Between(
      this.x,
      this.y,
      coordenadaActual.x,
      coordenadaActual.y
    );
  
    // Normaliza la dirección
    const velocidadX = (direccionX / distancia) * this.velocidad;
    const velocidadY = (direccionY / distancia) * this.velocidad;
  
    // Mueve al Alien hacia la coordenada actual
    this.setVelocity(velocidadX, velocidadY);
  
    // Verifica si el Alien ha llegado a la coordenada actual
    if (distancia < 5) {
      // Cambia a la siguiente coordenada en la dirección actual
      this.indiceCoordenadaActual++;
    }
  }
  

  /* moverPatron2() {
    // Coordenadas para el patrón 2
    const coordenadasPatron2 = [
      { x: 0, y: 200 }, // Punto A
      { x: 400, y: 100 }, // Punto C
      { x: 0, y: 250 }, // Punto D
      // Agrega más puntos según el patrón 2
    ];

    // Si el Alien ya ha llegado a la última coordenada del patrón, reinicia al primer punto
    if (this.indiceCoordenadaActual >= coordenadasPatron2.length) {
      this.indiceCoordenadaActual = 0;
    }

    // Obtiene la coordenada actual
    const coordenadaActual = coordenadasPatron2[this.indiceCoordenadaActual];

    // Calcula la dirección hacia la coordenada actual
    const direccionX = coordenadaActual.x - this.x;
    const direccionY = coordenadaActual.y - this.y;

    // Calcula la distancia al punto actual
    const distancia = Phaser.Math.Distance.Between(
      this.x,
      this.y,
      coordenadaActual.x,
      coordenadaActual.y
    );

    // Normaliza la dirección
    const velocidadX = (direccionX / distancia) * this.velocidad;
    const velocidadY = (direccionY / distancia) * this.velocidad;

    // Mueve al Alien hacia la coordenada actual
    this.setVelocity(velocidadX, velocidadY);

    // Verifica si el Alien ha llegado a la coordenada actual
    if (distancia < 5) {
      // Cambia a la siguiente coordenada en la dirección actual
      this.indiceCoordenadaActual++;
    }
  }  */
}
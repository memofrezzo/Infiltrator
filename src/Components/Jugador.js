import Phaser from "phaser";

export default class Jugador extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        // console.log("Jugador");
        // Agrega el jugador a la escena
        scene.add.existing(this);
        // Activa la física del jugador
        scene.physics.add.existing(this);
  
        // Configura la velocidad de movimiento
        this.velocidad = 200; // Velocidad normal
        this.isRunning = false;
        this.isCrouching = false;
        this.llaves = 0;
        this.placarCercano = null;
        this.isEPressed = false; 
        this.llavesAgarradas=0
    }

    recogerLlave() {
        // Incrementa la cantidad de llaves en 1
        this.llaves++;
        this.llavesAgarradas++;
      }
    
      // Lógica para abrir la puerta final cuando se tienen 4 llaves
      abrirPuertaFinal() {
        if (this.llaves >= 4) {
          // Realiza acciones para abrir la puerta final
        }
      }
      actualizar() {
        // Movimiento del jugador
        let velocidadActual = this.velocidad;
  
        // Verifica si se presiona SHIFT para correr (código numérico 16)
        const teclas = this.scene.input.keyboard.createCursorKeys();
  
        
  // CORRER
      if (teclas.shift.isDown) {
        // Verificación del tiempo suficiente desde el último disparo
        velocidadActual *= 1.5;
        this.isRunning = true;
        }        
        else {
        this.isRunning = false;
        }

    // AGACHARSE
        if (teclas.space.isDown) {
            // Verificación del tiempo suficiente desde el último disparo
            velocidadActual *= 0.5;
                this.isCrouching = true;
            }        
            else {
                this.isCrouching = false;
            }
  
        // Aplica el movimiento
        if (this.scene.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.LEFT].isDown) {
            this.setVelocityX(-velocidadActual);
        } else if (this.scene.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.RIGHT].isDown) {
            this.setVelocityX(velocidadActual);
        } else {
            this.setVelocityX(0);
        }
  
        if (this.scene.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.UP].isDown) {
            this.setVelocityY(-velocidadActual);
        } else if (this.scene.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.DOWN].isDown) {
            this.setVelocityY(velocidadActual);
        } else {
            this.setVelocityY(0);
        }
        if (this.scene.input.keyboard.checkDown(this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E))) {
            this.isEPressed = true;
        } else {
            this.isEPressed = false;
        }
    }
}

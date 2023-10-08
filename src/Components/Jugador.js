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
    }
}
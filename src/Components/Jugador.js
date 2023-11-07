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
        this.puedeMoverse = true;  //
    }

    recogerLlave() {
        // Incrementa la cantidad de llaves en 1
        this.llaves++;
        this.llavesAgarradas++;
      
        // Crea un video como un sprite temporal
        this.videoLlaveSprite = this.scene.add.video(520, 210, 'agarrarLlave');
        this.videoLlaveSprite.setScrollFactor(0);
        // Reproduce el video
        this.videoLlaveSprite.play();
      
        // Define una duración para mostrar el video (en milisegundos)
        const duracionVideo = 1500; // 1 segundo en este ejemplo
      
        // Detén el video después de la duración especificada
        this.scene.time.delayedCall(duracionVideo, () => {
          this.videoLlaveSprite.stop();
          this.videoLlaveSprite.destroy();
        });
      }
    
      // Lógica para abrir la puerta final cuando se tienen 4 llaves
      abrirPuertaFinal() {     
        // Crea un video como un sprite temporal
        this.videoLuz = this.scene.add.video(400, 250, 'videoLuz');
        this.videoLuz.setScrollFactor(0);
        // Reproduce el video
        this.videoLuz.play();
        this.videoLuz.setLoop(true);
        // Define una duración para mostrar el video (en milisegundos)
        const duracionVideo = 1500; // 1 segundo en este ejemplo
      
        // Detén el video después de la duración especificada
        this.scene.time.delayedCall(duracionVideo, () => {
          this.videoLuz.stop();
          this.videoLuz.destroy();
        });
      }
      actualizar() {
        // Movimiento del jugador
        let velocidadActual = this.velocidad;
  
        // Verifica si se presiona SHIFT para correr (código numérico 16)
        const teclas = this.scene.input.keyboard.createCursorKeys();
  
        
  // CORRER
      if (teclas.shift.isDown && this.puedeMoverse === true) {
        // Verificación del tiempo suficiente desde el último disparo
        velocidadActual *= 1.5;
        this.isRunning = true;
        }        
        else {
        this.isRunning = false;
        }

    // AGACHARSE
        if (teclas.space.isDown && this.puedeMoverse === true) {
            // Verificación del tiempo suficiente desde el último disparo
            velocidadActual *= 0.5;
                this.isCrouching = true;
            }        
            else {
                this.isCrouching = false;
            }
  
        // Aplica el movimiento
        if (this.scene.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.LEFT].isDown && this.puedeMoverse === true) {
            this.setVelocityX(-velocidadActual);
        } else if (this.scene.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.RIGHT].isDown && this.puedeMoverse === true) {
            this.setVelocityX(velocidadActual);
        } else {
            this.setVelocityX(0);
        }
  
        if (this.scene.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.UP].isDown && this.puedeMoverse === true) {
            this.setVelocityY(-velocidadActual);
        } else if (this.scene.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.DOWN].isDown && this.puedeMoverse === true) {
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

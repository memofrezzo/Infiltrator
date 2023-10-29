import Phaser from "phaser";

export default class Puerta extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, keyCerrada, keyAbierta) {
        super(scene, x, y, keyCerrada); // Inicialmente, la puerta está cerrada
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.estado = 'cerrada'; // Inicialmente, la puerta está cerrada
        this.keyCerrada = keyCerrada;
        this.keyAbierta = keyAbierta;
    }

    abrir() {
        if (this.estado === 'cerrada') {
            this.estado = 'abierta';
            this.setTexture(this.keyAbierta);
        }
    }
}
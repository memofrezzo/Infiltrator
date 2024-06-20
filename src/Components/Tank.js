import Phaser from "phaser";

export default class Tank extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, nombre, health, speed, fireRange, damage) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.nombre = nombre;
        this.health = health;
        this.speed = speed;
        this.fireRange = fireRange;
        this.damage = damage;
        this.lastShotTime = 0;
        // Crear un grupo de disparos
        this.bullets = this.scene.physics.add.group();
        // Añadir a la escena y habilitar física
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
    }

    moveTo(target) {
        const angle = Phaser.Math.Angle.Between(this.x, this.y, target.x, target.y);
        this.scene.physics.moveToObject(this, target, this.speed);
    }

    shoot(target) {
        const currentTime = this.scene.time.now;
        if (currentTime - this.lastShotTime > 1000) { // Disparo por segundo
            this.lastShotTime = currentTime;

            const bullet = this.scene.physics.add.sprite(this.x, this.y, 'disparo');
            this.bullets.add(bullet);
            this.scene.physics.moveToObject(bullet, target, 600);

            this.scene.physics.add.overlap(bullet, this.scene.troops, (bullet, tank) => {
                if (this.isEnemy(tank)) {
                    tank.health -= this.damage;
                    bullet.destroy();
                    if (tank.health <= 0) {
                        tank.destroy();
                        this.scene.events.emit('tankDestroyed', tank.nombre);
                    }
                }
            });
        }
    }

    update() {
        if (!this.scene) return;

        const enemyTanks = this.scene.troops.filter(t => this.isEnemy(t));
        let target = null;

        if (enemyTanks.length > 0) {
            target = this.getClosest(enemyTanks);
        }

        if (target) {
            const distance = Phaser.Math.Distance.Between(this.x, this.y, target.x, target.y);

            if (distance < this.fireRange) {
                this.shoot(target);
                this.setVelocity(0); // Detener el tanque
            } else {
                this.moveTo(target);
            }
        } else {
            this.setVelocityX(this.speed);
            this.setVelocityY(0);
        }
    }

    isEnemy(tank) {
        const player1Tanks = ['tank1', 'tank2', 'tank3', 'tank4', 'tank5'];
        const player2Tanks = ['tank6', 'tank7', 'tank8', 'tank9', 'tank10'];

        if (player1Tanks.includes(this.nombre)) {
            return player2Tanks.includes(tank.nombre);
        } else if (player2Tanks.includes(this.nombre)) {
            return player1Tanks.includes(tank.nombre);
        }
        return false;
    }

    getClosest(enemies) {
        let closest = null;
        let closestDistance = Infinity;
        enemies.forEach(enemy => {
            const distance = Phaser.Math.Distance.Between(this.x, this.y, enemy.x, enemy.y);
            if (distance < closestDistance) {
                closestDistance = distance;
                closest = enemy;
            }
        });
        return closest;
    }
}
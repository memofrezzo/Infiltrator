import Tank from "../Components/Tank";
import Phaser from "phaser";

export default class Escenario1 extends Phaser.Scene {
  constructor() {
    super({ key: 'escenario1' });
        this.player1SelectedOption = 1;
        this.player2SelectedOption = 1;
        this.player1Metal = 0;
        this.player1Oro = 0;
        this.player2Metal = 0;
        this.player2Oro = 0;
        this.player1DeployedTroops = 0;
        this.player2DeployedTroops = 0;
        this.troops = []; // Para almacenar todos los tanques
    }

    create() {
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'fondoEscenario1').setScale(0.89);

        this.createPlayerInterface();
        this.createHealthBars();
        this.createTimer();

        this.cameras.main.setBounds(0, 0, this.cameras.main.width, this.cameras.main.height);

        this.input.keyboard.enabled = true;

        const leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        const rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        const aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        const dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        leftKey.on('down', () => {
            if (this.player2SelectedOption > 1) {
                this.player2SelectedOption--;
                console.log(this.player2SelectedOption + 5);
            }
        });

        rightKey.on('down', () => {
            if (this.player2SelectedOption < 5) {
                this.player2SelectedOption++;
                console.log(this.player2SelectedOption + 5);
            }
        });

        aKey.on('down', () => {
            if (this.player1SelectedOption > 1) {
                this.player1SelectedOption--;
                console.log(this.player1SelectedOption);
            }
        });

        dKey.on('down', () => {
            if (this.player1SelectedOption < 5) {
                this.player1SelectedOption++;
                console.log(this.player1SelectedOption);
            }
        });

        this.time.addEvent({
            delay: 5000,
            callback: this.generateResources,
            callbackScope: this,
            loop: true,
        });

        this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: () => {
                this.timer++;
                this.timerText.setText(this.timer.toString());
            },
            callbackScope: this
        });
        this.events.on('tankDestroyed', (tankName) => {
            this.troops = this.troops.filter(tank => tank.nombre !== tankName);
        });
    }

    generateResources() {
        this.player1Oro += 15;
        this.player1Metal += 50;
        this.player2Oro += 15;
        this.player2Metal += 50;
        console.log('recursos generados');
    }

    createPlayerInterface() {
        let graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 0.7);
        graphics.fillRect(10, this.cameras.main.height - 110, 300, 100);

        graphics.fillRect(this.cameras.main.width - 310, this.cameras.main.height - 110, 300, 100);

        this.createPlayerOptions(1);
        this.createPlayerOptions(2);
    }

    createPlayerOptions(player) {
        let startX = player === 1 ? 10 : this.cameras.main.width - 310;
        let stepX = 60;
        for (let i = 0; i < 5; i++) {
            this.add.rectangle(startX + i * stepX, this.cameras.main.height - 60, 50, 50, 0xffffff).setStrokeStyle(2, 0x000000);
        }
    }

    createHealthBars() {
        this.healthBar1 = this.add.graphics();
        this.healthBar1.fillStyle(0xff0000, 1);
        this.healthBar1.fillRect(10, 10, 300, 30);

        this.healthBar2 = this.add.graphics();
        this.healthBar2.fillStyle(0xff0000, 1);
        this.healthBar2.fillRect(this.cameras.main.width - 310, 10, 300, 30);
    }

    createTimer() {
        this.timer = 0;
    
        let graphics = this.add.graphics();
        graphics.lineStyle(2, 0xffffff, 1);
        graphics.strokeRect(this.cameras.main.width / 2 - 50, 5, 100, 40); // Crear un rectángulo alrededor del timer
    
        this.timerText = this.add.text(this.cameras.main.width / 2, 25, this.timer.toString(), {
            fontSize: '32px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);
    }

    generateInitialPosition(player, troops, yMin = 300, yMax = 600) {
        const xPosition = player === 1 ? 50 : this.cameras.main.width - 50;
        let yPosition;
    
        do {
            yPosition = Phaser.Math.Between(yMin, yMax);
        } while (troops.some(tank => tank.y === yPosition));
    
        return { x: xPosition, y: yPosition };
    }

    GenerarTank1() {
        const { x, y } = this.generateInitialPosition(1, this.troops);
        const tank1 = new Tank(this, x, y, 'tank1', 'tank1', 300, 80, 500, 100);
        this.troops.push(tank1);
    }

    GenerarTank2() {
        console.log("Generando Tank2");
        // Lógica para generar Tank2
    }

    GenerarTank3() {
        console.log("Generando Tank3");
        // Lógica para generar Tank3
    }

    GenerarTank4() {
        console.log("Generando Tank4");
        // Lógica para generar Tank4
    }

    GenerarTank5() {
        console.log("Generando Tank5");
        // Lógica para generar Tank5
    }

    GenerarTank6() {
        const { x, y } = this.generateInitialPosition(2, this.troops);
        const tank6 = new Tank(this, x, y, 'tank6', 'tank6', 200, 100, 550, 100);
        this.troops.push(tank6);
    }

    GenerarTank7() {
        console.log("Generando Tank7");
        // Lógica para generar Tank7
    }

    GenerarTank8() {
        console.log("Generando Tank8");
        // Lógica para generar Tank8
    }

    GenerarTank9() {
        console.log("Generando Tank9");
        // Lógica para generar Tank9
    }

    GenerarTank10() {
        console.log("Generando Tank10");
        // Lógica para generar Tank10
    }

    update() {
        this.troops.forEach(tank => {
            tank.update();
        });

        if (this.player1Metal >= 50 && this.player1SelectedOption === 1) {
            this.GenerarTank1();
            this.player1Metal -= 50;
        }

        if (this.player1Metal >= 50 && this.player1Oro >= 30 && this.player1SelectedOption === 2) {
            this.GenerarTank2();
            this.player1Metal -= 50;
            this.player1Oro -= 30;
        }

        if (this.player1Metal >= 100 && this.player1Oro >= 50 && this.player1SelectedOption === 3) {
            this.GenerarTank3();
            this.player1Metal -= 100;
            this.player1Oro -= 45;
        }

        if (this.player1Metal >= 500 && this.player1SelectedOption === 4) {
            this.GenerarTank4();
            this.player1Metal -= 500;
        }

        if (this.player1Oro >= 90 && this.player1SelectedOption === 5) {
            this.GenerarTank5();
            this.player1Oro -= 90;
        }

        if (this.player2Metal >= 50 && this.player2SelectedOption === 1) {
            this.GenerarTank6();
            this.player2Metal -= 50;
        }

        if (this.player2Metal >= 50 && this.player2Oro >= 30 && this.player2SelectedOption === 2) {
            this.GenerarTank7();
            this.player2Metal -= 50;
            this.player2Oro -= 30;
        }

        if (this.player2Metal >= 100 && this.player2Oro >= 50 && this.player2SelectedOption === 3) {
            this.GenerarTank8();
            this.player2Metal -= 100;
            this.player2Oro -= 50;
        }

        if (this.player2Metal >= 500 && this.player2SelectedOption === 4) {
            this.GenerarTank9();
            this.player2Metal -= 500;
        }

        if (this.player2Oro >= 90 && this.player2SelectedOption === 5) {
            this.GenerarTank10();
            this.player2Oro -= 90;
        }
    }
}



import Phaser from "phaser";

export default class Login extends Phaser.Scene {
firebase;

constructor() {
    super("login");
  }

  create() {
   this.start = this.add.text(400, 300, "Anonimo").setInteractive();
   this.start.on("pointerover", () => {
    this.game.canvas.style.cursor = "pointer"
}).on("pointerout", () => {
    this.game.canvas.style.cursor = "default";
}).on("pointerdown", () => {
    this.game.canvas.style.cursor = "default";
    this.firebase.signInAnonymously()
    .then(() => {this.scene.start("menu");});
});
  this.startG = this.add.text(200,300, "Google").setInteractive();
  this.startG.on("pointerover", () => {
    this.game.canvas.style.cursor = "pointer"
}).on("pointerout", () => {
    this.game.canvas.style.cursor = "default";
}).on("pointerdown", () => {
    this.game.canvas.style.cursor = "default";
    this.firebase.signInWithGoogle()
    .then(() => {this.scene.start("menu");});
});
    }
}
import Phaser from 'phaser';

class BaseScene extends Phaser.Scene {
  constructor(key, config) {
    super(key);
    this.config = config;
    this.screenCenter = [config.width / 2, config.height / 2];
  }

  create() {
    this.createBG();

    if (this.config.canGoBack) {
      const btnBack = this.add.image(this.config.width - 10, this.config.height - 10, 'back')
        .setOrigin(1)
        .setScale(2)
        .setInteractive();

      btnBack.on('pointerdown', () => {
        this.scene.start('MenuScene');
      });
    }
  }

  createBG() {
    this.add.image(0, 0, 'bg').setOrigin(0).setScale(3);
  }
}

export default BaseScene;
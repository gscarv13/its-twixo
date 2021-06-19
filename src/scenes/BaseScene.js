import Phaser from 'phaser';

class BaseScene extends Phaser.Scene {
  constructor(key, config) {
    super(key);
    this.config = config;
    this.screenCenter = [config.width / 2, config.height / 2];
  }

  createBG() {
    this.add.image(0, 0, 'bg').setOrigin(0).setScale(3);
  }
}

export default BaseScene;
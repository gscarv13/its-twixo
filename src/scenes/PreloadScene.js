import Phaser from 'phaser';
import bgIMG from '../assets/Environment/bg-static.png';
import botIMG from '../assets/Character/flying.png';
import obstacle1IMG from '../assets/Environment/obstacle1.png';
import obstacle2IMG from '../assets/Environment/obstacle2.png';
import pauseIMG from '../assets/GUI/pause.png';

class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.load.image('bg', bgIMG);
    this.load.image('bot', botIMG);
    this.load.image('obstacle1', obstacle1IMG);
    this.load.image('obstacle2', obstacle2IMG);
    this.load.image('pause', pauseIMG);
  }

  create() {
    this.scene.start('MenuScene');
  }
}

export default PreloadScene;
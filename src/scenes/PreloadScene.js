import Phaser from 'phaser';
import WebFontFile from './WebFontFile';
import bgIMG from '../assets/Environment/bg-static.png';
import botIMG from '../assets/Character/flyingb.png';
import obstacle1IMG from '../assets/Environment/obstacle1.png';
import obstacle2IMG from '../assets/Environment/obstacle2.png';
import pauseIMG from '../assets/GUI/pause.png';
import playIMG from '../assets/GUI/play.png';
import playPressedIMG from '../assets/GUI/play-pressed.png';
import leaderBoardIMG from '../assets/GUI/leaderboard.png';
import backIMG from '../assets/GUI/back.png';
import okIMG from '../assets/GUI/ok.png';
import cancelIMG from '../assets/GUI/cancel.png';
import menuBGM from '../assets/BGM/TonalDissonance.ogg';

class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.load.audio('menuBGM', [menuBGM]);
    this.load.image('bg', bgIMG);
    this.load.image('ok', okIMG);
    this.load.image('cancel', cancelIMG);
    this.load.image('obstacle1', obstacle1IMG);
    this.load.image('obstacle2', obstacle2IMG);
    this.load.image('pause', pauseIMG);
    this.load.image('play', playIMG);
    this.load.image('playPressed', playPressedIMG);
    this.load.image('leaderboard', leaderBoardIMG);
    this.load.image('back', backIMG);
    this.load.addFile(new WebFontFile(this.load, 'Press Start 2P'));
    this.load.spritesheet('bot', botIMG, {
      frameWidth: 22.5, frameHeight: 22,
    });
  }

  create() {
    this.scene.start('MenuScene');
  }
}

export default PreloadScene;
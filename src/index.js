import './assets/stylesheet/style.css';
import Phaser from 'phaser';
import bgIMG from './assets/Environment/bg-static.png';
import botIMG from './assets/Character/flying.png';
import obstacle1IMG from './assets/Environment/obstacle1.png';
import obstacle2IMG from './assets/Environment/obstacle2.png';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  // scale: {
  //   mode: Phaser.Scale.FIT,
  //   autoCenter: Phaser.Scale.CENTER_BOTH,
  // },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
  scene: {
    preload,
    create,
    update,
  },
};

let bot;
let obstacleTop;
let obstacleBottom;

const obstacleYDistanceRange = [100, 250];
const obstacleYDistance = Phaser.Math.Between(...obstacleYDistanceRange);
const obstacleYPosition = Phaser.Math.Between(60, config.height - 60 - obstacleYDistance);

const initialBotPosition = { x: config.width / 10, y: config.height / 2 };

function preload() {
  console.log(this);
  this.load.image('bg', bgIMG);
  this.load.image('bot', botIMG);

  this.load.image('obstacle1', obstacle1IMG);
  this.load.image('obstacle2', obstacle2IMG);
}

function create() {
  this.add.image(0, 0, 'bg').setOrigin(0).setScale(3);
  obstacleTop = this.physics.add.sprite(400, obstacleYPosition, 'obstacle2').setOrigin(0, 1);
  obstacleBottom = this.physics.add.sprite(400, obstacleYDistance + obstacleTop.y, 'obstacle1').setOrigin(0);

  bot = this.physics.add.sprite(initialBotPosition.x, initialBotPosition.y, 'bot').setScale(2).setOrigin(0);
  bot.body.gravity.y = 400;

  this.input.on('pointerdown', flap);
  this.input.keyboard.on('keydown_SPACE', flap);
}

function resetBotPosition() {
  bot.x = initialBotPosition.x;
  bot.y = initialBotPosition.y;
}

function update() {
  if (bot.y > 545 || bot.y < bot.height - 30) {
    resetBotPosition();
    bot.body.velocity.y = 0;
  }
}

function flap() {
  bot.body.velocity.y = -200;
}

(() => new Phaser.Game(config))();
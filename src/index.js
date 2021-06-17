import './assets/stylesheet/style.css';
import Phaser from 'phaser';
import bgIMG from './assets/Seasonal Tilesets/1 - Grassland/Background parts/_Complete_static_BG_(288 x 208).png';
import botIMG from './assets/Sprite Pack 5/1 - Robo Retro/Flying_(32 x 32).png';

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
      gravity: { y: 300 },
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
let initialBotPosition = { x: config.width / 10, y: config.height / 2 };

function preload() {
  this.load.image('bg', bgIMG);
  this.load.image('bot', botIMG);
}

function create() {
  this.add.image(0, 0, 'bg').setOrigin(0).setScale(3);
  bot = this.physics.add.sprite(initialBotPosition.x, initialBotPosition.y, 'bot').setScale(2).setOrigin(0); 

  this.input.on('pointerdown', flap);
  this.input.keyboard.on('keydown_SPACE', flap);
}

function resetBotPosition() {
  bot.x = initialBotPosition.x;
  bot.y = initialBotPosition.y;
}

function update() {
  if (bot.y > config.height || bot.y < bot.height) {
    resetBotPosition();
    bot.body.velocity.y = 0;
  }
}

function flap() {
  bot.body.velocity.y = -200;
}

(() => new Phaser.Game(config))();
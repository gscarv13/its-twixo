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

let OBSTACLES_TO_RENDER = 4;
let bot = null;
let obstacles = null;

const obstacleYDistanceRange = [100, 250];
const obstacleXDistanceRange = [400, 600];

let obstacleXDistance = 0;

const initialBotPosition = { x: config.width / 10, y: config.height / 2 };

function preload() {
  this.load.image('bg', bgIMG);
  this.load.image('bot', botIMG);

  this.load.image('obstacle1', obstacle1IMG);
  this.load.image('obstacle2', obstacle2IMG);
}

function create() {
  this.add.image(0, 0, 'bg').setOrigin(0).setScale(3);

  bot = this.physics.add.sprite(initialBotPosition.x, initialBotPosition.y, 'bot').setScale(2).setOrigin(0);
  bot.body.gravity.y = 400;

  obstacles = this.physics.add.group();

  for (let i = 0; i < OBSTACLES_TO_RENDER; i += 1) {
    const obstacleTop = obstacles.create(0, 0, 'obstacle2').setOrigin(0, 1);
    const obstacleBottom = obstacles.create(0, 0, 'obstacle1').setOrigin(0);

    placeObstacle(obstacleTop, obstacleBottom);
  }

  obstacles.setVelocityX(-200);

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

  recycleObstacles();
}

function flap() {
  bot.body.velocity.y = -200;
}

function placeObstacle(top, bottom) {
  const rightMostX = getRightMostObstacle();
  const obstacleYDistance = Phaser.Math.Between(...obstacleYDistanceRange);
  const obstacleYPosition = Phaser.Math.Between(60, config.height - 60 - obstacleYDistance);
  const obstacleXDistance = Phaser.Math.Between(...obstacleXDistanceRange);

  top.x = rightMostX + obstacleXDistance;
  top.y = obstacleYPosition;

  bottom.x = top.x;
  bottom.y = top.y + obstacleYDistance;
}

function getRightMostObstacle() {
  let rightMost = 0;

  obstacles.getChildren().forEach((obstacle) => {
    rightMost = Math.max(obstacle.x, rightMost);
  });

  return rightMost;
}

function recycleObstacles() {
  const obstaclesOutOfScene = [];
  obstacles.getChildren().forEach((obstacle) => {
    if (obstacle.getBounds().right <= 0) {
      obstaclesOutOfScene.push(obstacle);
      if (obstaclesOutOfScene.length === 2) {
        placeObstacle(...obstaclesOutOfScene);
      }
    }
  });
}

(() => new Phaser.Game(config))();
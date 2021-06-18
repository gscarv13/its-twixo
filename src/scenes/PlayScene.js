import Phaser from 'phaser';
import bgIMG from '../assets/Environment/bg-static.png';
import botIMG from '../assets/Character/flying.png';
import obstacle1IMG from '../assets/Environment/obstacle1.png';
import obstacle2IMG from '../assets/Environment/obstacle2.png';

const OBSTACLES_TO_RENDER = 4;

class PlayScene extends Phaser.Scene {
  constructor(config) {
    super('PlayScene');
    this.config = config;
    this.bot = null;
    this.obstacles = null;
    this.obstacleYDistanceRange = [100, 250];
    this.obstacleXDistanceRange = [400, 600];
    this.obstacleXDistance = 0;
  }

  preload() {
    this.load.image('bg', bgIMG);
    this.load.image('bot', botIMG);
    this.load.image('obstacle1', obstacle1IMG);
    this.load.image('obstacle2', obstacle2IMG);
  }

  create() {
    this.add.image(0, 0, 'bg').setOrigin(0).setScale(3);

    this.bot = this.physics.add.sprite(this.config.initialPosition.x, this.config.initialPosition.y, 'bot').setScale(2).setOrigin(0);
    this.bot.body.gravity.y = 400;

    this.obstacles = this.physics.add.group();

    for (let i = 0; i < OBSTACLES_TO_RENDER; i += 1) {
      const obstacleTop = this.obstacles.create(0, 0, 'obstacle2').setOrigin(0, 1);
      const obstacleBottom = this.obstacles.create(0, 0, 'obstacle1').setOrigin(0);

      this.placeObstacle(obstacleTop, obstacleBottom);
    }

    this.obstacles.setVelocityX(-200);

    this.input.on('pointerdown', this.upBoost, this);
    this.input.keyboard.on('keydown_SPACE', this.upBoost, this);
  }

  upBoost() {
    this.bot.body.velocity.y = -200;
  }

  getRightMostObstacle() {
    let rightMost = 0;
    this.obstacles.getChildren().forEach((obstacle) => {
      rightMost = Math.max(obstacle.x, rightMost);
    });

    return rightMost;
  }

  placeObstacle(top, bottom) {
    const rightMostX = this.getRightMostObstacle();
    const obstacleYDistance = Phaser.Math.Between(...this.obstacleYDistanceRange);
    const obstacleYPosition = Phaser.Math.Between(60, this.config.height - 60 - obstacleYDistance);
    const obstacleXDistance = Phaser.Math.Between(...this.obstacleXDistanceRange);

    top.x = rightMostX + obstacleXDistance;
    top.y = obstacleYPosition;

    bottom.x = top.x;
    bottom.y = top.y + obstacleYDistance;
  }

  resetBotPosition() {
    this.bot.x = this.config.initialPosition.x;
    this.bot.y = this.config.initialPosition.y;
  }

  recycleObstacles() {
    const obstaclesOutOfScene = [];
    this.obstacles.getChildren().forEach((obstacle) => {
      if (obstacle.getBounds().right <= 0) {
        obstaclesOutOfScene.push(obstacle);
        if (obstaclesOutOfScene.length === 2) {
          this.placeObstacle(...obstaclesOutOfScene);
        }
      }
    });
  }

  update() {
    if (this.bot.y > 545 || this.bot.y < this.bot.height - 30) {
      this.resetBotPosition();
      this.bot.body.velocity.y = 0;
    }
    this.recycleObstacles();
  }
}

export default PlayScene;
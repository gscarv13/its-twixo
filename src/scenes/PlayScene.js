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
    this.obstacleXDistanceRange = [400, 550];
    this.obstacleXDistance = 0;
  }

  preload() {
    this.load.image('bg', bgIMG);
    this.load.image('bot', botIMG);
    this.load.image('obstacle1', obstacle1IMG);
    this.load.image('obstacle2', obstacle2IMG);
  }

  create() {
    this.createBG();
    this.createBot();
    this.createObstacles();
    this.createColliders();
    this.eventsHandler();
  }

  update() {
    this.checkGameStatus();
    this.recycleObstacles();
  }

  createBG() {
    this.add.image(0, 0, 'bg').setOrigin(0).setScale(3);
  }

  createBot() {
    this.bot = this.physics.add.sprite(this.config.initialPosition.x, this.config.initialPosition.y, 'bot').setScale(2).setOrigin(0);
    this.bot.body.gravity.y = 400;
    this.bot.setCollideWorldBounds(true);
  }

  createObstacles() {
    this.obstacles = this.physics.add.group();

    for (let i = 0; i < OBSTACLES_TO_RENDER; i += 1) {
      const obstacleTop = this.obstacles.create(0, 0, 'obstacle2')
        .setImmovable(true)
        .setOrigin(0, 1);

      const obstacleBottom = this.obstacles.create(0, 0, 'obstacle1')
        .setImmovable(true)
        .setOrigin(0);

      this.placeObstacle(obstacleTop, obstacleBottom);
    }

    this.obstacles.setVelocityX(-200);
  }

  createColliders() {
    this.physics.add.collider(this.bot, this.obstacles, this.gameOver, null, this);
  }

  eventsHandler() {
    this.input.on('pointerdown', this.upBoost, this);
    this.input.keyboard.on('keydown_SPACE', this.upBoost, this);
  }

  upBoost() {
    this.bot.body.velocity.y = -250;
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

  checkGameStatus() {
    if (this.bot.getBounds().bottom > 590 || this.bot.y < this.bot.height - 30) {
      this.gameOver();
    }
  }

  gameOver() {
    // this.bot.x = this.config.initialPosition.x;
    // this.bot.y = this.config.initialPosition.y;
    // this.bot.body.velocity.y = 0;

    this.physics.pause();
    this.bot.setTint(0x000000);

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.scene.restart();
      },
      loop: false,
    });
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
}

export default PlayScene;
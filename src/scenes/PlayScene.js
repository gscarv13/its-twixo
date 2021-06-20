import Phaser from 'phaser';
import BaseScene from './BaseScene';

const OBSTACLES_TO_RENDER = 4;

class PlayScene extends BaseScene {
  constructor(config) {
    super('PlayScene', config);
    this.bot = null;
    this.obstacles = null;
    this.obstacleYDistanceRange = [100, 250];
    this.obstacleXDistanceRange = [400, 550];
    this.obstacleXDistance = 0;
    this.score = 0;
    this.scoreText = '0';
  }

  create() {
    super.createBG();
    this.createBot();
    this.createObstacles();
    this.createColliders();
    this.eventsHandler();
    this.createScore();
    this.createPause();
  }

  update() {
    this.checkGameStatus();
    this.recycleObstacles();
  }

  createBot() {
    this.bot = this.physics.add
      .sprite(this.config.initialPosition.x, this.config.initialPosition.y, 'bot')
      .setScale(1.5)
      .setOrigin(0);

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

  createPause() {
    const btnPause = this.add.image(this.config.width - 10, this.config.height - 10, 'pause')
      .setOrigin(1, 1)
      .setInteractive()
      .setScale(2);

    btnPause.on('pointerdown', () => {
      this.physics.pause();
      this.scene.pause();
      this.scene.launch('PauseScene');
    });
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
    this.physics.pause();
    this.bot.setTint(0x000000);
    this.saveBestScore();

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.scene.restart();
      },
      loop: false,
    });
  }

  saveBestScore() {
    const bestScoreText = localStorage.getItem('bestScore');
    const bestScore = bestScoreText && parseInt(bestScoreText, 10);

    if (!bestScore || this.score > bestScore) {
      localStorage.setItem('bestScore', this.score);
    }
  }

  createScore() {
    const bestScore = localStorage.getItem('bestScore');
    this.score = 0;
    this.scoreText = this.add.text(16, 16, `Score: ${0}`, {
      fontSize: '32px',
      fill: '#000',
    });

    this.add.text(16, 52, `Best score: ${bestScore || 0}`, {
      fontSize: '18px',
      fill: '#000',
    });
  }

  increaseScore() {
    this.score += 1;
    this.scoreText.setText(`Score: ${this.score}`);
  }

  recycleObstacles() {
    const obstaclesOutOfScene = [];
    this.obstacles.getChildren().forEach((obstacle) => {
      if (obstacle.getBounds().right <= 0) {
        obstaclesOutOfScene.push(obstacle);
        if (obstaclesOutOfScene.length === 2) {
          this.placeObstacle(...obstaclesOutOfScene);
          this.increaseScore();
          this.saveBestScore();
        }
      }
    });
  }
}

export default PlayScene;
import BaseScene from './BaseScene';

class MenuScene extends BaseScene {
  constructor(config) {
    super('MenuScene', config);
    this.menu = [
      { scene: 'PlayScene', text: 'Play' },
      { scene: 'ScoreScene', text: 'Score' },
      { scene: null, text: 'Exit' },
    ];
    this.posPlay = [this.config.width / 2, this.config.height * (3 / 4)];
  }

  create() {
    super.createBG();
    this.playButton();
    this.leaderBoardButton();
  }

  createButton(xpos, ypos, keyIMG) {
    return this.add.image(xpos, ypos, keyIMG)
      .setOrigin(0.5, 0.5)
      .setScale(2);
  }

  leaderBoardButton() {
    const btnLeaderboard = this.add.image(this.config.width - 30, this.config.height - 10, 'leaderboard')
      .setOrigin(1, 1)
      .setInteractive()
      .setScale(1);

    btnLeaderboard.on('pointerdown', () => {
      this.scene.start('ScoreScene');
    });
  }

  playButton() {
    let btnPlay = this.createButton(...this.posPlay, 'play');

    btnPlay.setInteractive();

    btnPlay.on('pointerover', () => {
      btnPlay.setTint(0xf1aeae);
    });

    btnPlay.on('pointerout', () => {
      btnPlay.clearTint();
    });

    btnPlay.on('pointerdown', () => {
      btnPlay = this.createButton(...this.posPlay, 'playPressed');
    });

    btnPlay.on('pointerup', () => {
      this.scene.start('PlayScene');
    });
  }
}

export default MenuScene;
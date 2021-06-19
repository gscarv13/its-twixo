import BaseScene from './BaseScene';

class MenuScene extends BaseScene {
  constructor(config) {
    super('MenuScene', config);
    this.menu = [
      { scene: 'PlayScene', text: 'Play' },
      { scene: 'ScoreScene', text: 'Score' },
      { scene: null, text: 'Exit' },
    ];
  }

  create() {
    super.createBG();
    this.playButton();
  }

  createButton(keyIMG) {
    return this.add.image(this.config.width / 2, this.config.height * (3 / 4), keyIMG)
      .setOrigin(0.5, 0.5)
      .setScale(2);
  }

  playButton() {
    let btnPlay = this.createButton('play');

    btnPlay.setInteractive();

    btnPlay.on('pointerover', () => {
      btnPlay.setTint(0xf1aeae);
    });

    btnPlay.on('pointerout', () => {
      btnPlay.clearTint();
    });

    btnPlay.on('pointerdown', () => {
      btnPlay = this.createButton('playPressed');
    });

    btnPlay.on('pointerup', () => {
      this.scene.start('PlayScene');
    });
  }
}

export default MenuScene;
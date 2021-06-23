import BaseScene from './BaseScene';
import * as API from '../scripts/APICall';

class MenuScene extends BaseScene {
  constructor(config) {
    super('SubmitScoreScene', { ...config, canGoBack: true });
  }

  create() {
    super.create();

    this.score = localStorage.getItem('bestScore');
    this.displayScore();
    this.btnConfirm();
    this.btnCancel();
  }

  displayScore() {
    this.add.text(this.screenCenter[0], this.screenCenter[1], 'Save highest score?', {
      ...this.fontOptions,
      fontSize: '32px',
    }).setOrigin(0.5);
  }

  btnConfirm() {
    const btn = this.add.image(this.screenCenter[0] - 50, this.screenCenter[1] + 80, 'ok')
      .setOrigin(0.5)
      .setScale(3);

    btn.setInteractive();

    btn.on('pointerup', () => {
      const userData = {
        user: localStorage.getItem('username'),
        score: JSON.parse(localStorage.getItem('bestScore')),
      };

      API.setScore.bind(this)(this.endpoint, this.scoreOptions, userData, this.checkResolve);
    });
  }

  btnCancel() {
    const btn = this.add.image(this.screenCenter[0] + 50, this.screenCenter[1] + 80, 'cancel')
      .setOrigin(0.5)
      .setScale(3);

    btn.setInteractive();

    btn.on('pointerup', () => {
      this.scene.start('PlayScene');
    });
  }

  checkResolve(data) {
    if (data.result) {
      this.scene.start('MenuScene');
    }
  }
}

export default MenuScene;
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
  }

  displayScore() {
    this.add.text(this.screenCenter[0], this.screenCenter[1], 'Save highest score?', {
      color: '#000',
      fontSize: '32px',
    }).setOrigin(0.5);
  }

  btnConfirm() {
    const btn = this.add.text(this.screenCenter[0] - 50, this.screenCenter[1] + 50, 'Yes', {
      color: '#000',
      fontSize: '25px',
    }).setOrigin(0.5);

    btn.setInteractive();

    btn.on('pointerup', () => {
      const userData = {
        user: localStorage.getItem('username'),
        score: JSON.parse(localStorage.getItem('bestScore')),
      };

      API.setScore.bind(this)(this.endpoint, this.scoreOptions, userData, this.checkResolve);
    });
  }

  checkResolve(data) {
    if (data.result) {
      this.scene.start('MenuScene');
    }
  }
}

export default MenuScene;
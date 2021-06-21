import BaseScene from './BaseScene';
import * as API from '../scripts/APICall';

class ScoreScene extends BaseScene {
  constructor(config) {
    super('ScoreScene', { ...config, canGoBack: true });
  }

  create() {
    super.create();

    this.boardMessage = this.add.text(
      this.config.width / 2,
      this.config.height / 2,
      'loading...',
      {
        fontSize: '32px',
        fill: '#000000',
      },
    ).setOrigin(0.5);

    API.getScore.bind(this)(this.endpoint, this.scoreOptions, this.returnFirst);
  }

  returnFirst(input) {
    let bestScore = input.result;
    bestScore = bestScore.sort((a, b) => b.score - a.score);
    const topScores = bestScore.slice(0, 4);
    this.boardMessage.setText(`
    1st -> ${topScores[0].user}: ${topScores[0].score}\n
    2nd -> ${topScores[1].user}: ${topScores[1].score}\n
    3rd -> ${topScores[2].user}: ${topScores[2].score}
    `);
  }
}

export default ScoreScene;
import BaseScene from './BaseScene';

class ScoreScene extends BaseScene {
  constructor(config) {
    super('ScoreScene', { ...config, canGoBack: true });
  }

  create() {
    super.create();

    const bestScore = localStorage.getItem('bestScore');
    this.add.text(
      this.config.width / 2,
      this.config.height / 2,
      `Best Score: ${bestScore}`,
      {
        fontSize: '32px',
        fill: '#000000',
      },
    ).setOrigin(0.5);
  }
}

export default ScoreScene;
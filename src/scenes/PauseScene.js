import BaseScene from './BaseScene';

class PauseScene extends BaseScene {
  constructor(config) {
    super('PauseScene', config);
    this.menu = [
      { scene: 'PlayScene', text: 'Continue' },
      { scene: 'MenuScene', text: 'Back to menu' },
    ];
    this.posCenter = [this.config.width / 2, this.config.height / 2];
  }

  create() {
    super.create();

    const pauseMenu = [this.createMenuButton(), this.createContinueButton()];
    pauseMenu.forEach((item) => {
      this.setupMenuEvents(item);
    });
  }

  createContinueButton() {
    return this.add.text(...this.posCenter, this.menu[0].text, this.fontOptions)
      .setOrigin(0.5, 1);
  }

  createMenuButton() {
    return this.add.text(
      this.posCenter[0], this.posCenter[1] + 40, this.menu[1].text, this.fontOptions,
    ).setOrigin(0.5, 1);
  }

  setupMenuEvents(btn) {
    btn.setInteractive();

    btn.on('pointerover', () => {
      btn.setStyle({ fill: '#ff0' });
    });

    btn.on('pointerout', () => {
      btn.setStyle({ fill: '#fff' });
    });

    btn.on('pointerup', () => {
      if (btn.scene && btn.text === 'Continue') {
        this.scene.stop();
        this.scene.resume('PlayScene');
      } else {
        this.scene.stop('PlayScene');
        this.scene.start('MenuScene');
      }
    });
  }
}

export default PauseScene;
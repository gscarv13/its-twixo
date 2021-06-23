import Phaser from 'phaser';
import BaseScene from './BaseScene';

class MenuScene extends BaseScene {
  constructor(config) {
    super('MenuScene', config);
    this.isPlaying = false;
    this.posPlay = [this.config.width / 2, this.config.height * (3 / 4)];
  }

  create() {
    super.create();
    this.playButton();
    this.leaderBoardButton();
    this.addAudio();
    this.playAudio();
    this.displayTitle();
    this.displayUsernameInput();
  }

  displayTitle() {
    this.add.text(this.config.width / 2, 120, 'It\'s Twixo', {
      ...this.fontOptions,
      fontSize: '32px',
    }).setOrigin(0.5);
  }

  displayUsernameInput() {
    this.nameInput = this.add.dom(this.config.width / 2, 350)
      .createFromHTML('<input type="text" id="name" name="nameField" name" value="" >')
      .setOrigin(0.5);

    this.message = this.add.text(this.config.width / 2, 310, 'Enter your nick, and hit ENTER', {
      ...this.fontOptions,
      fontSize: '15px',
    }).setOrigin(0.5);

    this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    this.returnKey.on('down', () => {
      this.saveName();
    });
  }

  addAudio() {
    this.bgm = this.sound.add('menuBGM', { loop: true });
  }

  playAudio() {
    if (this.isPlaying === false) {
      this.bgm.play();
      this.isPlaying = true;
    }
  }

  saveName() {
    const name = this.game.domContainer.querySelector('#name');

    if (name.value !== '') {
      localStorage.setItem('username', name.value);
      name.value = '';
      name.remove();
      this.add.text(this.config.width / 2, 350, 'Saved', this.fontOptions).setOrigin(0.5);
    }
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
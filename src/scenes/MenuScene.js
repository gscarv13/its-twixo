import Phaser from 'phaser';
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
    super.create();
    this.playButton();
    this.leaderBoardButton();

    // this.nameInput = this.add.dom(200, 200).createFromCache("form").setOrigin(0);
    this.nameInput = this.add.dom(this.config.width / 2, 350)
      .createFromHTML('<input type="text" id="name" name="nameField" placeholder="Enter your name" value="" style="font-size: 20px">')
      .setOrigin(0.5);

    this.message = this.add.text(this.config.width / 2, 310, 'Enter your nick, and hit ENTER', {
      color: '#000',
      fontSize: '22px',
    }).setOrigin(0.5);

    this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    this.returnKey.on('down', () => {
      this.saveName();
    });
  }

  saveName() {
    const name = this.game.domContainer.querySelector('#name');

    if (name.value !== '') {
      localStorage.setItem('username', name.value);
      name.value = '';
      name.remove();
      this.add.text(this.config.width / 2, 350, 'Saved', {
        color: '#000',
      }).setOrigin(0.5);
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
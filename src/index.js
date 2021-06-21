import './assets/stylesheet/style.css';
import Phaser from 'phaser';
import PreloadScene from './scenes/PreloadScene';
import PlayScene from './scenes/PlayScene';
import MenuScene from './scenes/MenuScene';
import ScoreScene from './scenes/ScoreScene';
import PauseScene from './scenes/PauseScene';

const WIDTH = 800;
const HEIGHT = 600;
const BOT_POSITION = {
  x: WIDTH * 0.1,
  y: HEIGHT / 2,
};

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  initialPosition: BOT_POSITION,
};

const SCENES = [PreloadScene, MenuScene, ScoreScene, PlayScene, PauseScene];
const newScene = (Scene) => new Scene(SHARED_CONFIG);
const initScenes = () => SCENES.map(newScene);

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  // scale: {
  //   mode: Phaser.Scale.FIT,
  //   autoCenter: Phaser.Scale.CENTER_BOTH,
  // },
  parent: 'container',
  dom: {
    createContainer: true,
    expandParent: true,
  },
  physics: {
    default: 'arcade',
  },
  scene: initScenes(),
};

(() => new Phaser.Game(config))();
### Main goal

Develop a game, following the platform style, in which the player has to keep the character flying avoiding the obstacles, using the Phaser Framework to build the game.

### Preparing the graphical assets

To style the game, I wanted to use Pixel art assets to resemble older games like Super Mario.
I gathered assets mainly from 2 different sources:

- [OpenGameArt.org](https://opengameart.org/)
- [itch.io](https://itch.io/game-assets/free)

The assets gathered are UI elements such as buttons, background, character sprite, and background music.

### Development stage

The technologies used to implement the game are:

- Use Phaser with Javascript
- Webpack to bundle all assets and modules
- Organize all Scenes in Classes to keep the project maintainable
- API calls to save and retrieve player scores when appropriated
- Jest to practice TDD with the API development
- Yarn to manage all project's dependencies

#### 1. Understand the basics

Test and implement the basics of Phaser, adding features such as loading assets, placing the assets on canvas, adding listeners to fire events and allow user interaction, and animating the character was the initial goal.

#### 2. Implementing the Play Scene

At this stage I wanted to create the core functionality of the game, which required:
- Display the character
- Add the obstacles
- Apply physics to the character such as gravity and velocity
- Allow the user to hit the obstacles or the boundaries of the scene to lose the game
- Give the user a score the longer you can play


#### 3. Implement the Menu Scene and Pause scene

- Add the functionality to pause the game and allow it to continue or go back to the main menu if needed.
- On the main menu allow the user to add the nickname if desired. 
- On the main menu add a button to navigate to the leaderboard

#### 4. Add Score Scene and "Submit Score Scene"

- On the leaderboard, display the top 3 players fetched from the API
- Allow the user to submit its high score if provided the nickname after losing

#### 5. Implement the final details

- Add animation to the character sprite
- Add background music to the Menu and Play Scenes
- Add custom font to the game
- Complete necessary refactoring

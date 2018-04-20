### Background and Overview


[Play it here!](https://mpompili.github.io/lazerline/)

LazerLine is a single and multiple player game heavily influenced by tron's racing game concept. 

Users control an infinitely growing lazerline in attempt to be the last player standing. Players are eliminated if they run into walls or any lighttrail, be it their own or another players. 

### Funcitonality & MVP 

- [x] Controler LazerLine with AWSD or Directional Inputs. 
- [ ] Play against another human player on the same computer
- [x] Play against an AI. 
- [ ] Generate Sound Effects based off of the turns, colisions, and end-game events. 
- [x] Set number of AI bots 
- [x] Select Game Difficulty/Intelligence of AIbots

### Wireframes

This game will consist of a single screen with a splash modal to set the second player as an AI or another human player. There will be links to my Github, Linked as well as an instructional and about modal. There will be a mute button on the bottom left hand corner of the screen. On the left side of the screen the player can select one of many colors to represent their lazerline as well as a difficulty (Easy, Medium, Hard) which determines the speed/playback rate of the game. 

![LAZERLINE](https://github.com/Mpompili/lazerline/blob/master/images/LazerLine%20WF.png?raw=true)

### Architecture and Technologies

This project will be implemented with the following technologies: 

+ ``Javascript`` for structure and game logic,
+ ``HTML5 Canvas`` for Dom manipulation and rendering
+ Webpack to bundle and serve up the various scripts. 

There will be three scripts involved with this project:

``lazerline.js``: this script will handle the logic for creating and updating the necessary Dom Elements.

``bike.js``: this script will house the physics and collision logic for the bikes.

``enemy.js``: this script will house the AI logic for computer players. 

### Implementaiton Timeline 

#### Over the weekend:
- [ ] Study on similar games. 
#### Day 1: 
- [ ] Get webpack serving files and frame out index.html
- [ ] Generate one bike and collision game-end logic working. 
#### Day 2: 
- [ ] Complete bike.js module (constructor, update functions, colors) 
- [ ] Get sounds to play on collisions 
- [ ] Get 2 bikes rendered on the canvas 
- [ ] Get multiplayer working (playing on the same computer)
#### Day 3: 
- [ ] Study up on how to do AI
- [ ] Make a computer AI player bike 
- [ ] Have all audio event handling and sound effects complete. 
#### Day 4:  
- [ ] Ensure full automation of start, pause, reset game functionality 
- [ ] Polish out UI/UX. 
- [ ] Players can select their lazerline color and difficulty of game through side buttons. 

### Bonus features

- [ ] extra environment particle effects to _spice_ up the stage
- [ ] unique minimalist death and victory modals at game over
- [ ] Special Rounds, for extra difficulty, sets unique changes to the game for added difficulty...example: Strobe (strobe light effect on the arena) 
- [ ] 4 person multiplayer over the internet.
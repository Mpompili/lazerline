const Lazerline = require('./lazerline.js');
const GameView = require('./game_view.js');

document.addEventListener('DOMContentLoaded', () => {
  let settings = {
    numOfBots: 1,
    difficulty: 1
  };

  // let myAudio = new Audio('turn.wav');
  // myAudio.loop = true;
  // myAudio.play();

  // let others = [];
  // this.players.map(z => {
  //     if (z.color !== object.color){
  //         others.push(z);
  //     }
  // });

  let botButtons = document.getElementsByClassName('botbutton');
  let difButtons = document.getElementsByClassName('difbutton');
  //array

  let toggleButton = function(buttons, setting) {
    for (let i = 0; i < buttons.length; i++) {
      let button = buttons[i];
      let others = [];
      [0, 1, 2].forEach(num => {
        if (num != i) others.push(num);
      });

      button.addEventListener('click', () => {
        settings[setting] = button.innerHTML;
        // debugger;
        button.classList.add('active');
        others.forEach(btnNum => {
          buttons[btnNum].classList.remove('active');
        });
      });
    }
  };

  toggleButton(botButtons, 'numOfBots');
  toggleButton(difButtons, 'difficulty');

  let fadeIntro = function(setForm, open, startBtn, setting) {
    setForm.classList.add('close');
    open.classList.add('open');
    startBtn.classList.add('close');
    let tut = document.getElementsByClassName('tutorial');
    tut = tut[0];
    tut.classList.add('show-tutorial');
    tut.classList.add('openTut');
    let tut2 = document.getElementsByClassName('tutorial-p2');
    tut2 = tut2[0];
    setTimeout(function() {
      let h1 = document.getElementById('t2h1');
      tut2.classList.add('appear');
      setTimeout(function() {
        h1.innerHTML = 'GET READY';
        setTimeout(function() {
          h1.innerHTML = '3';
          setTimeout(function() {
            h1.innerHTML = '2';
            setTimeout(function() {
              h1.innerHTML = '1';
            }, 1000);
          }, 1000);
        }, 1000);
      }, 5000);

      tut.classList.add('moveTut');
      let splayer = document.getElementsByClassName('start-player');
      splayer = splayer[0];
      // splayer.add('appear2');

      setTimeout(function() {
        splayer.classList.add('move-player');
      }, 2000);
    }, 5000);
    setTimeout(function() {
      open.parentNode.removeChild(open);
      setForm.parentNode.removeChild(setForm);
      startBtn.parentNode.removeChild(startBtn);
      tut2.parentNode.removeChild(tut2);

      settings['numOfBots'] = parseInt(settings['numOfBots']);
      settings['difficulty'] = parseInt(settings['difficulty']);

      getStarted(setting);
    }, 14000);
  };

  let opening = document.getElementById('pract');
  let settingForm = document.getElementById('settings-form');
  let startButton = document.getElementById('start-button');

  opening.addEventListener('click', () =>
    fadeIntro(settingForm, opening, startButton, settings)
  );
  startButton.addEventListener('click', () =>
    fadeIntro(settingForm, opening, startButton, settings)
  );

  let getStarted = function(setts) {
    const gameCanvas = document.getElementsByClassName('game-canvas');
    gameCanvas[0].classList.add('resize');
    gameCanvas[0].width = 500;
    gameCanvas[0].height = 500;

    let ctx = gameCanvas[0].getContext('2d');
    let game = new Lazerline();

    let restart = () => {
      game = new Lazerline();
      return game;
    };

    new GameView(game, ctx, setts, restart).start();
  };
});

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Lazerline = __webpack_require__(1);
var GameView = __webpack_require__(4);

document.addEventListener('DOMContentLoaded', function () {
  var settings = {
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

  var botButtons = document.getElementsByClassName('botbutton');
  var difButtons = document.getElementsByClassName('difbutton');
  //array

  var toggleButton = function toggleButton(buttons, setting) {
    var _loop = function _loop(i) {
      var button = buttons[i];
      var others = [];
      [0, 1, 2].forEach(function (num) {
        if (num != i) others.push(num);
      });

      button.addEventListener('click', function () {
        settings[setting] = button.innerHTML;
        // debugger;
        button.classList.add('active');
        others.forEach(function (btnNum) {
          buttons[btnNum].classList.remove('active');
        });
      });
    };

    for (var i = 0; i < buttons.length; i++) {
      _loop(i);
    }
  };

  toggleButton(botButtons, 'numOfBots');
  toggleButton(difButtons, 'difficulty');

  var fadeIntro = function fadeIntro(setForm, open, startBtn, setting) {
    setForm.classList.add('close');
    open.classList.add('open');
    startBtn.classList.add('close');
    var tut = document.getElementsByClassName('tutorial');
    tut = tut[0];
    tut.classList.add('show-tutorial');
    tut.classList.add('openTut');
    var tut2 = document.getElementsByClassName('tutorial-p2');
    tut2 = tut2[0];
    setTimeout(function () {
      var h1 = document.getElementById('t2h1');
      tut2.classList.add('appear');
      setTimeout(function () {
        h1.innerHTML = 'GET READY';
        setTimeout(function () {
          h1.innerHTML = '3';
          setTimeout(function () {
            h1.innerHTML = '2';
            setTimeout(function () {
              h1.innerHTML = '1';
            }, 1000);
          }, 1000);
        }, 1000);
      }, 5000);

      tut.classList.add('moveTut');
      var splayer = document.getElementsByClassName('start-player');
      splayer = splayer[0];
      // splayer.add('appear2');

      setTimeout(function () {
        splayer.classList.add('move-player');
      }, 2000);
    }, 5000);
    setTimeout(function () {
      open.parentNode.removeChild(open);
      setForm.parentNode.removeChild(setForm);
      startBtn.parentNode.removeChild(startBtn);
      tut2.parentNode.removeChild(tut2);

      settings['numOfBots'] = parseInt(settings['numOfBots']);
      settings['difficulty'] = parseInt(settings['difficulty']);

      getStarted(setting);
    }, 14000);
  };

  var opening = document.getElementById('pract');
  var settingForm = document.getElementById('settings-form');
  var startButton = document.getElementById('start-button');

  opening.addEventListener('click', function () {
    return fadeIntro(settingForm, opening, startButton, settings);
  });
  startButton.addEventListener('click', function () {
    return fadeIntro(settingForm, opening, startButton, settings);
  });

  var getStarted = function getStarted(setts) {
    var gameCanvas = document.getElementsByClassName('game-canvas');
    gameCanvas[0].classList.add('resize');
    gameCanvas[0].width = 500;
    gameCanvas[0].height = 500;

    var ctx = gameCanvas[0].getContext('2d');
    var game = new Lazerline();

    var restart = function restart() {
      game = new Lazerline();
      return game;
    };

    new GameView(game, ctx, setts, restart).start();
  };
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SCL = 5;
var Player = __webpack_require__(2);
var Grid = __webpack_require__(3);

var Lazerline = function () {
    function Lazerline() {
        _classCallCheck(this, Lazerline);

        this.grid = new Grid();
        this.players = [];
        this.allTrails = {};
        this.playersLeft;
    }

    _createClass(Lazerline, [{
        key: "draw",
        value: function draw(ctx) {

            ctx.clearRect(0, 0, 500, 500);
            ctx.fillStyle = "#000C19";
            ctx.fillRect(0, 0, 500, 500);

            this.grid.draw(ctx);
        }
    }, {
        key: "drawPlayers",
        value: function drawPlayers(ctx) {
            var _this = this;

            this.allObjects().forEach(function (object) {
                _this.allTrails[object.location[0] + ',' + object.location[1]] = true;
                object.draw(ctx);
            });
        }
    }, {
        key: "allObjects",
        value: function allObjects() {
            return [].concat(this.players);
        }
    }, {
        key: "addPlayer",
        value: function addPlayer(x, y, dx, dy, c, isComp, dir, name) {
            var player = new Player(x, y, dx, dy, c, isComp, dir, name);
            this.players.push(player);
            return player;
        }
    }, {
        key: "humanPlayer",
        value: function humanPlayer() {
            return this.addPlayer(500 / 2 / SCL, (500 - 50) / SCL, 0, -1, "#FFF", false, ["up", [0, -1]], 'You Win!');
        }
    }, {
        key: "computerPlayer",
        value: function computerPlayer() {
            switch (this.players.length) {
                case 1:
                    return this.addPlayer(500 / 2 / SCL, 50 / SCL, 0, 1, "#00FF7F", true, ["down", [0, 1]], "Comp Wins!");
                case 2:
                    return this.addPlayer(50 / SCL - 5, 500 / 2 / SCL, 1, 0, "#F50", true, ["right", [1, 0]], "Comp Wins!");
                case 3:
                    return this.addPlayer((500 - 50) / SCL + 5, 500 / 2 / SCL, -1, 0, "#00FFFF", true, ["left", [-1, 0]], "Comp Wins!");
                default:
                    return;
            }
        }
    }, {
        key: "moveObjects",
        value: function moveObjects(diff) {
            var _this2 = this;

            this.playersLeft = 0;
            this.players.forEach(function (object) {
                var others = [];
                _this2.players.map(function (z) {
                    if (z.color !== object.color) {
                        others.push(z);
                    }
                });
                if (object.alive) {
                    _this2.playersLeft += 1;
                    if (object.isComp) object.compMove(_this2.allTrails, diff);
                    _this2.checkLife(object, others);
                    object.update();
                }
            });
        }
    }, {
        key: "checkLife",
        value: function checkLife(obj, others) {
            if (obj.checkBounds() || obj.collidesWith(obj.trail) || obj.collidesWith2(obj.location[0], obj.location[1], others)) {
                obj.velocity = [0, 0];
                obj.alive = false;
            }
        }
    }, {
        key: "step",
        value: function step(diff) {

            this.moveObjects(diff);
        }
    }]);

    return Lazerline;
}();

Lazerline.DIM_X = 500;
Lazerline.DIM_Y = 500;
Lazerline.FPS = 10;

module.exports = Lazerline;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SCL = 5;

var Player = function () {
    function Player(x, y, dx, dy, c, isComp, dir, name) {
        _classCallCheck(this, Player);

        this.trail = [];
        this.strail = [];
        this.isComp = isComp;
        this.location = [x, y];
        this.velocity = [dx, dy];
        this.dir = dir;
        this.color = c;
        this.alive = true;
        this.name = name;
        // this.snd = new Audio("turn.wav"); 
    }

    _createClass(Player, [{
        key: "draw",
        value: function draw(ctx) {

            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 3;
            ctx.fillRect(this.trail[this.trail.length - 1][0] * SCL, this.trail[this.trail.length - 1][1] * SCL, SCL, SCL);
        }
    }, {
        key: "update",
        value: function update() {
            this.location = [this.location[0] + this.velocity[0], this.location[1] + this.velocity[1]];
            this.trail.push([this.location[0], this.location[1]]);
            this.strail.push(this.location[0] + ',' + this.location[1]);
            switch (this.velocity[0]) {
                case 1:
                    this.dir = ["right", [1, 0]];
                    return;
                case -1:
                    this.dir = ["left", [-1, 0]];
                    return;
            }
            switch (this.velocity[1]) {
                case 1:
                    this.dir = ["down", [0, 1]];
                    return;
                case -1:
                    this.dir = ["up", [0, -1]];
                    return;
            }
        }
    }, {
        key: "changeVel",
        value: function changeVel(change) {
            this.velocity = [change[0], change[1]];
            // this.snd.play(); 
        }
    }, {
        key: "collidesWith",
        value: function collidesWith(trail) {
            for (var i = 0; i < trail.length - 1; i++) {
                if (trail[i][0] === this.location[0] && trail[i][1] === this.location[1]) {
                    return true;
                }
            }
            return false;
        }
    }, {
        key: "collidesWith2",
        value: function collidesWith2(x, y, others) {
            var coords = x + ',' + y;
            var otherTrails = {};
            // this.strail.forEach(pos => {
            //     if (pos !== coords) {
            //         otherTrails[pos] = false;
            //     }
            // });
            // this.strail.map(pos => {
            //     // debugger;
            //     if (pos !== coords) otherTrails[pos] = true; 
            // });
            // debugger;
            others.forEach(function (other) {
                other.strail.map(function (pos) {
                    otherTrails[pos] = true;
                });
            });

            // debugger;

            if (otherTrails[coords]) return true;
            return false;
        }

        // collided(x, y, allTrails){
        //     //x and y is current location
        //     let coords = x + ',' + y; 
        //     let arr = Object.entries(allTrails).slice(0,-1);
        //     let trails; 
        //     // let trails = allTrails;
        //     arr.map(z => {
        //         trails[z] = true;
        //     });
        //     // debugger;
        //     // let trails = allTrails.slice(0,-1); 
        //     // delete trails[coords]
        //     if (trails[coords]) return true; 
        //     return false;
        // }

    }, {
        key: "checkBounds",
        value: function checkBounds() {
            if (this.location[0] <= 0 || this.location[0] >= 100 || this.location[1] <= 0 || this.location[1] >= 100) {
                return true;
            }
        }
    }, {
        key: "compMove",
        value: function compMove(allTrails, dif) {
            var randomMove = dif.randomMove;
            var probOfBest = dif.probOfBest;

            var advisor = this.compPingDirections(allTrails);

            var dir = this.dir[0];
            var velX = this.velocity[0];
            var velY = this.velocity[1];
            if (advisor[dir] < 5 || Math.ceil(Math.random() * randomMove) == 5) {

                if (Math.ceil(Math.random() * 100) < probOfBest) {} else {

                    advisor.best = advisor.secondBest;
                }

                var move = void 0;
                switch (advisor.best) {
                    case "right":
                        move = [1, 0];
                        break;
                    case "left":
                        move = [-1, 0];
                        break;
                    case "down":
                        move = [0, 1];
                        break;
                    case "up":
                        move = [0, -1];
                        break;
                    default:
                        move = [velX, velY];
                        break;
                }
                // computer.dir = [advisor.best, move]; 
                if (advisor.best === "right" && dir === "left" || advisor.best === "left" && dir === "right" || advisor.best === "up" && dir === "down" || advisor.best === "down" && dir === "up") {} else {

                    this.changeVel(move);
                }
            }
        }
    }, {
        key: "compPingDirections",
        value: function compPingDirections(allTrails) {
            var pong = {
                up: 0,
                down: 0,
                left: 0,
                right: 0
            };
            var x = this.location[0]; // x location
            var y = this.location[1]; // y location

            //up 
            for (var i = y - 1; i >= 0; i -= 1) {
                pong.up = y - i;
                if (this.compIsCollision(x, i, allTrails)) {
                    break;
                }
            }

            //down
            for (var _i = y + 1; _i <= 100; _i += 1) {
                pong.down = _i - y;
                if (this.compIsCollision(x, _i, allTrails)) {
                    break;
                }
            }

            //left
            for (var _i2 = x - 1; _i2 >= 0; _i2 -= 1) {
                pong.left = x - _i2;
                if (this.compIsCollision(_i2, y, allTrails)) {
                    break;
                }
            }

            //right
            for (var _i3 = x + 1; _i3 <= 100; _i3 += 1) {
                pong.right = _i3 - x;
                if (this.compIsCollision(_i3, y, allTrails)) {
                    break;
                }
            }

            var largest = { key: null, value: 0 };
            var second = { key: null, value: 0 };
            var others = [];
            for (var dir in pong) {
                if (pong[dir] > largest.value) {
                    largest.key = dir;
                    largest.value = pong[dir];
                } else {
                    if (pong[dir] > second.value) {
                        second.key = dir;
                        second.value = pong[dir];
                    } else if (pong[dir] == second.value) {
                        second.key = null;
                        second.value = 0;
                    }
                }
            }
            pong.best = largest.key;

            pong.secondBest = second.key;
            return pong;
        }
    }, {
        key: "compIsCollision",
        value: function compIsCollision(x, y, allTrails) {
            var coords = x + ',' + y;

            var trails = allTrails;

            if (trails[coords] || x < 3 || x > 100 - 3 || y < 3 || y > 100 - 3) {
                return true;
            }
            return false;
        }
    }]);

    return Player;
}();

module.exports = Player;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Grid = function () {
    function Grid() {
        _classCallCheck(this, Grid);
    }

    _createClass(Grid, [{
        key: "draw",
        value: function draw(ctx) {

            ctx.beginPath();
            var bw = 500;
            var bh = 500;
            var p = 0;
            var cw = bw + p * 2 + 1;
            var ch = bh + p * 2 + 1;

            for (var x = 0; x <= bw; x += 25) {
                ctx.moveTo(0.5 + x + p, p);
                ctx.lineTo(0.5 + x + p, bh + p);
            }

            for (var _x = 0; _x <= bh; _x += 25) {
                ctx.moveTo(p, 0.5 + _x + p);
                ctx.lineTo(bw + p, 0.5 + _x + p);
            }

            ctx.shadowColor = "rgb(200,200,200)";
            ctx.shadowBlur = 10;
            ctx.strokeStyle = "rgba(0, 240, 255, 0.65)";
            ctx.stroke();
        }
    }]);

    return Grid;
}();

module.exports = Grid;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameView = function () {
  function GameView(game, ctx, settings, restart) {
    _classCallCheck(this, GameView);

    this.ctx = ctx;
    this.game = game;
    this.settings = settings;

    // this.difficulty = settings.difficulty;

    this.restart = restart;
    // this.comp = this.game.computerPlayer();
    // this.comp2 = this.game.computerPlayer();
    // this.comp3 = this.game.computerPlayer();
  }

  _createClass(GameView, [{
    key: 'botGeneration',
    value: function botGeneration(num) {
      for (var i = 0; i < num; i++) {
        this.game.computerPlayer();
      }
    }
  }, {
    key: 'setDifficulty',
    value: function setDifficulty(dif) {
      var difsetting = {};
      switch (dif) {
        case 1:
          difsetting['randomMove'] = 10;
          difsetting['probOfBest'] = 80;
          return difsetting;

        case 2:
          difsetting['randomMove'] = 25;
          difsetting['probOfBest'] = 90;
          return difsetting;
        case 3:
          difsetting['randomMove'] = 99;
          difsetting['probOfBest'] = 99;
          return difsetting;
        default:
          return;
      }
    }
  }, {
    key: 'bindKeyHandlers',
    value: function bindKeyHandlers() {
      var player = this.player;
      // const comp = this.comp;
      document.onkeydown = function (e) {
        e = e || window.event;
        //   console.log(e.keyCode);
        switch (e.which || e.keyCode) {
          // case 37:
          //     if (comp.velocity[0] !== 1) player.changeVel([-1, 0]);
          //     break;
          // case 38:
          //     if (comp.velocity[1] !== 1) player.changeVel([0, -1]);
          //     break;
          // case 39:
          //     if (comp.velocity[0] !== -1) player.changeVel([1, 0]);
          //     break;
          // case 40:
          //     if (comp.velocity[1] !== -1) player.changeVel([0, 1]);
          //     break;
          // case 65:
          case 65:
            if (player.velocity[0] !== 1) player.changeVel([-1, 0]);
            break;
          case 83:
            if (player.velocity[1] !== -1) player.changeVel([0, 1]);
            break;
          case 68:
            if (player.velocity[0] !== -1) player.changeVel([1, 0]);
            break;
          case 87:
            if (player.velocity[1] !== 1) player.changeVel([0, -1]);
            break;
          default:
            return;
        }
      };
    }
  }, {
    key: 'start',
    value: function start() {
      cancelAnimationFrame(this.animation);
      this.player = this.game.humanPlayer();
      this.botGeneration(this.settings.numOfBots);
      this.difficulty = this.setDifficulty(this.settings.difficulty);
      this.bindKeyHandlers();
      this.lastTime = 0;
      this.game.draw(this.ctx);
      this.animation = requestAnimationFrame(this.animate.bind(this));
    }
  }, {
    key: 'animate',
    value: function animate(time) {
      var timeDelta = time - this.lastTime;
      this.game.step(this.difficulty);
      // this.compMove();
      this.game.drawPlayers(this.ctx);

      this.lastTime = time;

      if (this.endGame()) {
        this.gameOver();
      } else {
        requestAnimationFrame(this.animate.bind(this));
      }
    }
  }, {
    key: 'sample',
    value: function sample(array) {
      return array[Math.floor(Math.random() * array.length)];
    }
  }, {
    key: 'endGame',
    value: function endGame() {
      if (this.game.playersLeft <= 1 || !this.player.alive) return true;

      return false;
    }
  }, {
    key: 'toggleButton',
    value: function toggleButton(buttons, setting) {
      var _this = this;

      var _loop = function _loop(i) {
        var button = buttons[i];
        var others = [];
        [0, 1, 2].forEach(function (num) {
          if (num != i) others.push(num);
        });

        button.addEventListener('click', function () {
          _this.settings[setting] = button.innerHTML;
          // debugger;
          button.classList.add('active');
          others.forEach(function (btnNum) {
            buttons[btnNum].classList.remove('active');
          });
        });
      };

      for (var i = 0; i < buttons.length; i++) {
        _loop(i);
      }
    }
  }, {
    key: 'gameOver',
    value: function gameOver() {
      var _this2 = this;

      var victor = void 0;
      this.game.players.forEach(function (object) {
        // debugger;
        if (object.alive) victor = object.name;
      });
      // let settings = {
      //     numOfBots: 1,
      //     difficulty: 1
      // };

      var restartMenu = document.getElementsByClassName('settings-form2');
      var winner = document.getElementById('winner');
      var color = victor.color;
      winner.innerHTML = victor;
      // winner.style.color = color;
      // winner.style.textShadow = `0 0 3px #fff, 0 0 8px #fff, 0 0 15px ${color}, 0 0 18px ${color}`;

      var botButtons = document.getElementsByClassName('botbutton');
      var difButtons = document.getElementsByClassName('difbutton');
      this.toggleButton(botButtons, 'numOfBots');
      this.toggleButton(difButtons, 'difficulty');

      restartMenu = restartMenu[0];
      restartMenu.classList.add('sf2-appear');

      var restartButton = document.getElementById('restart-game');
      restartButton.addEventListener('click', function () {
        _this2.settings['numOfBots'] = parseInt(_this2.settings['numOfBots']);
        _this2.settings['difficulty'] = parseInt(_this2.settings['difficulty']);
        restartMenu.classList.remove('sf2-appear');
        _this2.game = _this2.restart();
        _this2.settings = _this2.settings;
        _this2.start();
      });
    }
  }]);

  return GameView;
}();

module.exports = GameView;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
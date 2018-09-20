// 这是我们的玩家要躲避的敌人 
var Enemy = function(x, y,speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多

    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
  this.sprite = 'images/enemy-bug.png'
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
  this.x += dt * this.speed;
  if (this.x > 505) {
    this.x = 0;
  };
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
var Player = function() {
  this.x = 200;
  this.y = 392;
  this.sprite = 'images/char-boy.png'
};

Player.prototype.update = function () {
  this.checkCollisions();
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (allowedKeys) {
  if (allowedKeys === 'left' && this.x > 10) {
    this.x = this.x -101;
  };
  if (allowedKeys === 'right' && this.x < 400) {
    this.x = this.x += 101;
  };
  if (allowedKeys === 'up' && this.y >10) {
    this.y = this.y - 83;
    if (this.y < 50) {
      this.reset();
      alert('YOU WIN!')
    };
  };
  if (allowedKeys === 'down' && this.y < 400) {
    this.y = this.y + 83
  }
  
};
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
Player.prototype.checkCollisions = function() {
  for (var i = 0; i < allEnemies.length; i++) {
    if (allEnemies[i].x + 40 > this.x && this.x + 40 > allEnemies[i].x
      && allEnemies[i].y + 50 > this.y && this.y + 50 > allEnemies[i].y) {
      this.reset();
    };
  };
};

Player.prototype.reset = function() {
  this.x = 200;
  this.y = 392;
};

// 现在实例化你的所有对象
var enemy1 = new Enemy(0, 60, 100);
var enemy2 = new Enemy(0, 143, 200);
var enemy3 = new Enemy(0, 230, 300);

var allEnemies = [enemy1, enemy2, enemy3]; // 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
var player = new Player();// 把玩家对象放进一个叫 player 的变量里面


// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

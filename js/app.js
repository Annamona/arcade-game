// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.init();
};
Enemy.prototype.init = function() {
    this.x = -83;
    this.y = Math.round(Math.random() * 2) + 1;
    this.speed = Math.round(Math.random() * 4) + 2
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed;
    if (this.x > 5 * 83) {
        this.init();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y * 83);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-princess-girl.png';
    this.initLocation();
    this.lifes = 5;
    this.score = 0;
};

Player.prototype.initLocation = function() {
  this.x = 2;
  this.y = 5;
}

Player.prototype.update = function() {
    if (this.y === 0)  {
      this.score+=10;
      this.initLocation();
    }
};

function drawScore() {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 400, 40);
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+player.score +" --- Lifes: " + player.lifes , 8, 20);
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
    drawScore();
};


Player.prototype.handleInput = function(tasto) {
    if (tasto === "up") {
        this.y--;
    }
    if (tasto === "down") {
        this.y++;
    }
    if (tasto === "right") {
        this.x++;
    }
    if (tasto === "left") {
        this.x--;
    }
    if (this.x < 0)
        this.x = 0;
    if (this.x > 4)
        this.x = 4;
    if (this.y < 0)
        this.y = 0;
    if (this.y > 5)
        this.y = 5;
};

var finalScore= function(score){
  alert("Your final score is: " + score +"\n Press OK to play again.");
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
var checkCollisions = function() {
    for (i = 0; i < allEnemies.length; i++) {
        var enemy = allEnemies[i];
        var collides = (!(
                (enemy.x +83< player.x*83) ||
            (enemy.x > (player.x *83)+83)) && (enemy.y == player.y));
        if (collides) {
            player.initLocation();
            player.lifes--;
            break;
        }
    }
    if (player.lifes === 0) {
      finalScore(player.score);
      player = new Player();
    }
};

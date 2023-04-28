var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;

function keyup(event) {
	var player = document.getElementById('player');
	if (event.keyCode == 37) {
		leftPressed = false;
		lastPressed = 'left';
	}
	if (event.keyCode == 39) {
		rightPressed = false;
		lastPressed = 'right';
	}
	if (event.keyCode == 38) {
		upPressed = false;
		lastPressed = 'up';
	}
	if (event.keyCode == 40) {
		downPressed = false;
		lastPressed = 'down';
	}

	player.className = 'character stand ' + lastPressed;
}


function move() {
	var player = document.getElementById('player');
	var positionLeft = player.offsetLeft;
	var positionTop = player.offsetTop;
	if (downPressed) {
		var newTop = positionTop+1;

		var element = document.elementFromPoint(player.offsetLeft, newTop+32);
		if (element.classList.contains('sky') == false) {
			player.style.top = newTop + 'px';	
		}

		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = 'character walk down';
			}
		}
	}
	if (upPressed) {
		var newTop = positionTop-1;

		var element = document.elementFromPoint(player.offsetLeft, newTop);
		if (element.classList.contains('sky') == false) {
			player.style.top = newTop + 'px';	
		}
		
		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = 'character walk up';
			}
		}
	}
	if (leftPressed) {
		var newLeft = positionLeft-1;

		var element = document.elementFromPoint(newLeft, player.offsetTop);
		if (element.classList.contains('sky') == false) {
			player.style.left = newLeft + 'px';	
		}


		player.className = 'character walk left';
	}
	if (rightPressed) {
		var newLeft = positionLeft+1;
		
		var element = document.elementFromPoint(newLeft+32, player.offsetTop);
		if (element.classList.contains('sky') == false) {
			player.style.left = newLeft + 'px';		
		}

		player.className = 'character walk right';
	}

}


function keydown(event) {
	if (event.keyCode == 37) {
		leftPressed = true;
	}
	if (event.keyCode == 39) {
		rightPressed = true;
	}
	if (event.keyCode == 38) {
		upPressed = true;
	}
	if (event.keyCode == 40) {
		downPressed = true;
	}
}

/*Start button dissapears when clicking it */
function myLoadFunction() {
	timeout = setInterval(move, 10);
	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);
}
function removeStart() {
	var start = document.querySelector('.start');
  start.addEventListener('click', function() {
    start.parentNode.removeChild(start);
	//Starting alien animation after clicking start button 
	var alien = document.getElementById('alien');
    alien.classList.add('alien-move');
    timeout = setInterval(move, 6);
  });
  document.addEventListener('keydown', keydown);
  document.addEventListener('keyup', keyup);
}
//Bomb falling
function createBomb() {
	var bomb = document.createElement('div');
	bomb.classList.add('bomb');
	document.body.appendChild(bomb);
	var alien = document.getElementById('alien');
	var alienPosition = alien.getBoundingClientRect();
	bomb.style.left = (alienPosition.left + alienPosition.width / 2) + 'px';
	bomb.style.top = (alienPosition.top + alienPosition.height) + 'px';
	var animateBomb = setInterval(function() {
	  var bombRect = bomb.getBoundingClientRect();
	  if (bombRect.bottom >= window.innerHeight) {
		clearInterval(animateBomb);
		bomb.parentNode.removeChild(bomb);
	  }
	}, 20);
  }
  
  function alienAnimation() {
	createBomb();
	animateBombs();
  }
  
  var alien = document.getElementById('alien');
  alien.addEventListener('animationiteration', alienAnimation);  
document.addEventListener('DOMContentLoaded', myLoadFunction);
var INTLOGIC = (function() {
	var arrayX = [];
	var arrayO = [];
	var turn = 'X';
	var playerWon = false;
	var turnCountX = 0;
	var turnCountO = 0;
	var draw = false;

		function checkWinningCondition(player, playerArray) {
			var winningArray = [
				[1,2,3],
				[4,5,6],
				[7,8,9],
				[1,4,7],
				[2,5,8],
				[3,6,9],
				[1,5,9],
				[3,5,7]
			];

			for (var i=0, l=winningArray.length; i<l; i++) {
				var currentArray = winningArray[i];
				var elementsContained = 0;
				//console.log(currentArray);
				var checkedArray = playerArray;

				for (var k=0, m=currentArray.length; k<m; k++) {

/*
					if (player === 'X') {
						checkedArray = arrayX;
					} else {
						checkedArray = arrayO;
					}
*/
						//console.log(currentArray[k]);
						//console.log("ArrayX: " + arrayX);

						if (checkedArray.indexOf(currentArray[k]) > -1) {

							//console.log("element containment: " + checkedArray.indexOf(currentArray[k]));
							elementsContained++;
						}
						//console.log("contained elements: " +elementsContained);
						console.log(elementsContained);
						if (elementsContained === 3) {

							return true;
						}
				}
			}
			return false;
		}

		function checkEmpty(place) {
			if (arrayX.indexOf(place) == -1 && arrayO.indexOf(place) == -1) {
				return true;
			}
			else {
				return false;
			}
		}

		function checkDraw() {
			if(turnCountX + turnCountO >= 9 && !playerWon) {
				draw = true;
				return true;
			}
			else {
				draw = false;
				return false;
			}
		}

		function check(place){

			if ((checkEmpty(place) && !playerWon) && !draw) {
				if (turn === 'X') {
					arrayX.push(place)
					SCREEN.drawScreen(place, '<span class="x">X</span>');
					turnCountX ++;

					if (checkWinningCondition('X', arrayX)) {
						document.getElementById("winning").innerHTML = turn + " won!<br>";
						playerWon = true;
					} else if (checkDraw()) {
						alert("It's a draw.")
					}	else {
						turn = 'O';
						if (BOARD.checkGameAI()) {
							console.log("Computer controlls O");
							AI.makeMove();
						}
					}


				}
				else {
					arrayO.push(place)
					SCREEN.drawScreen(place, '<span class="o">O</span>');
					turnCountO ++;

					if (checkWinningCondition('O', arrayO)) {
						alert(turn + " won!");
						playerWon = true;
					}
					turn = 'X';
				}

				console.log("It's " + turnCountX + turnCountO + " turn.")
			}



		}

		function reset() {
			arrayX = [];
			arrayO = [];
			turn = 'X';
			playerWon = false;
			turnCountX = 0;
			turnCountO = 0;
			draw = false;
		}
		function returnTurnCountO() {
			return turnCountO;
		}

		function returnTurnCountX() {
			return turnCountX;
		}


		function returnArrayX() {
			return arrayX;
		}

		function returnArrayO() {
			return arrayO;
		}

		function returnTurn() {
			return turn;
		}

		function returnPlayerWon() {
			return playerWon;
		}


	return {
		check : check,
		reset : reset,
		returnTurnCountX : returnTurnCountX,
		returnTurnCountO : returnTurnCountO,
		returnArrayX : returnArrayX,
		returnArrayO : returnArrayO,
		checkEmpty : checkEmpty,
		checkWinningCondition : checkWinningCondition,
		returnTurn : returnTurn,
		returnPlayerWon : returnPlayerWon
	}

})();

var SCREEN = (function() {
	return {
		drawScreen : function(place, player) {
			document.getElementById(place).innerHTML = player;
		},
		reset : function() {
			document.getElementById("winning").innerHTML = "";
			for (i=1; i <= 9; i++) {
				document.getElementById(i).innerHTML = '&nbsp';
			}

		}

	}

})();

var BOARD = (function() {
	var gameAI = false;

	 function reset() {

		INTLOGIC.reset();
		SCREEN.reset();

	};
	function setgameAI() {

		gameAI = true;
		console.log('game against AI');
		reset();

	};
	function setgameplayer() {

		gameAI = false;
		console.log('game against player');
		reset();

	};

	function checkGameAI() {
		return gameAI;
	}



	return {
		reset : reset,
		setgameAI : setgameAI,
		setgameplayer : setgameplayer,
		checkGameAI : checkGameAI

	}
})();

var AI = function() {
	var moved;

	function makeMove() {
		moved = false;

		//If X makes the first move in the middle
		if (INTLOGIC.returnTurnCountO() === 0
				&& JSON.stringify(INTLOGIC.returnArrayX()) === JSON.stringify([5])) {

			INTLOGIC.check(1);
			console.log("Time to move to the 1 position");

			moved = true;

		}

		//If X makes the first move Not in the middle
		if (INTLOGIC.returnTurnCountO() === 0
				&& JSON.stringify(INTLOGIC.returnArrayX()) !== JSON.stringify([5])) {

			INTLOGIC.check(5);
			console.log("Time to move to the 1 position");

			moved = true;

		}

		//If X makes the second move in the 9th position
		else if (moved === false && INTLOGIC.returnTurnCountO() === 1
				&& JSON.stringify(INTLOGIC.returnArrayX()) === JSON.stringify([5, 9])) {
					INTLOGIC.check(7);
					console.log("checking for the X move to 5 and 9");
					moved = true;
		}

		if (moved === false && INTLOGIC.returnTurnCountO() >= 2) {
			checkWinNextMove(INTLOGIC.returnArrayO());
			console.log("checking for the winning move");
		}

		if (moved === false && INTLOGIC.returnTurnCountX() >= 2) {
			checkLoseNextMove(INTLOGIC.returnArrayX());
			console.log("checking for the loosing move");
		}


		//console.log("Time to make a move");

		//console.log(INTLOGIC.returnTurnCountO() + INTLOGIC.returnArrayX())



		if (!moved) {
			console.log('checking for a random number');
			makeRandomMove();
		}

}

	function checkWinNextMove(playerArray) {
		var arrayTemp;
		for (var i = 1; i <= 9; i++) {
			arrayTemp = playerArray.slice(0);
			if (INTLOGIC.checkEmpty(i)) {
				arrayTemp.push(i);
				console.log(arrayTemp);
				console.log(playerArray);
				console.log(INTLOGIC.checkWinningCondition('X', arrayTemp));
				if (INTLOGIC.checkWinningCondition('X', arrayTemp)) {
					INTLOGIC.check(i);
					moved = true;
				}
			}

		}
	}

	function checkLoseNextMove(playerArray) {
		var arrayTemp;
		for (var i = 1; i <= 9; i++) {
			arrayTemp = playerArray.slice(0);
			if (INTLOGIC.checkEmpty(i)) {
				arrayTemp.push(i);
				console.log(arrayTemp);
				console.log(playerArray);
				console.log(INTLOGIC.checkWinningCondition('O', arrayTemp));
				if (INTLOGIC.checkWinningCondition('O', arrayTemp)) {
					INTLOGIC.check(i);
					moved = true;
				}
			}

		}
	}

	function randomPosition() {
		var randomPostion = Math.floor(Math.random() * 10);

		while (randomPostion === 0) {
			randomPostion = Math.floor(Math.random() * 10);
		}

		return randomPostion;
	}

	function makeRandomMove() {

		console.log("making a randoom move");
		var randomMoveTemp = randomPosition();

		while (!INTLOGIC.checkEmpty(randomMoveTemp)) {
			console.log(randomMoveTemp);
			randomMoveTemp = randomPosition();
			console.log(randomMoveTemp);
			alert(randomMoveTemp);
		}



		INTLOGIC.check(randomMoveTemp);
		moved = true;

	}

	return {
		makeMove : makeMove
	}

}();



/*
console.log(JSON.stringify(arrayX));
console.log(JSON.stringify(winningArray[i]));

for (var i=0; i < winningArray.length; i++) {
	if (JSON.stringify(arrayX.sort()) == JSON.stringify(winningArray[i])) {
		console.log(JSON.stringify(arrayX));
		console.log(JSON.stringify(winningArray[i]));
		alert("game over. X won");
		return true;
	}

}



*/

		/*
		for (var k=0; i < winningArray[i]; k++) {

		}
		*/

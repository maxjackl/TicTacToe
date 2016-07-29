var INTLOGIC = (function() {
	var arrayX = [];
	var arrayO = [];
	var turn = 'X';
	var playerWon = false;
	var turnCountX = 0;
	var turnCountO = 0;

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

		function check(place){
			if (checkEmpty(place) && !playerWon) {
				if (turn === 'X') {
					arrayX.push(place)
					SCREEN.drawScreen(place, 'X');
					turnCountX ++;

					if (checkWinningCondition('X', arrayX)) {
						alert(turn + " won!");
						playerWon = true;
					}


					turn = 'O';
					if (BOARD.checkGameAI()) {
						console.log("Computer controlls O");
						AI.makeMove();
					}
				}
				else {
					arrayO.push(place)
					SCREEN.drawScreen(place, 'O');
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


	return {
		check : check,
		reset : reset,
		returnTurnCountX : returnTurnCountX,
		returnTurnCountO : returnTurnCountO,
		returnArrayX : returnArrayX,
		returnArrayO : returnArrayO,
		checkEmpty : checkEmpty,
		checkWinningCondition : checkWinningCondition
	}

})();

var SCREEN = (function() {
	return {
		drawScreen : function(place, player) {
			document.getElementById(place).innerHTML = player;
		},
		reset : function() {
			for (i=1; i <= 9; i++) {
				document.getElementById(i).innerHTML = '_';
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


	function makeMove() {

		if (INTLOGIC.returnTurnCountO() > 2) {
			checkWinNextMove(INTLOGIC.returnArrayO());
		}


		console.log("Time to make a move");

		console.log(INTLOGIC.returnTurnCountO() + INTLOGIC.returnArrayX())
		if (INTLOGIC.returnTurnCountO() === 0 && JSON.stringify(INTLOGIC.returnArrayX()) === JSON.stringify([5])) {

			INTLOGIC.check(1);
console.log("Time to make a specific move");
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
				console.log(INTLOGIC.checkWinningCondition('O', arrayTemp));
				if (INTLOGIC.checkWinningCondition('O', arrayTemp)) {
					INTLOGIC.check(i);
				}
			}

		}
		/*
		for(every possible move)  //iterate through digits from 1 to 9
		check whether possible move
		if added would O winn INTLOGIC.checkWinningCondition */
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

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
						playerWon = true;
						SCREEN.displayWinner(turn);
					} else if (checkDraw()) {
						SCREEN.displayWinner("draw");
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
						playerWon = true;
						SCREEN.displayWinner(turn);
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

var INTLOGIC = (function() {
	var arrayX = [];
	var arrayO = [];
	var turn = 'X';
	var playerWon = false;




		function checkWinningCondition(player) {
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
				console.log(currentArray);
				var checkedArray;

				for (var k=0, m=currentArray.length; k<m; k++) {

					if (player === 'X') {
						checkedArray = arrayX;
					} else {
						checkedArray = arrayO;
					}

						//console.log(currentArray[k]);
						console.log("ArrayX: " + arrayX);

						if (checkedArray.indexOf(currentArray[k]) > -1) {

							console.log("element containment: " + checkedArray.indexOf(currentArray[k]));
							elementsContained++;
						}
						console.log("contained elements: " +elementsContained);
						if (elementsContained === 3) {
							alert(player + " won!")
							playerWon = true;
						}


				}


			}
		}

		function checkEmpty(place) {
			if (arrayO.indexOf(place) == -1 && arrayO.indexOf(place) == -1) {
				return true;
			}
			else {
				return false;
			}
		}

	return {
		check : function(place){
			if (checkEmpty(place) && !playerWon) {
				if (turn === 'X') {
					arrayX.push(place)
					SCREEN.drawScreen(place, 'X');
					checkWinningCondition('X');
					turn = 'O';
				}
				else {
					arrayO.push(place)
					SCREEN.drawScreen(place, 'O');
					turn = 'X';
					checkWinningCondition('O');
				}
			}
		},
		reset : function() {
			arrayX = [];
			arrayO = [];
			turn = 'X';
			playerWon = false;
		}
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

		gameAI : true;
		console.log('game against AI');
		reset();

	};
	function setgameplayer() {

		gameAI : false;
		console.log('game against player');
		reset();

	};

	return {
		
		reset : reset,
		setgameAI : setgameAI,
		setgameplayer : setgameplayer

	}
})();





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

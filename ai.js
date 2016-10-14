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
		return true;
	}

}



*/

		/*
		for (var k=0; i < winningArray[i]; k++) {

		}
		*/

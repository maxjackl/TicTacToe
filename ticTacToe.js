var arrayX = [];
var arrayY = [];
var turn = 'X';

function check(place){
	if (checkEmpty(place)) {
		if (turn === 'X') {
			arrayX.push(place)
			drawScreen(place, 'X');
			checkWinningCondition('X');
			turn = 'O';
		}
		else {
			arrayY.push(place)
			drawScreen(place, 'O');
			turn = 'X';
			checkWinningCondition('Y');
		}
	}
}

function drawScreen(place, player) {
	document.getElementById(place).innerHTML = player;
}

function checkEmpty(place) {
	if (arrayX.indexOf(place) == -1 && arrayY.indexOf(place) == -1) {
		return true;
	}
	else {
		return false;
	}
}

function checkWinningCondition(player) {
	var winningArray = [
		[1,2,3],
		[4,5,6]
	];

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
}



/*




*/

		/*
		for (var k=0; i < winningArray[i]; k++) {

		}
		*/

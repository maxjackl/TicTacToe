var SCREEN = (function() {

	function drawScreen(place, player) {
		document.getElementById(place).innerHTML = player;
	};
	function reset() {
		document.getElementById("winning").innerHTML = "";
		for (i=1; i <= 9; i++) {
			document.getElementById(i).innerHTML = '&nbsp';
		};

	};

	function displayWinner(winner) {
		if (winner === "draw") {
			document.getElementById("winning").innerHTML = "It's a draw!<br>";
		} else {
			document.getElementById("winning").innerHTML = winner + " won!<br>";
		}

	}


	return {
		drawScreen : drawScreen,
		reset : reset,
		displayWinner : displayWinner,

	}

})();

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

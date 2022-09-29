function localStorage_setitem(score) {
	localStorage.setItem("High Score", JSON.stringify(score));
}

function localStorage_getitem() {
	if (localStorage.getItem("High Score") == null) {
		var score = 0;
	} else {
		var score = JSON.parse(localStorage.getItem("High Score"));
	}
	return score;
}

function random(num) {
	return Math.floor(Math.random() * num);
}

function getRandomStyles() {
	var r = random(255);
	var g = random(255);
	var b = random(255);
	var mt = random(200);
	var ml = random(50);
	var dur = random(5) + 5;
	return `
  background-color: rgba(${r},${g},${b},0.7);
  color: rgba(${r},${g},${b},0.7); 
  box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7);
  margin: ${mt}px 0 0 ${ml}px;
  animation: float ${dur}s ease-in infinite
  `;
}

function createBalloons(num) {
	var balloonContainer = document.getElementById("balloon-container");
	for (var i = num; i > 0; i--) {
		var balloon = document.createElement("div");
		balloon.className = "balloon";
		balloon.style.cssText = getRandomStyles();
		balloonContainer.append(balloon);
	}
}

var currScore = 0;
var highScore = localStorage_getitem();
function hid(val) {
	val.style.display = "none";
	currScore++;
	$("#yourScore").html(currScore);
}

var setT = setInterval(() => {
	var randBird = random(9);
	var outPut =
		"<div class='bird-container bird-container-" +
		randBird +
		"' onclick='hid(this)'><div class='bird bird-" +
		randBird +
		"' ></div></div>";

	$("#mainContainer").append(outPut);

	var timeL = parseInt($("#timeLeft").html());
	timeL--;
	$("#timeLeft").html(timeL);

	if (timeL == 0) {
		if (currScore > highScore) {
			localStorage_setitem(currScore);
			var cong = $("<h3></h3>").text("New High Score,  Congratulations !!!");
			$("#scoreBoard").append(cong);

			$("#mainContainer").css("z-index", "-1");
			createBalloons(100);
		}

		$(".bird-container").css("display", "none");
		clearInterval(setT);
		// $("#timeLeft").html("30");
		var timeUp = $("<h3></h3>").text("Times Up, Well Played !!!");
		$("#timer").append(timeUp);
	}
}, 1000);

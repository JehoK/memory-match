var gameCards = document.querySelector("#gameCards");
gameCards.addEventListener("click", handleClick);
var modal = document.querySelector(".modal-overlay");

var firstCardClicked;
var secondCardClicked;
var firstCardClasses;
var secondCardClasses;

var maxMatch = 3;
var matches = 0;

var attempts = 0;
var gamesPlayed = 0;

var gamesPlayedE = document.querySelector(".gamesPlayed");
var attemptsE = document.querySelector(".attempts");
var accuracy = document.querySelector(".accuracy");

var reset = document.querySelector("#reset");
reset.addEventListener("click", resetGame);

function handleClick (event) {
  if (event.target.className.indexOf("card-back") === -1) {
    return;
  }
  event.target.className += " hidden";

  if(!firstCardClicked) {
    firstCardClicked = event.target;
    firstCardClasses = firstCardClicked.previousElementSibling.className;

  }else {
    secondCardClicked = event.target;
    secondCardClasses = secondCardClicked.previousElementSibling.className;
    gameCards.removeEventListener("click", handleClick);
    if(firstCardClasses === secondCardClasses) {
      matches++;
      attempts++
      console.log(attempts);
      gameCards.addEventListener("click", handleClick);
      firstCardClicked = null;
      secondCardClicked = null;
      if(matches === maxMatch){
        console.log("you win!");
        modal.classList.remove("hidden");
      }
    }else {
      attempts++
      console.log(attempts);
      setTimeout(function () {
        firstCardClicked.classList.remove("hidden");
        secondCardClicked.classList.remove("hidden");
        firstCardClicked = null;
        secondCardClicked = null;
        gameCards.addEventListener("click", handleClick);
      }, 1500)
    }
  }
  displayStats();
}
function displayStats () {
    gamesPlayedE.textContent = gamesPlayed;
    attemptsE.textContent = attempts;
    accuracy.textContent = calculateAccuracy(attempts, matches);
  }

function calculateAccuracy (attempts, matches) {
  if(!attempts){
    return "0%";
  }else {
    var per = Math.trunc((matches / attempts) * 100);
    return per + "%";
  }
}

function resetGame () {
  attempts = 0;
  matches = 0;
  gamesPlayed++;
  gamesPlayedE.textContent = gamesPlayed;
  attemptsE.textContent = attempts;
  accuracy.textContent = calculateAccuracy();
  resetCards();
  shuffle();
  modal.classList.add("hidden");
}


function resetCards () {
  var hiddenCards = document.querySelectorAll(".card-back");

  for (let i = 0; i < hiddenCards.length; i++) {
    hiddenCards[i].classList.remove("hidden");
  }
}

var logos = [
  "js-logo",
  "css-logo",
  "docker-logo",
  "gitHub-logo",
  "html-logo",
  "mysql-logo",
  "node-logo",
  "php-logo",
  "react-logo",
  "js-logo",
  "css-logo",
  "docker-logo",
  "gitHub-logo",
  "html-logo",
  "mysql-logo",
  "node-logo",
  "php-logo",
  "react-logo"
]

function shuffle () {
  var cardFront = document.querySelectorAll(".card-front");
  for(let i=0; i<logos.length; i++) {
    var random = Math.floor(Math.random() * logos.length) + 1;
    var holder = logos[i];
    logos[i] = logos[random];
    logos[random] = holder;
  }
  for (let i=0; i<cardFront.length; i++) {
    cardFront[i].className = "card-front " + logos[i];
  }
}

function create () {
  for(let i=0; i<logos.length; i++){
    if(i%6 === 0) {
      var gameCrow = document.createElement("div");
      gameCrow.className = "game-c-row";
    }
    var cardDiv = document.createElement("div");
    cardDiv.className = "card";
    gameCrow.append(cardDiv);

    var cardFdiv = document.createElement("div");
    cardFdiv.className = "card-front " + logos[i];
    cardDiv.append(cardFdiv);

    var cardBdiv = document.createElement("div");
    cardBdiv.className = "card-back";
    cardDiv.append(cardBdiv);

    gameCards.append(gameCrow);
  }
}
create();

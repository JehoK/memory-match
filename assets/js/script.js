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
  if(attempts === 0){
    return "0%";
  }else {
    var per = Math.trunc((matches / attempts) * 100);
    return per + "%";
  }
}

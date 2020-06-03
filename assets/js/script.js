var gameCards = document.querySelector("#gameCards");
gameCards.addEventListener("click", handleClick);

var firstCardClicked;
var secondCardClicked;
var firstCardClasses;
var secondCardClasses;

var maxMatch = 3;
var matches = 0;

var modal = document.querySelector(".modal-overlay");

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
      gameCards.addEventListener("click", handleClick);
      firstCardClicked = null;
      secondCardClicked = null;
      console.log(matches);
      if(matches === maxMatch){
        console.log("you win!");
        modal.classList.remove("hidden");
      }
    }else {
      console.log("do not match")
      setTimeout(function () {
        firstCardClicked.classList.remove("hidden");
        secondCardClicked.classList.remove("hidden");
        firstCardClicked = null;
        secondCardClicked = null;
        gameCards.addEventListener("click", handleClick);
      }, 1500)
    }
  }
}

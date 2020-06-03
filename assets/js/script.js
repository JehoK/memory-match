var gameCards = document.querySelector("#gameCards");
gameCards.addEventListener("click", handleClick);

var firstCardClicked;
var secondCardClicked;
var firstCardClasses;
var secondCardClasses;

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
      console.log("match");
      gameCards.addEventListener("click", handleClick);
      firstCardClicked = null;
      secondCardClicked = null;
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

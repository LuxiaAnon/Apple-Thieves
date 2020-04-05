const theGame = new TheGame();

//get the elements to display
const score = document.getElementById('score');
const time = document.getElementById('time');
const background = document.getElementById("background");

function play(){
    theGame.startGame();
    background.classList.remove("background-home");
    background.classList.add("background-game");
}

//let's awake the start button

const startButton = document.getElementsByClassName("start-button");
console.log(startButton)
startButton.addEventListener('click',play)
    

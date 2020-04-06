const theGame = new TheGame();

//get the elements to display
const score = document.getElementById('score');
const time = document.getElementById('time');
const background = document.getElementById("background");
const character = document.getElementById("character")
const homeScreen = document.getElementById("home-screen")
const gameScreen = document.getElementById("game-screen")

function play(){
    theGame.startGame();
    background.classList.remove("background-home");
    background.classList.add("background-game");
    console.log(homeScreen)
    homeScreen.style.visibility="hidden";
    gameScreen.style.visibility="visible";
    score.innerText=theGame.score;
    time.innerText=theGame.timeLeft+" sec";    
}

//let's awake the start button

const startButton = document.querySelector(".start-button");
startButton.addEventListener('click',play)
    

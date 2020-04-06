const theGame = new TheGame();

//get the elements to display
const score = document.getElementById('score');
const time = document.getElementById('time');
const background = document.getElementById("background");
const character = document.getElementById("character")
const homeScreen = document.getElementById("home-screen")
const gameScreen = document.getElementById("game-screen")
const appleOne = document.querySelector(".apple.one");
const appleTwo = document.querySelector(".apple.two");
const appleThree = document.querySelector(".apple.three");
const appleFour = document.querySelector(".apple.four");
const apples = document.querySelectorAll(".apple");

function play(){
    background.classList.remove("background-home");
    background.classList.add("background-game");
    homeScreen.style.visibility="hidden";
    gameScreen.style.visibility="visible";
    score.innerText=theGame.score;
    printTime();    
}

function printTime(){
    time.innerText=`${theGame.timeLeft} sec`
}

//let's awake the start button

const startButton = document.querySelector(".start-button");
startButton.addEventListener('click', ()=>{
    play()
    theGame.startGame(printTime)
})

//moving the character

//collision detection 


// const keyState={};
// let cancel=null;

// cancel




    

const theGame = new TheGame();

//get the elements to display
const score = document.getElementById('score');
const time = document.getElementById('time');
const background = document.getElementById("background");
let character = document.getElementById("character")
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
    gameLoop ();   
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

//looping the game !

function gameLoop (){
    movingCharacter () ;
  
}

//moving the character
function movingCharacter (){
    window.onkeydown =function(e){

    if (e.code==="ArrowRight") {
        console.log("I am moving right")
        character.x = character.x + 5;
      } else if (e.code==="ArrowLeft") {
        console.log("I am moving left")
        character.x = character.x - 5;
      }
    }

    setInterval(()=>{
        character.style.transform=`translateX(${character.x}px)`
    },10
    )
}

//apples fall

// function apples_fall(apple){
//     apple_curre
// }

//collision detection 



function collisionDetection (player, object){

player = player.getBoundingClientRect()
object = object.getBoundingClientRect()

if (player.x < object.x + object.width &&
    player.x + player.width > object.x &&
    player.y < object.y + object.height &&
    player.y + player.height > object.y) {
     console.log("Colisiooooon")
 }
}





    

const theGame = new TheGame();

//get the elements to display
const introMusic = document.querySelector("#intromusic")
const score = document.getElementById('score');
const time = document.getElementById('time');
const background = document.getElementById("background");
let character = document.getElementById("character")
let characterPosition = {x:0}
const homeScreen = document.getElementById("home-screen")
const gameScreen = document.getElementById("game-screen")
const scoreScreen = document.getElementById("score-screen")
const apples = document.querySelectorAll(".apple");
const bunnies = document.querySelectorAll(".bunny");


function play(){
    background.classList.remove("background-home");
    background.classList.add("background-game");
    homeScreen.style.visibility="hidden";
    gameScreen.style.visibility="visible";
    score.innerText=theGame.score;
    introMusic.innerHTML=" "
    printTime(); 
    movingCharacter();    
    applesFalling();
    bunniesAttacking()
}


function printTime(){
    time.innerText=`${theGame.timeLeft} sec`
}

function printScore(){
    score.innerText=theGame.score
}

//let's awake the start button

const startButton = document.querySelector(".start-button");
startButton.addEventListener('click', ()=>{
    play()
    theGame.startGame(printTime)
    setTimeout(finishGame,60000)
})


//moving the character
function movingCharacter (){
    window.onkeydown =function(e){
    if (e.code==="ArrowRight") {
        characterPosition.x = characterPosition.x + 20;
      } else if (e.code==="ArrowLeft") {
        characterPosition.x = characterPosition.x - 20;
      }
    }
    setInterval(()=>{
        character.style.transform=`translateX(${characterPosition.x}px)`
    },5
    )
}

// apples fall

function appleFalling (apple){
    let appleRect = apple.getBoundingClientRect();
    let screenLimit = document.body.getBoundingClientRect();
    console.log("falling")
    // let screenLimitWidth = screenLimit.height
    appleRect.y = appleRect.y + (makeRandomNumber(2,5));
    if (appleRect.y < (screenLimit.height-120)) {
        apple.style.transform=`translateY(${appleRect.y}px)`;  
    } else {
        apple.style.transform = `translateY(${makeRandomNumber(0,200)}px)`;
        // apple.style.transform = `translateX(${makeRandomNumber(0,screenLimit.width)}px)`
    }
    collisionDetection(apple)
};

function applesFalling (){
    for (let i = 0; i< apples.length; i++ ){
        appleFalling(apples[i])
    }
        window.requestAnimationFrame(applesFalling)
}
 
//bunnies attacking

function bunnyAttacking (bunny){
    let bunnyRect = bunny.getBoundingClientRect();
    let screenLimit = document.body.getBoundingClientRect();
    bunnyRect.y = bunnyRect.y + 2;
    if (bunnyRect.y < (screenLimit.height-195)){
    bunny.style.transform=`translateY(${bunnyRect.y}px)`;
} else{
    bunny.style.transform = `translateY(${makeRandomNumber(0,200)}px)`
}
     collisionDetection(bunny)
};

function bunniesAttacking (){
    for (let i = 0; i< bunnies.length; i++ ){
    bunnyAttacking(bunnies[i])
    }
        window.requestAnimationFrame(bunniesAttacking)
}

//collision detection 

function collisionDetection (object){

let characterRect = character.getBoundingClientRect()
let objectRect = object.getBoundingClientRect()


if (characterRect.x < objectRect.x + objectRect.width &&
    characterRect.x + characterRect.width > objectRect.x &&
    characterRect.y < objectRect.y + objectRect.height &&
    characterRect.y + characterRect.height > objectRect.y) {
     if(objectRect.width<100){
         theGame.addPoint()
         object.style.transform = `translateY(${makeRandomNumber(0,100)}px)`;
     }else{
         theGame.removePoint()
         object.style.transform = `translateY(${makeRandomNumber(0,100)}px)`

     }
 } printScore()
}
// peut etre ajouter un if avec la taille de l'objet qui tombe fonction de la taille remove point ou add point

function finishGame(){
    console.log("it is over")
    background.classList.remove("background-game");
    background.classList.add("background-score");
    gameScreen.style.visibility="hidden";  
    scoreScreen.style.visibility="visible"; 
    introMusic.innerHTML= `<audio controls autoplay style="display: none">
    <source src="./audios/title-screen.mp3" type="audio/mpeg" >
    </audio>`
    document.querySelector("h2").innerText=`You stole ${theGame.score} apples`;
 }   


// définir un aléatoire

function makeRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
  }  


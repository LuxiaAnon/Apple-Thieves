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
const appleOne = document.querySelector(".apple.one");
// const appleTwo = document.querySelector(".apple.two");
// const appleThree = document.querySelector(".apple.three");
// const appleFour = document.querySelector(".apple.four");
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
    movingCharacter ();    
    applesFalling();
    printScore();
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
    let screenLimit = document.body.getBoundingClientRect()
    appleRect.y = appleRect.y + 10;
    if (appleRect.y < (screenLimit.height-150)) {
        apple.style.transform=`translateY(${appleRect.y}px)`;  
    } else {
        apple.style.transform = "translateY(10px)"
    }
    collisionDetection(apple)
};

function applesFalling (){
    for (let i = 0; i< apples.length; i++ ){
        appleFalling(apples[i])
    }
    setTimeout(function() {
        window.requestAnimationFrame(applesFalling)
    },100)
}
 
//bunnies attacking

function bunnyAttacking (bunny){
    let bunnyRect = bunny.getBoundingClientRect();
    let screenLimit = document.body.getBoundingClientRect()
    bunnyRect.y = bunnyRect.y + 20;
    if (bunnyRect.y < (screenLimit.height-195)){
    bunny.style.transform=`translateY(${bunnyRect.y}px)`;
} else{
    bunny.style.transform = "translateY(10px)"
}

     collisionDetection(bunny)
};

function bunniesAttacking (){
    for (let i = 0; i< bunnies.length; i++ ){
    bunnyAttacking(bunnies[i])
    }
    setTimeout(function() {
        window.requestAnimationFrame(bunniesAttacking)
    },100)
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
     }else{
         theGame.removePoint()
     
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
    introMusic.innerHTML=`<audio controls autoplay style="display: none">
    <source src="./title-screen.mp3" type="audio/mpeg" > `
    document.querySelector("h2").innerText=`You stole ${theGame.score} apples`
 }   


// définir un aléatoire

    

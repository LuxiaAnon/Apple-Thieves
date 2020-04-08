const theGame = new TheGame();

//get the elements to display
const introMusic = document.querySelector("#intromusic")
const gameMusic = document.querySelector('#game-music')
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
let screenLimit = document.body.getBoundingClientRect();
let screenLimitWidth=screenLimit.width-150;
let req1;
let req2;


function play(){
    background.classList.remove("background-home");
    background.classList.remove("background-score");
    background.classList.remove("background-score2");
    background.classList.remove("background-score3");
    background.classList.add("background-game");
    homeScreen.style.visibility="hidden";
    gameScreen.style.visibility="visible";
    scoreScreen.style.visibility="hidden"; 
    score.innerText=theGame.score;
    introMusic.innerHTML=" "
    gameMusic.innerHTML=`<audio controls autoplay loop style="display: none">
    <source src="./audios/main-theme.mp3" type="audio/mpeg" >
    </audio>`;
    printTime(); 
    movingCharacter();    
    applesFalling();
    bunniesAttacking();
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

const restartButton = document.querySelector(".restart-button");
restartButton.addEventListener('click', ()=>{
    play()
    theGame.startGame(printTime)
    setTimeout(finishGame,60000)
})


//moving the character
function movingCharacter (){
    window.onkeydown =function(e){
    if (e.code==="ArrowRight") {
        if (characterPosition.x<(screenLimitWidth-100)){
        characterPosition.x = characterPosition.x + 25;
        }
      } else if (e.code==="ArrowLeft") {
        if (characterPosition.x>0){
        characterPosition.x = characterPosition.x - 25;
      }
    }
    setInterval(()=>{
        character.style.transform=`translateX(${characterPosition.x}px)`
    },1
    )
}
}
// apples fall

function appleFalling (apple){
    let appleRect = apple.getBoundingClientRect();
    console.log("falling")
    // let screenLimitWidth = screenLimit.height
    appleRect.y = appleRect.y + 2,5;
    if (appleRect.y < (screenLimit.height-120)) {
        apple.style.transform=`translateY(${appleRect.y}px)`;  
    } else {
        apple.style.transform = `translateY(${makeRandomNumber(0,50)}px)`;
        apple.style.left = `${makeRandomNumber(50,screenLimitWidth)}px`;
    }
    collisionDetection(apple)
};

function applesFalling (){
    for (let i = 0; i< apples.length; i++ ){
        appleFalling(apples[i])
    }
       req1= window.requestAnimationFrame(applesFalling)
}
 
//bunnies attacking

function bunnyAttacking (bunny){
    let bunnyRect = bunny.getBoundingClientRect();
    let screenLimit = document.body.getBoundingClientRect();
    bunnyRect.y = bunnyRect.y + 3;
    if (bunnyRect.y < (screenLimit.height-195)){
    bunny.style.transform=`translateY(${bunnyRect.y}px)`;
} else{
    bunny.style.transform = `translateY(${makeRandomNumber(0,150)}px)`
    bunny.style.left = `${makeRandomNumber(0,screenLimitWidth)}px`;
}
     collisionDetection(bunny)
};

function bunniesAttacking (){
    for (let i = 0; i< bunnies.length; i++ ){
    bunnyAttacking(bunnies[i])
    }
       req2= window.requestAnimationFrame(bunniesAttacking)
}

//collision detection 

function collisionDetection (object){

let characterRect = character.getBoundingClientRect()
let objectRect = object.getBoundingClientRect()


if (characterRect.x < objectRect.x + objectRect.width &&
    characterRect.x + characterRect.width > objectRect.x &&
    characterRect.y < objectRect.y + objectRect.height &&
    characterRect.y + characterRect.height > objectRect.y) {
     if(objectRect.width<91){
         theGame.addPoint()
         object.style.transform = `translateY(${makeRandomNumber(0,100)}px)`;
         object.style.left = `${makeRandomNumber(0,screenLimitWidth)}px`;
     }else if(objectRect.width>91 && objectRect.width<100){
        theGame.addFivePoints()
        object.style.transform = `translateY(${makeRandomNumber(0,100)}px)`;
        object.style.left = `${makeRandomNumber(0,screenLimitWidth)}px`;
     }
     else{
         theGame.removePoint()
         object.style.transform = `translateY(${makeRandomNumber(0,100)}px)`;
         object.style.left = `${makeRandomNumber(0,screenLimitWidth)}px`;

     }
 } printScore()
}
// peut etre ajouter un if avec la taille de l'objet qui tombe fonction de la taille remove point ou add point

function finishGame(){
    window.cancelAnimationFrame(req2);
    window.cancelAnimationFrame(req1);
    theGame.resetTime();
    background.classList.remove("background-game");
    background.classList.add("background-score");
    gameScreen.style.visibility="hidden";  
    scoreScreen.style.visibility="visible"; 
    introMusic.innerHTML= `<audio controls autoplay style="display: none">
    <source src="./audios/title-screen.mp3" type="audio/mpeg" >
    </audio>`;
    gameMusic.innerHTML=" ";
    if(theGame.score>10){
    document.querySelector('#finish').innerHTML=`<h1>Congratulations!</h1><h2>You stole ${theGame.score} apples</h2>`;
    background.classList.add("background-score");
    } else if (theGame.score<=9 && theGame.score>=1){
    document.querySelector('#finish').innerHTML=`<h1>Not that bad!</h1><h2>You stole ${theGame.score} apples</h2>`;
    background.classList.add("background-score2");  
    }else{
    document.querySelector('#finish').innerHTML=`<h1>This is embarassing...</h1><h2>The bunnies were better than you!</h2>`;
    background.classList.add("background-score3");   
    document.querySelector(".restart-button").innerText="I am going back !"
    }
 }   


// définir un aléatoire

function makeRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
  }  


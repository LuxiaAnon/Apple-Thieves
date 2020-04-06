class TheGame {
    constructor (){
    this.score = 0 
    this.timeLeft = 60
    this.intervalID = 0 
    this.onPlay = false
    }

    startGame(callback){
        this.intervalID = setInterval(()=>{
            this.timeLeft-=1;
            if (callback){
                callback()
            }
            },1000
            )
        this.onPlay=true;
        if(this.timeLeft===0){
            finishGame()
        }
    }

    addPoint(){
        this.score++
    }

    removePoint(){
        this.score = this.score-3
    }

    finishGame(){
       this.onPlay=false
        
    }

}
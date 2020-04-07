class TheGame {
    constructor (){
    this.score = 0
    this.timeLeft = 60
    this.intervalID = 0 
    this.onPlay = false
    }

    startGame(callback){
        this.intervalID = setInterval(()=>{
            if(this.timeLeft>=1){
            this.timeLeft-=1;
            } else{
                clearInterval(this.intervalID)
            }
            if (callback){
                callback()
            }
            },1000
            )
    }

    addPoint(){
        this.score++
    }

    removePoint(){
        this.score = this.score-3
    }
}
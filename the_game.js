class TheGame {
    constructor (){
    this.score = 0
    this.timeLeft = 60
    this.intervalID = 0 
    this.onPlay = false
    }

    startGame(callback){
        this.score=0
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

    addThreePoints(){
        this.score+=3
    }

    removePoint(){
    if(this.score>=5){
    this.score = this.score-5
    } else if (this.score===4){
    this.score = this.score-4
    }else if (this.score===3){
     this.score = this.score-3
    }else if (this.score===2){
     this.score = this.score-2
    }else if (this.score===1){
    this.score = this.score-1
}}

    resetTime(){
        clearInterval(this.intervalID)
        this.timeLeft=60
    }
}
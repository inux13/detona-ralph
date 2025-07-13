const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives")
    },
    values: {
        hitPosition:0,
        result:0,
        currentTime: 10,
        currentLives: 3,
    },
    actions: {
        timerId: setInterval(randomSquare, 700),
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function countDown( ) {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime

    if (state.values.currentLives <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! Seu resultado foi " + state.values.result);
        state.values.currentTime = 0
        return;
    }

        if (state.values.currentTime <= 0){
            state.values.currentLives--;
            state.view.lives.textContent = "x" + state.values.currentLives;
            if (state.values.currentLives > 0) {
                alert("Mais uma vez!");
            state.values.currentTime = 10
            }
            
        }
    
}


function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}



function randomSquare(){
    state.view.squares.forEach((square =>{
        square.classList.remove("enemy");

    } ))

let randomNumber = Math.floor(Math.random() * 9);
let randomSquare = state.view.squares[randomNumber];
randomSquare.classList.add("enemy");
state.values.hitPosition = randomSquare.id
}


function addListenerHitBox() {
    state.view.squares.forEach((square) => {
       square.addEventListener("mousedown", ()=> {
        if (square.id === state.values.hitPosition) {
            state.values.result++
            state.view.score.textContent = state.values.result
            state.values.hitPosition=null;
            playSound("hit");
        } else {
            /*state.values.result--
            state.view.score.textContent = state.values.result*/
            state.values.currentTime = 0
             alert("perdeu")

        }
       })
    })
}

function init () {
    addListenerHitBox();
};

init();

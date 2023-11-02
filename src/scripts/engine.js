const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        life: document.querySelector("#life"),
    },
    values: {
        gameVelocity: 800,
        hitPosition: 0,
        result: 0,
        currentTime: 10,
        chance: 1,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert(`Game Over! O seu resultado foi: ${state.values.result}`);
        state.values.chance--;
        state.view.life.textContent = state.values.chance;
        if(state.values.chance === 0) {
            return state.view.life.textContent === chance;
        }
    }
}

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.mp3`);
    audio.volume = 0.3;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy"); 
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitbox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("tiro");

            }
    }) });
}

function init() {
    addListenerHitbox();
}

init();
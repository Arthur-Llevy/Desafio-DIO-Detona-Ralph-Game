"use strict";
;
;
;
;
const state = {
    view: {
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score')
    },
    values: {
        timeId: null,
        gameVelocity: 1000,
        hitPosition: "0",
        results: 0,
        currentTime: 60
    },
    actions: {
        countDownTimerId: setInterval(countDown, 1000),
        timerId: setInterval(randomSquare, 1000)
    }
};
function playSoud() {
    let audio = new Audio('../sounds/hit.m4a');
    audio.play();
}
;
function countDown() {
    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        alert(`Game over! A sua pontuação foi de ${state.values.results}`);
    }
    else {
        state.values.currentTime--;
        if (state.view.timeLeft) {
            state.view.timeLeft.textContent = (state.values.currentTime).toString();
        }
        ;
    }
    ;
}
;
function randomSquare() {
    if (state.view.squares) {
        state.view.squares.forEach((square) => {
            square.classList.remove('enemy');
        });
        let randomNumber = Math.floor(Math.random() * 9);
        let randomSquare = state.view.squares[randomNumber];
        randomSquare.classList.add("enemy");
        state.values.hitPosition = randomSquare.id;
    }
    ;
}
;
function moveEnemy() {
    state.values.timeId = state.actions.timerId;
}
;
function addListenerHitBox() {
    if (state.view.squares) {
        state.view.squares.forEach((square) => {
            square.addEventListener("mousedown", () => {
                if (square.id === state.values.hitPosition) {
                    state.values.results++;
                    playSoud();
                    if (state.view.score) {
                        state.view.score.textContent = (state.values.results).toString();
                        state.values.hitPosition = null;
                    }
                    ;
                }
                ;
            });
        });
    }
    ;
}
;
function initialize() {
    moveEnemy();
    addListenerHitBox();
}
;
initialize();

interface IView {
	squares: NodeListOf<HTMLDivElement> | null,
	enemy: HTMLDivElement | null,
	timeLeft: HTMLHeadingElement | null,
	score: HTMLHeadingElement | null,
};

interface IValues {
	timeId: number | null;
	gameVelocity: number;
	hitPosition: string | null;
	results: number;
	currentTime: number;
};

interface IActions {
	countDownTimerId: number;
	timerId: number;
};

interface IState {
	view: IView;
	values: IValues;
	actions: IActions	
};

const state: IState = {
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
		countDownTimerId: setInterval(countDown, 1000) as unknown as number,
		timerId: setInterval(randomSquare, 1000) as unknown as number
	}

};

function playSoud(): void {
	let audio: HTMLAudioElement = new Audio('../sounds/hit.m4a');
	audio.play()
};

function countDown(): void {
	if(state.values.currentTime <= 0){
		clearInterval(state.actions.countDownTimerId)
		alert(`Game over! A sua pontuação foi de ${state.values.results}`);		
	}else {
		state.values.currentTime--;
		if(state.view.timeLeft){
			state.view.timeLeft.textContent = (state.values.currentTime).toString();
		};
	};
};

function randomSquare(): void {
	if(state.view.squares){
		state.view.squares.forEach((square) => {
			square.classList.remove('enemy');
		});

		let randomNumber: number = Math.floor(Math.random() * 9);
		let randomSquare: HTMLDivElement = state.view.squares[randomNumber];
		randomSquare.classList.add("enemy");
		state.values.hitPosition = randomSquare.id;
	};
};

function moveEnemy(): void {
	state.values.timeId = state.actions.timerId;
};

function addListenerHitBox(): void {
	if(state.view.squares){
		state.view.squares.forEach((square) => {
			square.addEventListener("mousedown", () => {
				if(square.id === state.values.hitPosition){
					state.values.results++;
					playSoud();
					if(state.view.score){
						state.view.score.textContent = (state.values.results).toString();
						state.values.hitPosition = null;
					};
				};
			});
		});
	};
};

function initialize(): void {
	moveEnemy();
	addListenerHitBox();
};

initialize();
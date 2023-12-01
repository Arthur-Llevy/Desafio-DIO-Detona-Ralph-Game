interface IView {
	squares: NodeListOf<HTMLDivElement> | null,
	enemy: HTMLDivElement | null,
	timeLeft: HTMLHeadingElement | null,
	score: HTMLHeadingElement | null,
	lives: HTMLHeadingElement | null
};

interface IValues {
	timeId: number | null;
	gameVelocity: number;
	hitPosition: string | null;
	results: number;
	currentTime: number;
	audio: HTMLAudioElement | null;
	lives: number; 
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
		score: document.querySelector('#score'),
		lives: document.querySelector('#lives')
	},

	values: {
		timeId: null,		
		gameVelocity: 1000,
		hitPosition: "0",
		results: 0,
		currentTime: 60,
		audio: document.querySelector('#hit'),
		lives: 3
	},

	actions: {
		countDownTimerId: setInterval(countDown, 1000) as unknown as number,
		timerId: setInterval(randomSquare, 1000) as unknown as number
	}

};

function playSoud(): void {
	if(state.values.audio){
		state.values.audio.play();	
	};
};

function countDown(): void {
	if(state.values.currentTime <= 0 || state.values.lives === 0){
		clearInterval(state.actions.countDownTimerId)
		alert(`Game over! A sua pontuação foi de ${state.values.results} pontos.`);	
		window.location.reload();	
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
				}else {
					state.values.lives === 0 ? 0 : state.values.lives--;
					if(state.view.lives){
						state.view.lives.textContent = `${(state.values.lives).toString()}x`;
					}
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
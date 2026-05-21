
export default class Game {
	static FIELD_SIZE = 16;
	static MAX_MISSES = 5;
	static MOVE_INTERVAL = 1000;
	static CURSOR_TIMEOUT = 500;

	constructor() {
		this.currentPosition = 0;
		this.moveIntervalId = 0
		this.miss = 0;
		this.score = 0;	
		
		this.isGameOver = false;

		this.element = document.createElement('img')
		this.element.src ='./image/goblin.png';

		this.mouseEnterHandler = this.mouseEnter.bind(this);
		this.onClick = this.click.bind(this);
		this.beforeUnloadHandler = this.handlerBeforeUnload.bind(this);
	}

	click(){
		if (this.isGameOver) return;		

		this.element.remove();
		this.miss = -1;				 

	}

	mouseEnter() {
		document.body.style.cursor =  "url('./image/icons.png'), pointer";

		setTimeout(() => {
			document.body.style.cursor = 'default';
		},Game.CURSOR_TIMEOUT)

	}

	handlerBeforeUnload() {
		this.endGame()
	}

	static randomNumber() {
		let numberBox = Math.floor(Math.random() * Game.FIELD_SIZE);
		return numberBox;
	}

	moving() {
		if (this.isGameOver) return;

		let boxes = document.querySelectorAll('.box')
		if (boxes.length === 0) {
			throw new Error('Игровое поле не найдено');
		}

		let moveToBox = Game.randomNumber()

		while (this.currentPosition === moveToBox) {
			moveToBox = Game.randomNumber()
		}

		boxes.forEach(el => {
			let id = Number(el.dataset.id)

			if (id === moveToBox) {
				el.append(this.element)
				this.currentPosition = moveToBox
			}
		})
	}	

	

	startGame() {
		this.isGameOver = false;

		this.element.addEventListener('mouseenter', this.mouseEnterHandler)

		this.element.addEventListener("click", this.onClick);			
		
		this.moveIntervalId = setInterval(() => {
			this.moving();
			this.miss ++;
			if (this.miss > Game.MAX_MISSES) clearInterval(this.moveIntervalId);
		}, Game.MOVE_INTERVAL);
		

		window.addEventListener("beforeunload", this.beforeUnloadHandler);
	}

	endGame() {
		if(this.isGameOver) return;

		this.isGameOver = true;

		clearInterval(this.moveIntervalId);

		this.element.removeEventListener('mouseenter', this.mouseEnterHandler);
		this.element.removeEventListener("click", this.onClick);
		window.removeEventListener("beforeunload", this.beforeUnloadHandler);

		this.element.remove();
	}
	
}
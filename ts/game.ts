import { Board } from "./board";
import { Snake } from "./snake";
import { Cell } from "./cell";
import { pick } from "./helpers";
import { Direction } from "./types";

export class Game {
    private running: boolean = false
    private timer: number
    private food: Cell

    constructor(
        private board: Board,
        private snake: Snake,
    ) {}

    init() {
        this.drawBoard()
        this.drawSnake()
        this.makeFood()
        this.drawFood()
        this.bindEvents()
    }

    drawBoard() {
        const app: HTMLDivElement = document.querySelector('.app')
        const fragment = document.createDocumentFragment()
        let cellSize: number

        for (let i = 0; i <  this.board.cellCount; i++) {
            const cell = this.board.getCell(i)
            cellSize = cell.getSize()
            const cellNode = document.createElement('div')
            cellNode.setAttribute('data-x', String(cell.getX()))
            cellNode.setAttribute('data-y', String(cell.getY()))
            cellNode.classList.add('cell')
            cellNode.style.width = cellSize + 'px'
            cellNode.style.height = cellSize + 'px'
            fragment.appendChild(cellNode)
        }
        app.style.width = cellSize * this.board.getWidth() + 'px'
        app.appendChild(fragment)
    }

    drawSnake() {
        for (let i = 0; i < this.snake.size; i++) {
            const snakeCell = this.snake.getCell(i)
            const cellX = snakeCell.getX()
            const cellY = snakeCell.getY()
            const snakeCellNode = document.querySelector(`[data-x="${cellX}"][data-y="${cellY}"]`)
            if (snakeCellNode) {
                snakeCellNode.classList.add('active')
            }
        }
    }

    makeFood() {
        // 算出整个 board 的 cell 集合
        const boardCells: Cell[] = this.board.getCells()
        // 算出当前整条 snake 的 cell 集合
        const snakeCells: Cell[] = this.snake.getCells()
        // 取差集
        const diffCells: Cell[] = boardCells.filter(c => !snakeCells.find(cell => cell.isSamePosition(c)))
        // 在得到的集合中随机选一个 cell 返回，当作 food
        const food: Cell = pick(diffCells)
        this.food = food
    }

    drawFood() {
        const foodX = this.food.getX()
        const foodY = this.food.getY()
        const foodNode = document.querySelector(`[data-x="${foodX}"][data-y="${foodY}"]`)
        if (foodNode) {
            foodNode.classList.add('food')
        }
    }

    clearSnake() {
        const cells: HTMLDivElement[] = Array.from(document.querySelectorAll('.active'))
        for (const c of cells) {
            c.classList.remove('active')
        }
    }

    clearFood() {
        const foodNode: HTMLDivElement = document.querySelector('.food')
        foodNode.classList.remove('food')
    }

    bindEvents() {
        document.addEventListener('keydown', (e) => {
            const direction: Direction = this.snake.getDirection()
            if (e.which === Direction.UP) {
                if (direction === Direction.LEFT || direction === Direction.RIGHT) {
                    this.snake.turnUp()
                    this.clearSnake()
                    this.snake.move()
                    if (this.snake.meetingFood(this.food)) {
                        this.clearFood()
                        this.snake.grow()
                        this.makeFood()
                        this.drawFood()
                    }
                    this.drawSnake()
                }
            } else if (e.which === Direction.RIGHT) {
                if (direction === Direction.UP || direction === Direction.DOWN) {
                    this.snake.turnRight()
                    this.clearSnake()
                    this.snake.move()
                    if (this.snake.meetingFood(this.food)) {
                        this.clearFood()
                        this.snake.grow()
                        this.makeFood()
                        this.drawFood()
                    }
                    this.drawSnake()
                }
            } else if (e.which === Direction.DOWN) {
                if (direction === Direction.LEFT || direction === Direction.RIGHT) {
                    this.snake.turnDown()
                    this.clearSnake()
                    this.snake.move()
                    if (this.snake.meetingFood(this.food)) {
                        this.clearFood()
                        this.snake.grow()
                        this.makeFood()
                        this.drawFood()
                    }
                    this.drawSnake()
                }
            } else if (e.which === Direction.LEFT) {
                if (direction === Direction.UP || direction === Direction.DOWN) {
                    this.snake.turnLeft()
                    this.clearSnake()
                    this.snake.move()
                    if (this.snake.meetingFood(this.food)) {
                        this.clearFood()
                        this.snake.grow()
                        this.makeFood()
                        this.drawFood()
                    }
                    this.drawSnake()
                }
            }
        })
    }

    run() {
        this.running = true
        this.timer = setInterval(() => {
            this.clearSnake()
            this.snake.move()
            if (this.snake.meetingFood(this.food)) {
                this.clearFood()
                this.snake.grow()
                this.makeFood()
                this.drawFood()
            }
            this.drawSnake()
        }, 200)
    }

    stop() {
        this.running = false
        clearInterval(this.timer)
    }
}
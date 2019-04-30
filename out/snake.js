import { board, initialSnakeSize, } from './config';
import { Direction, } from './types';
import { Cell, } from './cell';
export class Snake {
    constructor() {
        this.cells = [];
        this.direction = Direction.RIGHT;
        const headX = Math.floor(board[0] / 2) - 1;
        const headY = Math.floor(board[1] / 2) - 1;
        for (let i = 0; i < initialSnakeSize; i++) {
            const cell = new Cell(headX - i, headY);
            this.cells.push(cell);
        }
    }
    get size() {
        return this.cells.length;
    }
    get head() {
        return this.cells[0];
    }
    getCells() {
        return this.cells;
    }
    getDirection() {
        return this.direction;
    }
    move() {
        this.grow();
        this.cells.pop();
    }
    meetFood(food) {
        return this.head.getX() === food.getX() && this.head.getY() === food.getY();
    }
    turnDown() {
        this.direction = Direction.DOWN;
    }
    turnLeft() {
        this.direction = Direction.LEFT;
    }
    turnRight() {
        this.direction = Direction.RIGHT;
    }
    turnUp() {
        this.direction = Direction.UP;
    }
    stop() { }
    grow() {
        const x = this.head.getX();
        const y = this.head.getY();
        if (this.direction === Direction.UP) {
            this.cells.unshift(new Cell(x, y - 1));
        }
        else if (this.direction === Direction.RIGHT) {
            this.cells.unshift(new Cell(x + 1, y));
        }
        else if (this.direction === Direction.DOWN) {
            this.cells.unshift(new Cell(x, y + 1));
        }
        else if (this.direction === Direction.LEFT) {
            this.cells.unshift(new Cell(x - 1, y));
        }
    }
}

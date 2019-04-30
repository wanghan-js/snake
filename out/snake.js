import { Cell } from "./cell";
import { Direction } from "./types";
export class Snake {
    constructor(cells, direction) {
        this.cells = cells;
        this.direction = direction;
    }
    getCells() {
        return this.cells;
    }
    getDirection() {
        return this.direction;
    }
    setCells(cells) {
        this.cells = cells;
    }
    setDirection(direction) {
        this.direction = direction;
    }
    get size() {
        return this.cells.length;
    }
    get head() {
        return this.cells[0];
    }
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
}

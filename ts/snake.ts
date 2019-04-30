import { Cell } from "./cell";
import { Direction } from "./types";

export class Snake {
    constructor(
        private cells: Cell[],
        private direction: Direction,
    ) {}

    getCells() {
        return this.cells
    }

    getDirection() {
        return this.direction
    }

    setCells(cells: Cell[]) {
        this.cells = cells
    }

    setDirection(direction: Direction) {
        this.direction = direction
    }


    get size(): number {
        return this.cells.length
    }

    get head(): Cell {
        return this.cells[0]
    }


    // 蛇变长的思路：在蛇头的前面增加一个 cell，蛇尾处不变
    grow() {
        const x = this.head.getX()
        const y = this.head.getY()
        if (this.direction === Direction.UP) {
            this.cells.unshift(new Cell(x, y - 1))
        } else if (this.direction === Direction.RIGHT) {
            this.cells.unshift(new Cell(x + 1, y))
        } else if (this.direction === Direction.DOWN) {
            this.cells.unshift(new Cell(x, y + 1))
        } else if (this.direction === Direction.LEFT) {
            this.cells.unshift(new Cell(x - 1, y))
        }
    }

    // 蛇移动的思路：在蛇头的前面增加一个 cell，在蛇尾处减少一个 cell
    move() {
        this.grow()
        this.cells.pop()
    }

    meetFood(food: Cell): boolean {
        return this.head.getX() === food.getX() && this.head.getY() === food.getY()
    }

    turnDown() {
        this.direction = Direction.DOWN
    }

    turnLeft() {
        this.direction = Direction.LEFT
    }

    turnRight() {
        this.direction = Direction.RIGHT
    }

    turnUp() {
        this.direction = Direction.UP
    }

    stop() {}
}
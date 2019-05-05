import { Cell } from "./cell";
import { Direction, CellType } from "./types";
import { Cells } from "./cells";

export class Snake {
    private cells: Cell[] = []
    private direction: Direction = Direction.RIGHT

    constructor(
        private size: number,
        private cellSize: number,
        private headX: number,
        private headY: number,
    ) {
        for (let i = 0; i < size; i++) {
            const cell = new Cell(headX - i, headY, cellSize, CellType.SNAKE)
            this.cells.push(cell)
        }
    }


    getSize() {
        return this.size
    }

    getCellSize() {
        return this.cellSize
    }

    getHeadX() {
        return this.headX
    }

    getHeadY() {
        return this.headY
    }

    getCells() {
        return this.cells
    }

    getDirection() {
        return this.direction
    }

    setSize(size: number) {
        this.size = size
    }

    setCellSize(cellSize: number) {
        this.cellSize = cellSize
    }

    setHeadX(headX: number) {
        this.headX = headX
    }

    setHeadY(headY: number) {
        this.headY = headY
    }

    setCells(cells: Cell[]) {
        this.cells = cells
    }

    setDirection(direction: Direction) {
        this.direction = direction
    }


    private get head(): Cell {
        return this.cells[0]
    }

    private get body(): Cell[] {
        return this.cells.slice(1)
    }

    private get isHorizontal(): boolean {
        return this.direction === Direction.LEFT || this.direction === Direction.RIGHT
    }

    private get isVertical(): boolean {
        return this.direction === Direction.UP || this.direction === Direction.DOWN
    }


    // 在蛇头增加一个 cell
    private addCell(x: number, y: number) {
        this.cells.unshift(new Cell(x, y, this.cellSize, CellType.SNAKE))
        // 更新相关 fields
        this.size++
        this.headX = this.head.getX()
        this.headY = this.head.getY()
    }

    getCell(index: number): Cell {
        return this.cells[index]
    }

    // 蛇变长的思路：在蛇头的前面增加一个 cell
    grow() {
        const x = this.headX
        const y = this.headY
        if (this.direction === Direction.UP) {
            this.addCell(x, y - 1)
        } else if (this.direction === Direction.RIGHT) {
            this.addCell(x + 1, y)
        } else if (this.direction === Direction.DOWN) {
            this.addCell(x, y + 1)
        } else if (this.direction === Direction.LEFT) {
            this.addCell(x - 1, y)
        }
    }

    // 蛇移动的思路：先让蛇变长，再在蛇尾处减少一个 cell
    move() {
        this.grow()
        this.cells.pop()
        // 更新相关 fields
        this.size--
    }

    // 蛇头是否吃到食物
    meetingFood(food: Cell): boolean {
        return this.head.isSamePosition(food)
    }

    turnDown() {
        if (this.isHorizontal) {
            this.direction = Direction.DOWN
        }
    }

    turnLeft() {
        if (this.isVertical) {
            this.direction = Direction.LEFT
        }
    }

    turnRight() {
        if (this.isVertical) {
            this.direction = Direction.RIGHT
        }
    }

    turnUp() {
        if (this.isHorizontal) {
            this.direction = Direction.UP
        }
    }

    // 蛇头是否碰到其他 cells 组成的图形
    colliding(cells: Cell[]): boolean {
        return Cells.includingCell(cells, this.head)
    }

    // 蛇头碰到自己的身体
    collidingSelf(): boolean {
        return this.colliding(this.body)
    }
}
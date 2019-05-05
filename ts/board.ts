import { Cell } from "./cell";
import { CellType } from "./types";

export class Board {
    private cells: Cell[] = []

    constructor(
        private width: number,
        private height: number,
        private cellSize: number,
    ) {
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                const cell = new Cell(j, i, cellSize, CellType.NORMAL)
                this.cells.push(cell)
            }
        }
    }


    getWidth(): number {
        return this.width
    }

    getHeight(): number {
        return this.height
    }

    getCellSize() {
        return this.cellSize
    }

    getCells() {
        return this.cells
    }

    setWidth(width: number) {
        this.width = width
    }

    setHeight(height: number) {
        this.height = height
    }

    setCellSize(cellSize: number) {
        this.cellSize = cellSize
    }

    setCells(cells: Cell[]) {
        this.cells = cells
    }


    get cellCount(): number {
        return this.cells.length
    }

    get rim(): Cell[] {
        const cells: Cell[] = this.cells
        const rimUp : Cell[]= cells.filter(c => c.getY() === 0)
        const rimBottom: Cell[] = cells.filter(c => c.getY() === this.height - 1)
        const rimLeft: Cell[] = cells.filter(c => c.getX() === 0)
        const rimRight: Cell[] = cells.filter(c => c.getX() === this.width - 1)
        const all: Cell[] = [...rimUp, ...rimBottom, ...rimLeft, ...rimRight]
        return all
    }


    getCell(index: number): Cell {
        return this.cells[index]
    }
}
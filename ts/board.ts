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
        const rimUp : Cell[] = []
        const rimBottom: Cell[] = []
        const rimLeft: Cell[] = []
        const rimRight: Cell[] = []
        for (let i = 0; i < this.width; i++) {
            rimUp.push(new Cell(i, -1, this.cellSize, CellType.NORMAL))
        }
        for (let i = 0; i < this.width; i++) {
            rimBottom.push(new Cell(i, this.height, this.cellSize, CellType.NORMAL))
        }
        for (let i = 0; i < this.height; i++) {
            rimLeft.push(new Cell(-1, i, this.cellSize, CellType.NORMAL))
        }
        for (let i = 0; i < this.height; i++) {
            rimRight.push(new Cell(this.width, i, this.cellSize, CellType.NORMAL))
        }
        const all: Cell[] = [...rimUp, ...rimBottom, ...rimLeft, ...rimRight]

        return all
    }


    getCell(index: number): Cell {
        return this.cells[index]
    }
}
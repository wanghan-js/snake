import { CellType } from "./types";

export class Cell {
    constructor(
        private x: number,
        private y: number,
        private type: CellType,
    ) {}

    getX(): number {
        return this.x
    }

    getY(): number {
        return this.y
    }

    getType(): CellType {
        return this.type
    }

    setX(x: number) {
        this.x = x
    }

    setY(y: number) {
        this.y = y
    }

    setType(type: CellType) {
        this.type = type
    }


    isSamePosition(cell: Cell) {
        return cell.getX() === this.x && cell.getY() === this.y
    }
}
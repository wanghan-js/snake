import { CellType } from "./types";

export class Cell {
    constructor(
        private x: number,
        private y: number,
        private size: number,
        private type: CellType,
    ) {}


    getX(): number {
        return this.x
    }

    getY(): number {
        return this.y
    }

    getSize(): number {
        return this.size
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

    setSize(size: number) {
        this.size = size
    }

    setType(type: CellType) {
        this.type = type
    }


    isSamePosition(cell: Cell) {
        return cell.getX() === this.x && cell.getY() === this.y
    }
}
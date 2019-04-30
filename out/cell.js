export class Cell {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getType() {
        return this.type;
    }
    setX(x) {
        this.x = x;
    }
    setY(y) {
        this.y = y;
    }
    setType(type) {
        this.type = type;
    }
    isSamePosition(cell) {
        return cell.getX() === this.x && cell.getY() === this.y;
    }
}

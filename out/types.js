export var Direction;
(function (Direction) {
    Direction[Direction["LEFT"] = 37] = "LEFT";
    Direction[Direction["UP"] = 38] = "UP";
    Direction[Direction["RIGHT"] = 39] = "RIGHT";
    Direction[Direction["DOWN"] = 40] = "DOWN";
})(Direction || (Direction = {}));
export var CellType;
(function (CellType) {
    CellType[CellType["NORMAL"] = 0] = "NORMAL";
    CellType[CellType["SNAKE"] = 1] = "SNAKE";
    CellType[CellType["FOOD"] = 2] = "FOOD";
})(CellType || (CellType = {}));

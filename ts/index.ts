import { Game } from "./game";
import { Board } from "./board";
import { boardSize, cellSize, initialSnakeSize } from "./config";
import { Snake } from "./snake";

const __main__ = () => {
    const width = boardSize[0]
    const height = boardSize[1]
    const centerX = Math.floor(width / 2)
    const centerY = Math.floor(height / 2)

    const board = new Board(width, height, cellSize)
    const snake = new Snake(initialSnakeSize, cellSize, centerX, centerY)
    const game = new Game(board, snake)

    game.init()
    game.run()
}


__main__()
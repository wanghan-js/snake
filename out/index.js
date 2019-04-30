import { board, cellSize, } from './config';
import { Snake, } from './snake';
import { Cell, } from './cell';
import { Direction, } from './types';
import { randomIndex } from './helpers';
const initBoard = () => {
    const app = document.querySelector('.app');
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < board[1]; i++) {
        for (let j = 0; j < board[0]; j++) {
            const cell = document.createElement('div');
            cell.setAttribute('data-x', String(j));
            cell.setAttribute('data-y', String(i));
            cell.classList.add('cell');
            cell.style.width = cellSize[0] + 'px';
            cell.style.height = cellSize[1] + 'px';
            fragment.appendChild(cell);
        }
    }
    app.style.width = cellSize[0] * board[0] + 'px';
    app.appendChild(fragment);
};
const clearSnake = () => {
    const cells = Array.from(document.querySelectorAll('.cell'));
    for (const c of cells) {
        c.classList.remove('active');
    }
};
const bindEvent = (snake) => {
    document.addEventListener('keydown', (e) => {
        const direction = snake.getDirection();
        if (e.which === Direction.UP) {
            if (direction === Direction.LEFT || direction === Direction.RIGHT) {
                snake.turnUp();
                clearSnake();
                drawSnake(snake);
                snake.move();
            }
        }
        else if (e.which === Direction.RIGHT) {
            if (direction === Direction.UP || direction === Direction.DOWN) {
                snake.turnRight();
                clearSnake();
                drawSnake(snake);
                snake.move();
            }
        }
        else if (e.which === Direction.DOWN) {
            if (direction === Direction.LEFT || direction === Direction.RIGHT) {
                snake.turnDown();
                clearSnake();
                drawSnake(snake);
                snake.move();
            }
        }
        else if (e.which === Direction.LEFT) {
            if (direction === Direction.UP || direction === Direction.DOWN) {
                snake.turnLeft();
                clearSnake();
                drawSnake(snake);
                snake.move();
            }
        }
    });
};
const drawSnake = (snake) => {
    for (let i = 0; i < snake.size; i++) {
        const snakeCell = snake.getCells()[i];
        const cellX = snakeCell.getX();
        const cellY = snakeCell.getY();
        const snakeCellNode = document.querySelector(`[data-x="${cellX}"][data-y="${cellY}"]`);
        if (snakeCellNode) {
            snakeCellNode.classList.add('active');
        }
    }
};
const drawFood = (food) => {
    const foodX = food.getX();
    const foodY = food.getY();
    const foodNode = document.querySelector(`[data-x="${foodX}"][data-y="${foodY}"]`);
    if (foodNode) {
        foodNode.classList.add('food');
    }
};
const clearFood = (food) => {
    const foodX = food.getX();
    const foodY = food.getY();
    const foodNode = document.querySelector(`[data-x="${foodX}"][data-y="${foodY}"]`);
    if (foodNode) {
        foodNode.classList.remove('food');
    }
};
const generateFood = (snake) => {
    const boardCells = [];
    for (let i = 0; i < board[1]; i++) {
        for (let j = 0; j < board[0]; j++) {
            boardCells.push(new Cell(j, i));
        }
    }
    const snakeCells = snake.getCells();
    const diffCells = boardCells.filter(c => !snakeCells.find(cell => cell.isSame(c)));
    const index = randomIndex(diffCells.length);
    const cell = diffCells[index];
    return cell;
};
const initGame = () => {
    const snake = new Snake();
    let food = generateFood(snake);
    drawFood(food);
    bindEvent(snake);
    setInterval(() => {
        clearSnake();
        drawSnake(snake);
        if (snake.meetFood(food)) {
            snake.grow();
            clearFood(food);
            food = generateFood(snake);
            drawFood(food);
        }
        else {
            snake.move();
        }
    }, 200);
};
const __main__ = () => {
    initBoard();
    initGame();
};
__main__();

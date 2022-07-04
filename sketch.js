var DIM = 100;
var grid = [];
var w = 800;
var h = 800;

const ROCK = 0;
const PAPER = 1;
const SCISSORS = 2;

let initBoard = (dim) => {
    let board = [];
    for (let i = 0; i < dim; i++) {
        board[i] = [];
        for (let j = 0; j < dim; j++) {
            board[i][j] = Math.floor(Math.random() * 3);
        }
    }
    return board;
};

let newGeneration = () => {
    var newGrid = grid.map(function(arr) {
        return arr.slice();
    });
    for (let i = 0; i < DIM; i++) {
        for (let j = 0; j < DIM; j++) {
            if (cellScore(i, j) < 0) {
                newGrid[i][j] = (grid[i][j] + 1) % 3;
            }
        }
    }
    return newGrid;
};

let cellScore = (i, j) => {
    let score = 0;
    let currentCell = grid[i][j];
    if (i != 0) {
        score += results(currentCell, grid[i - 1][j]);
    }
    if (i != DIM - 1) {
        score += results(currentCell, grid[i + 1][j]);
    }
    if (j != 0) {
        score += results(currentCell, grid[i][j - 1]);
    }
    if (j != DIM - 1) {
        score += results(currentCell, grid[i][j + 1]);
    }
    return score;
};

let results = (cellFrom, cellWith) => {
    if (cellFrom == ROCK && cellWith == SCISSORS) {
        return 1;
    } else if (cellFrom == SCISSORS && cellWith == ROCK) {
        return -1;
    } else {
        return cellFrom - cellWith;
    }
};

function setup() {
    createCanvas(w, h);
    grid = initBoard(DIM);
}

function draw() {
    background(0);

    strokeWeight(0);
    for (let i = 0; i < DIM; i++) {
        for (let j = 0; j < DIM; j++) {
            if (grid[i][j] == 0) {
                fill(255, 0, 0);
            } else if (grid[i][j] == 1) {
                fill(0, 0, 255);
            } else if (grid[i][j] == 2) {
                fill(0, 255, 0);
            }
            rect(i * (w / DIM), j * (h / DIM), w / DIM, h / DIM);
        }
    }

    grid = newGeneration();
}
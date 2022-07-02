
const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }
    return array;
}

const range = (start, end) => {
    var list = [];
    for (let i = start; i < end; i++) {
        list.push(i);
    }
    return list;
}

export default function deletingNumbers(board, difficulty) {
    let diff = 0;
    if (difficulty === "easy") {
        diff = 6 / 12;
    } else if (difficulty === "normal") {
        diff = 7 / 12;
    } else {
        diff = 8 / 12;
    }
    let base = 3;
    let side = base * base;
    let squares = side * side;
    let empties = Math.floor(squares * diff);
    let squaresArray = range(0, squares);
    squaresArray = shuffle(squaresArray);
    let sampleArray = squaresArray.slice(0, empties);
    for (var p of sampleArray) {
        board[Math.floor(p / side)][p % side] = 0;
    }
    return board;
}
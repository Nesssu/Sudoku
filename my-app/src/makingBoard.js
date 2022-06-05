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

const pattern = (r, c, base, side) => {
    return ((base * (r % base) + Math.floor(r / base) + c) % side);
}

const range = (start, end) => {
    var list = [];
    for (let i = start; i < end; i++) {
        list.push(i);
    }
    return list;
}

export default function makingBoard() {
    let base = 3;
    let side = base * base;
    let rbase = range(0, base);
    let rows = [];
    let r_rows = shuffle(rbase);
    let g_rows = shuffle(rbase);
    for (var r = 0; r < base; r++) {
        for (var g = 0; g < base; g++) {
            rows.push(g_rows[g]  * base + r_rows[r]);
        }
    }
    let cols = [];
    let g_cols = shuffle(rbase);
    let c_cols = shuffle(rbase);
    for (var c = 0; c < base; c++) {
        for (var g = 0; g < base; g++) {
            cols.push(g_cols[g] * base + c_cols[c]);
        }
    }
    let nums = shuffle(range(1, side + 1));
    let buf = [];
    let board = [];
    for (var r = 0; r < side; r++) {
        for (var c = 0; c < side; c++) {
            buf.push(nums[pattern(rows[r], cols[c], base, side)]);
        }
        board.push(buf);
        buf = [];
    }
    let squares = side * side;
    let empties = Math.floor(squares * 3 / 4);
    let squaresArray = range(0, squares);
    squaresArray = shuffle(squaresArray);
    let sampleArray = squaresArray.slice(0, empties);
    for (var p of sampleArray) {
        board[Math.floor(p / side)][p % side] = 0;
    }
    return board;
}
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const Number = (props) => {
    return (
        <div className="number-container">
            <p className="number-1">{props.value !== 0 ? props.value : ""}</p>
        </div>
    );
};

const Square = (props) => {
    return (
        <div className="square-container vertical-direction">
            <div className="horizontal-direction">
                <Number value={props.numbers[props.main][props.secondary]}/>
                <Number value={props.numbers[props.main][props.secondary + 1]}/>
                <Number value={props.numbers[props.main][props.secondary + 2]}/>
            </div>
            <div className="horizontal-direction">
                <Number value={props.numbers[props.main + 1][props.secondary]}/>
                <Number value={props.numbers[props.main + 1][props.secondary + 1]}/>
                <Number value={props.numbers[props.main + 1][props.secondary + 2]}/>
            </div>
            <div className="horizontal-direction">
                <Number value={props.numbers[props.main + 2][props.secondary]}/>
                <Number value={props.numbers[props.main + 2][props.secondary + 1]}/>
                <Number value={props.numbers[props.main + 2][props.secondary + 2]}/>
            </div>
        </div>
    );
};

const Table = (props) => {
    return (
        <div className="table-container vertical-direction">
            <div className="horizontal-direction">
                <Square main={0} secondary={0} numbers={props.table}/>
                <Square main={0} secondary={3} numbers={props.table}/>
                <Square main={0} secondary={6} numbers={props.table}/>
            </div>
            <div className="horizontal-direction">
                <Square main={3} secondary={0} numbers={props.table}/>
                <Square main={3} secondary={3} numbers={props.table}/>
                <Square main={3} secondary={6} numbers={props.table}/>
            </div>
            <div className="horizontal-direction">
                <Square main={6} secondary={0} numbers={props.table}/>
                <Square main={6} secondary={3} numbers={props.table}/>
                <Square main={6} secondary={6} numbers={props.table}/>
            </div>
        </div>
    );
};

const scrollToGame = () => {
    let elem = document.getElementById("game");
    elem.scrollIntoView();
};

const range = (min, max) => [...Array(max - min + 1).keys()].map(i => i + min);

function sample(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
    return array;
}

function pattern(r, c, base, side) {
    return (base * (r % base) + Math.floor(r / base) + c) % side;
}

function makingBoard() {
    let base = 3;
    let side = base * base;
    let rbase = range(0, base);
    let rows = [];
    for (var g = 0; g < base; g++) {
        for (var r = 0; r < base; r++) {
            rows.push(shuffle(rbase)[g] * base + shuffle(rbase)[r]);
        }
    }
    let cols = [];
    for (var g = 0; g < base; g++) {
        for (var c = 0; c < base; c++) {
            cols.push(shuffle(rbase)[g] * base + shuffle(rbase)[c]);
        }
    }
    let nums = shuffle(range(1, base * base + 1));
    var board;
    board = function () {
        var _pj_a = [], _pj_b = rows;
        for (var _pj_c = 0, _pj_d = _pj_b.length; _pj_c < _pj_d; _pj_c += 1) {
            var r = _pj_b[_pj_c];
            _pj_a.push(function () {
            var _pj_e = [],
            _pj_f = cols;
            for (var _pj_g = 0, _pj_h = _pj_f.length; _pj_g < _pj_h; _pj_g += 1) {
                var c = _pj_f[_pj_g];
                _pj_e.push(nums[pattern(r, c, base, side)]);
            }
            return _pj_e;
            }.call(this));
        }
        return _pj_a;
    }.call(this);
    let squares = side * side;
    let empties = squares * Math.floor(3 / 4);
    for (var p, _pj_c = 0, _pj_a = sample(range(0, squares), empties), _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
        p = _pj_a[_pj_c];
        board[Math.floor(p / side)][p % side] = 0;
    }
    return board;
}

class Game extends React.Component {
    /*
    table = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 2, 0, 0, 3, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 4, 0, 0, 5, 0, 0, 6, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 7, 0, 0, 8, 0, 0, 9, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    */
    table = makingBoard();

    render () {
        return (
            <div className="main-container">
                <div className="menu-area">
                    <h1 className="headline-1">Sudoku of the day</h1>
                    <button className="play-button" onClick={scrollToGame}>
                        <p className="text-button">Play</p>
                    </button>
                </div>
                <div className="game-area" id="game">
                    <h1 className="headline-1">Sudoku</h1>
                    <Table table={this.table}/>
                    <div className="button-area">
                        <button className="goback-button" onClick={makingBoard}>
                            <p className="text-button-small">Go back</p>
                        </button>
                        <button className="reset-button">
                            <p className="text-button-small">Reset</p>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game/>);

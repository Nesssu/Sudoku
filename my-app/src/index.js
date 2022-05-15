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
                <Number value={props.numbers[props.main][0]}/>
                <Number value={props.numbers[props.main][1]}/>
                <Number value={props.numbers[props.main][2]}/>
            </div>
            <div className="horizontal-direction">
                <Number value={props.numbers[props.main][3]}/>
                <Number value={props.numbers[props.main][4]}/>
                <Number value={props.numbers[props.main][5]}/>
            </div>
            <div className="horizontal-direction">
                <Number value={props.numbers[props.main][6]}/>
                <Number value={props.numbers[props.main][7]}/>
                <Number value={props.numbers[props.main][8]}/>
            </div>
        </div>
    );
};

const Table = (props) => {
    return (
        <div className="table-container vertical-direction">
            <div className="horizontal-direction">
                <Square main={0} numbers={props.table}/>
                <Square main={1} numbers={props.table}/>
                <Square main={2} numbers={props.table}/>
            </div>
            <div className="horizontal-direction">
                <Square main={3} numbers={props.table}/>
                <Square main={4} numbers={props.table}/>
                <Square main={5} numbers={props.table}/>
            </div>
            <div className="horizontal-direction">
                <Square main={6} numbers={props.table}/>
                <Square main={7} numbers={props.table}/>
                <Square main={8} numbers={props.table}/>
            </div>
        </div>
    );
};

class Game extends React.Component {
    table = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0]];

    notInSquare = (table, mainIndex, number) => {
        for (let i = 0; i < 9; i++) {
            if (table[mainIndex][i] === number) {
                return false
            }
        }
        return true;
    }

    notInRow = (table, mainIndex, secondaryIndex, number) => {
        const startIndexes = [0, 3, 6, 0, 3, 6, 0, 3, 6];
        let startSquare = startIndexes[mainIndex];
        let startNumber = startIndexes[secondaryIndex];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (table[startSquare][startNumber] === number) {
                    return false;
                }
                startNumber += 1;
            }
            startSquare += 1;
            startNumber -= 2;
        }
        return true;
    }   

    notInColumn = (table, mainIndex, secondaryIndex, number) => {
        const startIndexes = [0, 1, 2, 0, 1, 2, 0, 1, 2];
        let startSquare = startIndexes[mainIndex];
        let startNumber = startIndexes[secondaryIndex];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (table[startSquare][startNumber] === number) {
                    return false;
                }
                startNumber += 3;
            }
            startSquare += 3;
            startNumber -= 6;
        }
        return true;
    }

    generateTable = () => {
        let mainIndex = 0;
        let secondaryIndex = 0;
        let count = 81;
        while (count > 0) {
            var random = Math.floor(Math.random() * 9) + 1;
            if (this.notInSquare(this.table, mainIndex, random)
            && this.notInColumn(this.table, mainIndex, secondaryIndex, random)
            && this.notInRow(this.table, mainIndex, secondaryIndex, random)) {
                this.table[mainIndex][secondaryIndex] = random;
                secondaryIndex++;
                count--;
                if (secondaryIndex >= 9) {
                    secondaryIndex = 0;
                    mainIndex++;
                    if (mainIndex >= 9) {
                        break;
                    }
                }
            }
        }
    }

    render () {
        return (
            <div className="main-container">
                <div className="game-area">
                    <h1 className="headline-1">Sudoku</h1>
                    <Table table={this.table}/>
                </div>
            </div>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game/>);

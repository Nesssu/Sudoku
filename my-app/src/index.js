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

const scrollToGame = () => {
    let elem = document.getElementById("game");
    elem.scrollIntoView();
}

const generateTable = (table, ) => {
    let mainIndex = 0;
    let secondaryIndex = 0;

    while (1) {
        var randomNum = Math.floor(Math.random() * 9) + 1;
        if (isValid(table, randomNum)) {
            table[mainIndex][secondaryIndex] = randomNum;
            secondaryIndex++;
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

const isValid = (table, number) => {
    console.log("test");
    return true;
}

function isSafe(board, row, col, num)
{
     
    // Row has the unique (row-clash)
    for(let d = 0; d < board.length; d++)
    {
        // Check if the number we are trying to
        // place is already present in
        // that row, return false;
        if (board[row][d] == num)
        {
            return false;
        }
    }
 
    // Column has the unique numbers (column-clash)
    for(let r = 0; r < board.length; r++)
    {
        // Check if the number
        // we are trying to
        // place is already present in
        // that column, return false;
        if (board[r][col] == num)
        {
            return false;
        }
    }
    // Corresponding square has
    // unique number (box-clash)
    let sqrt = Math.floor(Math.sqrt(board.length));
    let boxRowStart = row - row % sqrt;
    let boxColStart = col - col % sqrt;
 
    for(let r = boxRowStart;
            r < boxRowStart + sqrt; r++)
    {
        for(let d = boxColStart;
                d < boxColStart + sqrt; d++)
        {
            if (board[r][d] == num)
            {
                return false;
            }
        }
    }
    // If there is no clash, it's safe
    return true;
}
 
function solveSudoku(board, n)
{
    let row = -1;
    let col = -1;
    let isEmpty = true;
    for(let i = 0; i < n; i++)
    {
        for(let j = 0; j < n; j++)
        {
            if (board[i][j] == 0)
            {
                row = i;
                col = j;
                // We still have some remaining
                // missing values in Sudoku
                isEmpty = false;
                break;
            }
        }
        if (!isEmpty)
        {
            break;
        }
    }
 
    // No empty space left
    if (isEmpty)
    {
        return true;
    }
 
    // Else for each-row backtrack
    for(let num = 1; num <= n; num++)
    {
        if (isSafe(board, row, col, num))
        {
            board[row][col] = num;
            if (solveSudoku(board, n))
            {
                // print(board, n);
                return true;
            }
            else
            {
                // Replace it
                board[row][col] = 0;
            }
        }
    }
    return false;
}
 
function print(board, N)
{    
    // We got the answer, just print it
    for(let r = 0; r < N; r++)
    {
        for(let d = 0; d < N; d++)
        {
            document.write(board[r][d]);
            document.write(" ");
        }
        document.write("<br>");
 
        if ((r + 1) % Math.floor(Math.sqrt(N)) == 0)
        {
            document.write("");
        }
    }
}
 
// Driver Code
let board = [ [ 3, 0, 6, 5, 0, 8, 4, 0, 0 ],
              [ 5, 2, 0, 0, 0, 0, 0, 0, 0 ],
              [ 0, 8, 7, 0, 0, 0, 0, 3, 1 ],
              [ 0, 0, 3, 0, 1, 0, 0, 8, 0 ],
              [ 9, 0, 0, 8, 6, 3, 0, 0, 5 ],
              [ 0, 5, 0, 0, 9, 0, 6, 0, 0 ],
              [ 1, 3, 0, 0, 0, 0, 2, 5, 0 ],
              [ 0, 0, 0, 0, 0, 0, 0, 7, 4 ],
              [ 0, 0, 5, 2, 0, 6, 3, 0, 0 ] ];
         
let N = board.length;
 
if (solveSudoku(board, N))
{
    // Print solution
    print(board, N);
}
else
{
    document.write("No solution");
}

class Game extends React.Component {
    table = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 1, 0, 0, 0, 0],
             [0, 0, 0, 0, 2, 0, 0, 0, 0],
             [0, 0, 0, 0, 3, 0, 0, 0, 0],
             [0, 0, 0, 0, 4, 0, 0, 0, 0],
             [0, 0, 0, 0, 5, 0, 0, 0, 0],
             [0, 0, 0, 0, 6, 0, 0, 0, 0],
             [0, 0, 0, 0, 7, 0, 0, 0, 0],
             [0, 0, 0, 0, 8, 0, 0, 0, 0]];

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
                    <Table table={board}/>
                    <div className="button-area">
                        <button className="goback-button">
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

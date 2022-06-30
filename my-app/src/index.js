import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import makingBoard from './makingBoard';
import deletingNumbers from './deletingNumbers';
import {cloneDeep} from 'lodash';

const handleSelect = (id, setSelectedId, getSelectedId) => {
    let elemToAdd = document.getElementById(id);
    let oldIndex = getSelectedId();
    let elem = document.createElement('Circle');
    elem.classList.add("circle");
    if (oldIndex != null) {
        let elemToDelete = document.getElementById(oldIndex);
        if (elemToDelete != null && elemToDelete.lastChild != null) {
            if (elemToDelete.lastChild.classList[0] == "circle") {
                elemToDelete.removeChild(elemToDelete.lastChild);
            }
        }
    }
    elemToAdd.appendChild(elem);
    setSelectedId(id);
};

const Number = (props) => {
    let id = "" + props.first + props.second;
    id = parseInt(id);
    if (props.playable) {
        return (
            <div className="number-container playable" id={id} onClick={() => handleSelect(id, props.setSelectedId, props.getSelectedId)}>
                {props.value == 0 ? <p className='number-1'></p> : <p className='number-1'>{props.value}</p>}
            </div>
        )
    } else {
        return (
            <div className="number-container not-playable">
                <p className='number-1'>{props.value}</p>
            </div>
        )
    }
};

const Square = (props) => {
    let id = 1;
    return (
        <div className="square-container vertical-direction">
            <div className="horizontal-direction">
                <Number value={props.numbers[props.main][props.secondary]} first={props.main} second={props.secondary} playable={props.playableBoard[props.main][props.secondary]} setSelectedId={props.setSelectedId} getSelectedId={props.getSelectedId}/>
                <Number value={props.numbers[props.main][props.secondary + 1]} first={props.main} second={props.secondary + 1} playable={props.playableBoard[props.main][props.secondary + 1]} setSelectedId={props.setSelectedId} getSelectedId={props.getSelectedId}/>
                <Number value={props.numbers[props.main][props.secondary + 2]} first={props.main} second={props.secondary + 2} playable={props.playableBoard[props.main][props.secondary + 2]} setSelectedId={props.setSelectedId} getSelectedId={props.getSelectedId}/>
            </div>
            <div className="horizontal-direction">
                <Number value={props.numbers[props.main + 1][props.secondary]} first={props.main + 1} second={props.secondary}playable={props.playableBoard[props.main + 1][props.secondary]} setSelectedId={props.setSelectedId} getSelectedId={props.getSelectedId}/>
                <Number value={props.numbers[props.main + 1][props.secondary + 1]} first={props.main + 1} second={props.secondary + 1} playable={props.playableBoard[props.main + 1][props.secondary + 1]} setSelectedId={props.setSelectedId} getSelectedId={props.getSelectedId}/>
                <Number value={props.numbers[props.main + 1][props.secondary + 2]} first={props.main + 1} second={props.secondary + 2} playable={props.playableBoard[props.main + 1][props.secondary + 2]} setSelectedId={props.setSelectedId} getSelectedId={props.getSelectedId}/>
            </div>
            <div className="horizontal-direction">
                <Number value={props.numbers[props.main + 2][props.secondary]} first={props.main + 2} second={props.secondary} playable={props.playableBoard[props.main + 2][props.secondary]} setSelectedId={props.setSelectedId} getSelectedId={props.getSelectedId}/>
                <Number value={props.numbers[props.main + 2][props.secondary + 1]} first={props.main + 2} second={props.secondary + 1} playable={props.playableBoard[props.main + 2][props.secondary + 1]} setSelectedId={props.setSelectedId} getSelectedId={props.getSelectedId}/>
                <Number value={props.numbers[props.main + 2][props.secondary + 2]} first={props.main + 2} second={props.secondary + 2} playable={props.playableBoard[props.main + 2][props.secondary + 2]} setSelectedId={props.setSelectedId} getSelectedId={props.getSelectedId}/>
            </div>
        </div>
    );
};

const Table = (props) => {
    return (
        <div className="table-container vertical-direction">
            <div className="horizontal-direction">
                <Square main={0} secondary={0} numbers={props.table} playableBoard={props.playableBoard} setSelectedId={props.setSelectedId} getSelectedId={props.getSelectedId}/>
                <Square main={0} secondary={3} numbers={props.table} playableBoard={props.playableBoard} setSelectedId={props.setSelectedId} getSelectedId={props.getSelectedId}/>
                <Square main={0} secondary={6} numbers={props.table} playableBoard={props.playableBoard} setSelectedId={props.setSelectedId} getSelectedId={props.getSelectedId}/>
            </div>
            <div className="horizontal-direction">
                <Square main={3} secondary={0} numbers={props.table} playableBoard={props.playableBoard} setSelectedId={props.setSelectedId} getSelectedId={props.getSelectedId}/>
                <Square main={3} secondary={3} numbers={props.table} playableBoard={props.playableBoard} setSelectedId={props.setSelectedId} getSelectedId={props.getSelectedId}/>
                <Square main={3} secondary={6} numbers={props.table} playableBoard={props.playableBoard} setSelectedId={props.setSelectedId} getSelectedId={props.getSelectedId}/>
            </div>
            <div className="horizontal-direction">
                <Square main={6} secondary={0} numbers={props.table} playableBoard={props.playableBoard} setSelectedId={props.setSelectedId} getSelectedId={props.getSelectedId}/>
                <Square main={6} secondary={3} numbers={props.table} playableBoard={props.playableBoard} setSelectedId={props.setSelectedId} getSelectedId={props.getSelectedId}/>
                <Square main={6} secondary={6} numbers={props.table} playableBoard={props.playableBoard} setSelectedId={props.setSelectedId} getSelectedId={props.getSelectedId}/>
            </div>
        </div>
    );
};

const startTheGame = () => {
    let elem = document.getElementById("game");
    elem.scrollIntoView();
};

const Game =() => {
    const [board, setBoard] = React.useState(null);
    const [solvedBoard, setSolvedBoard] = React.useState(null);
    const [playableBoard, setPlayableBoard] = React.useState(null);
    const [newGame, setNewGame] = React.useState(0);
    const [update, setUpdate] = React.useState(0);
    const [selectedId, setSelectedId] = React.useState(null);

    const getSelectedId = () => { return selectedId; }

    const separateId = () => {
        let combinedID = null;
        if (selectedId != null) {
            if (selectedId.length > 1) {
                combinedID = "" + "0" + selectedId;
            } else {
                combinedID = "" + parseInt(selectedId / 10) + (selectedId % 10);
            }
        }
        return combinedID;
    }

    const insertIntoBoard = (number) => {
        let IdToAdd = separateId();
        const MAIN = 0; const SECONDARY = 1;
        if (IdToAdd != null) {
            if (board != null) {
                board[IdToAdd[MAIN]][IdToAdd[SECONDARY]] = number;
                setUpdate(!update);
            }
        }
    }

    const startNewGame = () => {
        if (selectedId != null) {
            let elemToDelete = document.getElementById(selectedId);
            if (elemToDelete != null && elemToDelete.lastChild != null) {
                if (elemToDelete.lastChild.classList[0] == "circle") {
                    elemToDelete.removeChild(elemToDelete.lastChild);
                }
            }
        }
        let newSolvedBoard = makingBoard();
        setSolvedBoard(cloneDeep(newSolvedBoard));
        let newBoard = deletingNumbers(newSolvedBoard);
        setBoard(cloneDeep(newBoard));
        setNewGame(1);
    }

    // RUNS ONCE EVERYTIME THE PAGE GETS RELOADED
    React.useEffect(() => {
        var ifNewGame = JSON.parse(localStorage.getItem("newGame"));
        if (ifNewGame == undefined) {
            localStorage.setItem("newGame", JSON.stringify(true));
            let newSolvedBoard = makingBoard();
            setSolvedBoard(cloneDeep(newSolvedBoard));
            let newBoard = deletingNumbers(newSolvedBoard);
            setBoard(cloneDeep(newBoard));
            setNewGame(1);
        } else {
            setBoard(JSON.parse(localStorage.getItem("gameBoard")));
            setSolvedBoard(JSON.parse(localStorage.getItem("solvedGameBoard")));
            setPlayableBoard(JSON.parse(localStorage.getItem("playableGameBoard")));
        }
    }, []);

    React.useEffect(() => {
        if (newGame == 1) {
            let tempArray = [];
            for (let i = 0; i < 9; i++) {
                let temp = [];
                for (let j = 0; j < 9; j++) {
                    if (board[i][j] == 0) {
                        temp.push(true);
                    } else {
                        temp.push(false);
                    }
                }
                tempArray.push(temp);
            }
            setPlayableBoard(cloneDeep(tempArray));
            setNewGame(0);
        }
    }, [newGame]);

    React.useEffect(() => {/*This comment disables the empty function warning in VS Code*/}, [update]);

    if (board != null) {
        localStorage.setItem("gameBoard", JSON.stringify(board));
    }
    if (solvedBoard != null) {
        localStorage.setItem("solvedGameBoard", JSON.stringify(solvedBoard));
    }
    if (playableBoard != null) {
        localStorage.setItem("playableGameBoard", JSON.stringify(playableBoard));
    }

    if (board != null && playableBoard != null) {
        return (
            <div className="main-container">
                <div className="starting-area">
                    <h1 className="headline-1">Sudoku</h1>
                    <button className="play-button" onClick={() => startTheGame()}>
                        <p className="text-button">Play</p>
                    </button>
                </div>
                <div className="game-area" id="game">
                    <div className='menu-area'> 
                        <p>What is Sudoku?</p>
                        <p>How to play?</p>
                        <p>Settings</p>
                    </div>
                    <div className='board-area'>
                        <Table table={board} playableBoard={playableBoard} setSelectedId={setSelectedId} getSelectedId={getSelectedId}/>
                    </div>
                    <div className="button-area">
                        <div className='btn-row-1'>
                            <button  className='btn-1' onClick={() => {startNewGame();}}>
                                New Game
                            </button>
                        </div>
                        <div className='btn-row-3'>
                            <button className='btn-3' onClick={() => {insertIntoBoard(7);}}>7</button>
                            <button className='btn-3' onClick={() => {insertIntoBoard(8);}}>8</button>
                            <button className='btn-3' onClick={() => {insertIntoBoard(9);}}>9</button>
                        </div>
                        <div className='btn-row-3'>
                            <button className='btn-3' onClick={() => {insertIntoBoard(4);}}>4</button>
                            <button className='btn-3' onClick={() => {insertIntoBoard(5);}}>5</button>
                            <button className='btn-3' onClick={() => {insertIntoBoard(6);}}>6</button>
                        </div>
                        <div className='btn-row-3'>
                            <button className='btn-3' onClick={() => {insertIntoBoard(1);}}>1</button>
                            <button className='btn-3' onClick={() => {insertIntoBoard(2);}}>2</button>
                            <button className='btn-3' onClick={() => {insertIntoBoard(3);}}>3</button>
                        </div>
                        <div className='btn-row-1'>
                            <button className='btn-1'>Empty board</button>
                        </div>
                        <div className='btn-row-1'>
                            <button className='btn-1'>Finish</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game/>);

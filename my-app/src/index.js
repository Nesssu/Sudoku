import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import makingBoard from './makingBoard';
import deletingNumbers from './deletingNumbers';
import {cloneDeep} from 'lodash';

const handleSelect = (id, getLastIndex, setLastIndex, setSelectedId) => {
    setSelectedId(id);
    let elemToAdd = document.getElementById(id);
    let oldIndex = getLastIndex();
    let elem = document.createElement('Circle');
    elem.classList.add("circle");
    if (oldIndex !== null) {
        let elemToDelete = document.getElementById(oldIndex);
        elemToDelete.removeChild(elemToDelete.lastChild);
    }
    elemToAdd.appendChild(elem);
    setLastIndex(id);
};

const Number = (props) => {
    let id = "" + props.first + props.second;
    id = parseInt(id);
    if (props.playable) {
        return (
            <div className="number-container playable" id={id} onClick={() => handleSelect(id, props.getLastlySelectedId, props.setLastlySelectedId, props.setSelectedId)}>
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
                <Number value={props.numbers[props.main][props.secondary]} first={props.main} second={props.secondary} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastlySelectedId={props.getLastlySelectedId} setLastlySelectedId={props.setLastlySelectedId} playable={props.playableBoard[props.main][props.secondary]}/>
                <Number value={props.numbers[props.main][props.secondary + 1]} first={props.main} second={props.secondary + 1} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastlySelectedId={props.getLastlySelectedId} setLastlySelectedId={props.setLastlySelectedId} playable={props.playableBoard[props.main][props.secondary + 1]}/>
                <Number value={props.numbers[props.main][props.secondary + 2]} first={props.main} second={props.secondary + 2} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastlySelectedId={props.getLastlySelectedId} setLastlySelectedId={props.setLastlySelectedId} playable={props.playableBoard[props.main][props.secondary + 2]}/>
            </div>
            <div className="horizontal-direction">
                <Number value={props.numbers[props.main + 1][props.secondary]} first={props.main + 1} second={props.secondary} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastlySelectedId={props.getLastlySelectedId} setLastlySelectedId={props.setLastlySelectedId} playable={props.playableBoard[props.main + 1][props.secondary]}/>
                <Number value={props.numbers[props.main + 1][props.secondary + 1]} first={props.main + 1} second={props.secondary + 1} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastlySelectedId={props.getLastlySelectedId} setLastlySelectedId={props.setLastlySelectedId} playable={props.playableBoard[props.main + 1][props.secondary + 1]}/>
                <Number value={props.numbers[props.main + 1][props.secondary + 2]} first={props.main + 1} second={props.secondary + 2} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastlySelectedId={props.getLastlySelectedId} setLastlySelectedId={props.setLastlySelectedId} playable={props.playableBoard[props.main + 1][props.secondary + 2]}/>
            </div>
            <div className="horizontal-direction">
                <Number value={props.numbers[props.main + 2][props.secondary]} first={props.main + 2} second={props.secondary} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastlySelectedId={props.getLastlySelectedId} setLastlySelectedId={props.setLastlySelectedId} playable={props.playableBoard[props.main + 2][props.secondary]}/>
                <Number value={props.numbers[props.main + 2][props.secondary + 1]} first={props.main + 2} second={props.secondary + 1} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastlySelectedId={props.getLastlySelectedId} setLastlySelectedId={props.setLastlySelectedId} playable={props.playableBoard[props.main + 2][props.secondary + 1]}/>
                <Number value={props.numbers[props.main + 2][props.secondary + 2]} first={props.main + 2} second={props.secondary + 2} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastlySelectedId={props.getLastlySelectedId} setLastlySelectedId={props.setLastlySelectedId} playable={props.playableBoard[props.main + 2][props.secondary + 2]}/>
            </div>
        </div>
    );
};

const Table = (props) => {
    return (
        <div className="table-container vertical-direction">
            <div className="horizontal-direction">
                <Square main={0} secondary={0} numbers={props.table} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastlySelectedId={props.getLastlySelectedId} setLastlySelectedId={props.setLastlySelectedId} playableBoard={props.playableBoard}/>
                <Square main={0} secondary={3} numbers={props.table} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastlySelectedId={props.getLastlySelectedId} setLastlySelectedId={props.setLastlySelectedId} playableBoard={props.playableBoard}/>
                <Square main={0} secondary={6} numbers={props.table} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastlySelectedId={props.getLastlySelectedId} setLastlySelectedId={props.setLastlySelectedId} playableBoard={props.playableBoard}/>
            </div>
            <div className="horizontal-direction">
                <Square main={3} secondary={0} numbers={props.table} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastlySelectedId={props.getLastlySelectedId} setLastlySelectedId={props.setLastlySelectedId} playableBoard={props.playableBoard}/>
                <Square main={3} secondary={3} numbers={props.table} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastlySelectedId={props.getLastlySelectedId} setLastlySelectedId={props.setLastlySelectedId} playableBoard={props.playableBoard}/>
                <Square main={3} secondary={6} numbers={props.table} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastlySelectedId={props.getLastlySelectedId} setLastlySelectedId={props.setLastlySelectedId} playableBoard={props.playableBoard}/>
            </div>
            <div className="horizontal-direction">
                <Square main={6} secondary={0} numbers={props.table} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastlySelectedId={props.getLastlySelectedId} setLastlySelectedId={props.setLastlySelectedId} playableBoard={props.playableBoard}/>
                <Square main={6} secondary={3} numbers={props.table} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastlySelectedId={props.getLastlySelectedId} setLastlySelectedId={props.setLastlySelectedId} playableBoard={props.playableBoard}/>
                <Square main={6} secondary={6} numbers={props.table} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastlySelectedId={props.getLastlySelectedId} setLastlySelectedId={props.setLastlySelectedId} playableBoard={props.playableBoard}/>
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
    //const [lastlySelectedId, setLastlySelectedId] = React.useState(null);
    let lastlySelectedId = null;
    const setLastlySelectedId = (newValue) => { lastlySelectedId = newValue; }
    let selectedId = null;
    const setSelectedId = (newValue) => {selectedId = newValue;}
    const [newGame, setNewGame] = React.useState(0);
    const [update, setUpdate] = React.useState(0);

    console.log(selectedId);

    const getSelectedId = () => { return selectedId; }
    const getLastlySelectedId = () => { return lastlySelectedId; }
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

    React.useEffect(() => {
        console.log(selectedId);
    }, [update]);

    if (board != null) {
        localStorage.setItem("gameBoard", JSON.stringify(board));
    }
    if (solvedBoard != null) {
        localStorage.setItem("solvedGameBoard", JSON.stringify(solvedBoard));
    }
    if (playableBoard != null) {
        localStorage.setItem("playableGameBoard", JSON.stringify(playableBoard));
    }

    window.addEventListener('keydown', (event) => {
        if (event.key >= 0 && event.key <= 9) {
            let IdToAdd = separateId();
            if (IdToAdd != null) {
                let boardToAdd = cloneDeep(board);
                boardToAdd[IdToAdd[0]][IdToAdd[1]] = parseInt(event.key);
                setBoard(cloneDeep(boardToAdd));
                setUpdate(update + 1);
            }
        }
    });
    if (board != null && playableBoard != null) {
        return (
            <div className="main-container">
                <div className="menu-area">
                    <h1 className="headline-1">Sudoku</h1>
                    <button className="play-button" onClick={() => startTheGame()}>
                        <p className="text-button">Play</p>
                    </button>
                </div>
                <div className="game-area" id="game">
                    <h1 className="headline-1">Sudoku</h1>
                    <Table table={board} getSelectedId={getSelectedId} setSelectedId={setSelectedId} getLastlySelectedId={getLastlySelectedId} setLastlySelectedId={setLastlySelectedId} playableBoard={playableBoard}/>
                    <div className="button-area">
                        <button onClick={() => {let newSolvedBoard = makingBoard(); setSolvedBoard(cloneDeep(newSolvedBoard)); let newBoard = deletingNumbers(newSolvedBoard); setBoard(cloneDeep(newBoard)); setNewGame(1)}}>
                            New Game
                        </button>
                        <button onClick={() => {console.log(solvedBoard)}}>
                            Solved
                        </button>
                        <button onClick={() => {console.log(board); console.log(playableBoard);}}>
                            Unsolved
                        </button>
                        <button onClick={() => {setUpdate(update + 1);}}>
                            Update
                        </button>
                    </div>
                </div>
            </div>
        )
    };
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game/>);

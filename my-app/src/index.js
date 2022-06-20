import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import makingBoard from './makingBoard';

const handleSelect = (id, getLastIndex, setLastIndex, setSelectedId) => {
    setSelectedId(id);
    let elemToAdd = document.getElementById(id);
    let oldIndex = getLastIndex();
    let elem = document.createElement('Circle');
    elem.classList.add("circle");
    if (oldIndex !== null) {
        let elemToDelete = document.getElementById(oldIndex);
        elemToDelete.removeChild(elemToDelete.firstChild);
    }
    elemToAdd.appendChild(elem);
    setLastIndex(id);
};

const Number = (props) => {
    let id = "" + props.first + props.second;
    id = parseInt(id);
    let playable = true;
    if (props.value !== 0) {
        playable = false;
    }
    if (playable) {
        return (
            <div className="number-container playable" id={id} onClick={() => handleSelect(id, props.getLastlySelectedId, props.setLastlySelectedId, props.setSelectedId)}>
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
                <Number value={props.numbers[props.main][props.secondary]} first={props.main} second={props.secondary} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastlySelectedId={props.getLastlySelectedId} setLastlySelectedId={props.setLastlySelectedId}/>
                <Number value={props.numbers[props.main][props.secondary + 1]} first={props.main} second={props.secondary + 1} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastlySelectedId={props.getLastlySelectedId} setLastlySelectedId={props.setLastlySelectedId}/>
                <Number value={props.numbers[props.main][props.secondary + 2]} first={props.main} second={props.secondary + 2} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastlySelectedId={props.getLastlySelectedId} setLastlySelectedId={props.setLastlySelectedId}/>
            </div>
            <div className="horizontal-direction">
                <Number value={props.numbers[props.main + 1][props.secondary]} first={props.main + 1} second={props.secondary} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastlySelectedId={props.getLastlySelectedId} setLastlySelectedId={props.setLastlySelectedId}/>
                <Number value={props.numbers[props.main + 1][props.secondary + 1]} first={props.main + 1} second={props.secondary + 1} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastlySelectedId={props.getLastlySelectedId} setLastlySelectedId={props.setLastlySelectedId}/>
                <Number value={props.numbers[props.main + 1][props.secondary + 2]} first={props.main + 1} second={props.secondary + 2} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastlySelectedId={props.getLastlySelectedId} setLastlySelectedId={props.setLastlySelectedId}/>
            </div>
            <div className="horizontal-direction">
                <Number value={props.numbers[props.main + 2][props.secondary]} first={props.main + 2} second={props.secondary} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastlySelectedId={props.getLastlySelectedId} setLastlySelectedId={props.setLastlySelectedId}/>
                <Number value={props.numbers[props.main + 2][props.secondary + 1]} first={props.main + 2} second={props.secondary + 1} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastlySelectedId={props.getLastlySelectedId} setLastlySelectedId={props.setLastlySelectedId}/>
                <Number value={props.numbers[props.main + 2][props.secondary + 2]} first={props.main + 2} second={props.secondary + 2} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastlySelectedId={props.getLastlySelectedId} setLastlySelectedId={props.setLastlySelectedId}/>
            </div>
        </div>
    );
};

const Table = (props) => {
    return (
        <div className="table-container vertical-direction">
            <div className="horizontal-direction">
                <Square main={0} secondary={0} numbers={props.table} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastlySelectedId={props.getLastlySelectedId} setLastlySelectedId={props.setLastlySelectedId}/>
                <Square main={0} secondary={3} numbers={props.table} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastlySelectedId={props.getLastlySelectedId} setLastlySelectedId={props.setLastlySelectedId}/>
                <Square main={0} secondary={6} numbers={props.table} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastlySelectedId={props.getLastlySelectedId} setLastlySelectedId={props.setLastlySelectedId}/>
            </div>
            <div className="horizontal-direction">
                <Square main={3} secondary={0} numbers={props.table} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastlySelectedId={props.getLastlySelectedId} setLastlySelectedId={props.setLastlySelectedId}/>
                <Square main={3} secondary={3} numbers={props.table} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastlySelectedId={props.getLastlySelectedId} setLastlySelectedId={props.setLastlySelectedId}/>
                <Square main={3} secondary={6} numbers={props.table} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastlySelectedId={props.getLastlySelectedId} setLastlySelectedId={props.setLastlySelectedId}/>
            </div>
            <div className="horizontal-direction">
                <Square main={6} secondary={0} numbers={props.table} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastlySelectedId={props.getLastlySelectedId} setLastlySelectedId={props.setLastlySelectedId}/>
                <Square main={6} secondary={3} numbers={props.table} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastlySelectedId={props.getLastlySelectedId} setLastlySelectedId={props.setLastlySelectedId}/>
                <Square main={6} secondary={6} numbers={props.table} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastlySelectedId={props.getLastlySelectedId} setLastlySelectedId={props.setLastlySelectedId}/>
            </div>
        </div>
    );
};

const startTheGame = (makeBoard) => {
    makeBoard(makingBoard);
    let elem = document.getElementById("game");
    elem.scrollIntoView();
};

const Game =() => {
    const [board, makeBoard] = React.useState(null);
    const [lastlySelectedId, setLastlySelectedId] = React.useState(null);
    const [selectedId, setSelectedId] = React.useState(null);
    const [update, setUpdate] = React.useState(0);
    const [gameStarted, setGameStarted] = React.useState(0);

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

    let IdToAdd = separateId();
    if (IdToAdd != null) {
        console.log("main: " + IdToAdd[0] + " | secondary: " + IdToAdd[1]);
    }

    window.addEventListener('keydown', (event) => {
        if (event.key >= 0 && event.key <= 9) {
            let IdToAdd = separateId();
            if (IdToAdd != null) {
                console.log("main: " + IdToAdd[0] + " | secondary: " + IdToAdd[1]);
            }
        }
    });

    if (gameStarted == 0) {
        makeBoard([[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]]);
        setGameStarted(1);
    }
    if (board != null) {
        return (
            <div className="main-container">
                <div className="menu-area">
                    <h1 className="headline-1">Sudoku</h1>
                    <button className="play-button" onClick={() => startTheGame(makeBoard)}>
                        <p className="text-button">Play</p>
                    </button>
                </div>
                <div className="game-area" id="game">
                    <h1 className="headline-1">Sudoku</h1>
                    <Table table={board} getSelectedId={getSelectedId} setSelectedId={setSelectedId} getLastlySelectedId={getLastlySelectedId} setLastlySelectedId={setLastlySelectedId}/>
                    <div className="button-area">
                        
                    </div>
                </div>
            </div>
        )
    };
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game/>);

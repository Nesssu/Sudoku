import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import makingBoard from './makingBoard';

const handleSelect = (id, getLastIndex, setLastIndex, setSelectedId, getSelectedId) => {
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

    if (getSelectedId() != null && getSelectedId() == id) {
        let selectedElem = document.getElementById(id);
        document.addEventListener('keydown', function(event) {
            if (event.keyCode <= 57 && event.keyCode >= 49) {
                selectedElem.innerHTML = event.key;
            }
        });
    }
};

const Number = (props) => {
    let playable = true;
    let id = "" + props.first + props.second;
    id = parseInt(id);
    if (props.value !== 0) {
        playable = false;
    }
    if (playable) {
        return (
            <div className="number-container playable" id={id} onClick={() => handleSelect(id, props.getLastIndex, props.setLastIndex, props.setSelectedId, props.getSelectedId)}>
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
                <Number value={props.numbers[props.main][props.secondary]} first={props.main} second={props.secondary} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastIndex={props.getLastIndex} setLastIndex={props.setLastIndex}/>
                <Number value={props.numbers[props.main][props.secondary + 1]} first={props.main} second={props.secondary + 1} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastIndex={props.getLastIndex} setLastIndex={props.setLastIndex}/>
                <Number value={props.numbers[props.main][props.secondary + 2]} first={props.main} second={props.secondary + 2} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastIndex={props.getLastIndex} setLastIndex={props.setLastIndex}/>
            </div>
            <div className="horizontal-direction">
                <Number value={props.numbers[props.main + 1][props.secondary]} first={props.main + 1} second={props.secondary} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastIndex={props.getLastIndex} setLastIndex={props.setLastIndex}/>
                <Number value={props.numbers[props.main + 1][props.secondary + 1]} first={props.main + 1} second={props.secondary + 1} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastIndex={props.getLastIndex} setLastIndex={props.setLastIndex}/>
                <Number value={props.numbers[props.main + 1][props.secondary + 2]} first={props.main + 1} second={props.secondary + 2} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastIndex={props.getLastIndex} setLastIndex={props.setLastIndex}/>
            </div>
            <div className="horizontal-direction">
                <Number value={props.numbers[props.main + 2][props.secondary]} first={props.main + 2} second={props.secondary} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastIndex={props.getLastIndex} setLastIndex={props.setLastIndex}/>
                <Number value={props.numbers[props.main + 2][props.secondary + 1]} first={props.main + 2} second={props.secondary + 1} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastIndex={props.getLastIndex} setLastIndex={props.setLastIndex}/>
                <Number value={props.numbers[props.main + 2][props.secondary + 2]} first={props.main + 2} second={props.secondary + 2} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastIndex={props.getLastIndex} setLastIndex={props.setLastIndex}/>
            </div>
        </div>
    );
};

const Table = (props) => {
    return (
        <div className="table-container vertical-direction">
            <div className="horizontal-direction">
                <Square main={0} secondary={0} numbers={props.table} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastIndex={props.getLastIndex} setLastIndex={props.setLastIndex}/>
                <Square main={0} secondary={3} numbers={props.table} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastIndex={props.getLastIndex} setLastIndex={props.setLastIndex}/>
                <Square main={0} secondary={6} numbers={props.table} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastIndex={props.getLastIndex} setLastIndex={props.setLastIndex}/>
            </div>
            <div className="horizontal-direction">
                <Square main={3} secondary={0} numbers={props.table} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastIndex={props.getLastIndex} setLastIndex={props.setLastIndex}/>
                <Square main={3} secondary={3} numbers={props.table} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastIndex={props.getLastIndex} setLastIndex={props.setLastIndex}/>
                <Square main={3} secondary={6} numbers={props.table} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastIndex={props.getLastIndex} setLastIndex={props.setLastIndex}/>
            </div>
            <div className="horizontal-direction">
                <Square main={6} secondary={0} numbers={props.table} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastIndex={props.getLastIndex} setLastIndex={props.setLastIndex}/>
                <Square main={6} secondary={3} numbers={props.table} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastIndex={props.getLastIndex} setLastIndex={props.setLastIndex}/>
                <Square main={6} secondary={6} numbers={props.table} getSelectedId={props.getSelectedId} setSelectedId={props.setSelectedId} getLastIndex={props.getLastIndex} setLastIndex={props.setLastIndex}/>
            </div>
        </div>
    );
};

const scrollToGame = () => {
    let elem = document.getElementById("game");
    elem.scrollIntoView();
};

class Game extends React.Component {
    board = makingBoard();
    lastlySelectedIndex = null;
    selectedIndex = null;
    getLastIndex = () => { return this.lastlySelectedIndex; }
    setLastIndex = (newIndex) => { this.lastlySelectedIndex = newIndex; }
    getSelectedId = () => { return this.selectedIndex; }
    setSelectedId = (index) => { this.selectedIndex = index; }

    render () {
        if (this.selectedIndex != null) {
            let selectedElem = document.getElementById(this.selectedIndex);
            document.addEventListener('keydown', function(event) {
                if (event.keyCode <= 57 && event.keyCode >= 49) {
                    selectedElem.innerHTML = event.key;
                }
            });
        }
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
                    <Table table={this.board} getSelectedId={this.getSelectedId} setSelectedId={this.setSelectedId} getLastIndex={this.getLastIndex} setLastIndex={this.setLastIndex}/>
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

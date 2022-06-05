import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import makingBoard from './makingBoard';

const handleClick = (id) => {
    let elem = document.getElementById(id);
    
}

const Number = (props) => {
    let playable = true;
    let id = "" + props.first + props.second;
    id = parseInt(id);
    if (props.value !== 0) {
        playable = false;
    }
    if (playable) {
        return (
            <div className="number-container" id={id} onClick={() => handleClick(id)}>
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
                <Number value={props.numbers[props.main][props.secondary]} first={props.main} second={props.secondary}/>
                <Number value={props.numbers[props.main][props.secondary + 1]} first={props.main} second={props.secondary + 1}/>
                <Number value={props.numbers[props.main][props.secondary + 2]} first={props.main} second={props.secondary + 2}/>
            </div>
            <div className="horizontal-direction">
                <Number value={props.numbers[props.main + 1][props.secondary]} first={props.main + 1} second={props.secondary}/>
                <Number value={props.numbers[props.main + 1][props.secondary + 1]} first={props.main + 1} second={props.secondary + 1}/>
                <Number value={props.numbers[props.main + 1][props.secondary + 2]} first={props.main + 1} second={props.secondary + 2}/>
            </div>
            <div className="horizontal-direction">
                <Number value={props.numbers[props.main + 2][props.secondary]} first={props.main + 2} second={props.secondary}/>
                <Number value={props.numbers[props.main + 2][props.secondary + 1]} first={props.main + 2} second={props.secondary + 1}/>
                <Number value={props.numbers[props.main + 2][props.secondary + 2]} first={props.main + 2} second={props.secondary + 2}/>
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

class Game extends React.Component {
    board = makingBoard();

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
                    <Table table={this.board}/>
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

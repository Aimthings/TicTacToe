import React from 'react';

import Board from './Board';
import Header from './Header';
import StatusArea from './StatusArea';
import FeatureButtons from './FeatureButtons';

import '../componentsCss/game.css';

class Game extends React.Component {
    state = {
        xisNext: true,                                                //Who's turn next
        curStateBox: [ { squares: Array(9).fill(null) } ],            //All States of the box       
        future: [ { squares: Array(9).fill(null) } ],                 //Updated value storage for redo
    };

    SquareClicked(i) {
        const { xisNext, curStateBox, future } = this.state;
        const history = curStateBox.slice(0, curStateBox.length);
        const current = history[ history.length - 1 ];
        const squares = current.squares.slice();

        let Winner;

        if (curStateBox.length > 5)
            Winner = WinnerCalculator(squares);                  //if winner or a value is set in the square,return no need to change the state further 

        if (Winner || squares[ i ])
            return;

        squares[ i ] = xisNext ? 'X' : 'O';

        if (future.length - 1) {                                //Redo if after Undo ,a new position of square is selected for X/O
            const forindex = future[ 0 ].squares.slice();
            const newFuture = future.slice(1);
            let index = 0;

            while (index < 9) {
                if (squares[ index ] === null && forindex[ index ] !== null)
                    break;
                ++index;
            }

            for (let j = 0; j < newFuture.length - 1; ++j)        //Update all the values of future with new position as selected
            {
                newFuture[ j ].squares[ index ] = null;
                newFuture[ j ].squares[ i ] = squares[ i ];
            }
            this.setState({                                   //Update the state accordignly             
                future: newFuture
            })
        }

        this.setState({                                     //Update the curStateBox array with new state of playing box
            xisNext: !xisNext,
            curStateBox: [ ...curStateBox, { squares } ]
        });
    }

    reset() {                                                //Reset all the state properties when reset is clicked
        this.setState({
            xisNext: true,
            curStateBox: [ { squares: Array(9).fill(null) } ],
            future: [ { squares: Array(9).fill(null) } ],
        });
    }

    Undo() {
        const { curStateBox, xisNext, future } = this.state;
        const present = curStateBox[ curStateBox.length - 1 ];          //Store the present value as it may be require for redo purpose push in the future array
        const newPast = curStateBox.slice(0, curStateBox.length - 1);   //Update the curStateBox 

        this.setState({
            xisNext: !xisNext,
            curStateBox: newPast,
            future: [ present, ...future ],
        });
    }

    Redo() {
        const { future, xisNext, curStateBox } = this.state;
        const Next = future[ 0 ];                  //Store the first value which was present(in the future array) and append into the curStateBox
        const newFuture = future.slice(1);         //Remove the extracted value from the futrue

        this.setState({
            xisNext: !xisNext,
            curStateBox: [ ...curStateBox, Next ],
            future: newFuture
        });
    }

    render() {
        const { curStateBox, xisNext, future } = this.state;
        const current = curStateBox[ curStateBox.length - 1 ];

        let ResetOrPlayAgain = 'Reset';
        let Undoenable = curStateBox.length - 1;       //Undobutton and redobutton ,disabled if player wins or when curStateBox or future at their intial values
        let Redoenable = future.length - 1;
        let status = (xisNext ? 'X' : 'O') + ':Next Turn';

        if (!Undoenable)
            status = "Start game with X:Click Square";

        if ((curStateBox.length) > 5) {                            //Atleast 3 Steps required to win the game or draw
            const Winner = WinnerCalculator(current.squares);
            if (Winner) {
                status = Winner === 'X' ? 'X:Wins the Game' : 'O:Wins the Game';
                ResetOrPlayAgain = 'Play Again';
                Undoenable = Redoenable = 0;
            } else if (curStateBox.length > 9) {
                status = 'Match is Draw';
            }
        }

        return (
            <div className="game">
                <Header />
                <div className="BoxandStatus">
                    <div className="PlayBox">
                        <Board onClick={(i) => this.SquareClicked(i)} squares={current.squares} />
                        <FeatureButtons onUndo={() => this.Undo()} onReset={() => this.reset()} onRedo={() => this.Redo()}
                            undisb={!Undoenable} rdodisb={!(Redoenable)} resetdisb={!(curStateBox.length - 1) && !(Redoenable)} value={ResetOrPlayAgain} />
                    </div>
                    <StatusArea value={status} />
                </div>
            </div>
        );
    }
}

const WinnerCalculator = (squares) => {
    const ValidLines = [
        [ 0, 1, 2 ],
        [ 3, 4, 5 ],
        [ 6, 7, 8 ],
        [ 0, 4, 8 ],
        [ 2, 4, 6 ],
        [ 0, 3, 6 ],
        [ 1, 4, 7 ],
        [ 2, 5, 8 ]
    ];

    let Winner = null;

    ValidLines.forEach(line => {
        const [ sqone, sqtwo, sqthree ] = line;
        if (squares[ sqone ] && squares[ sqone ] === squares[ sqtwo ] && squares[ sqtwo ] === squares[ sqthree ]) {
            Winner = squares[ sqone ];
        }
    });
    return Winner;
}

export default Game;

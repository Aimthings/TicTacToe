import React from 'react';

import Square from './Square';

class Board extends React.Component{
    SquareRender=(list)=>(
        list.map(item=><Square key={item} value={this.props.squares[item]} onClick={()=>this.props.onClick(item)}/>)       
    );
    render(){
        return (
            <div className="Box">
                <div className="board-row">
                    {this.SquareRender([0,1,2])}
                </div>
                <div className="board-row">
                    {this.SquareRender([3,4,5])}
                </div>
                <div className="board-row">
                    {this.SquareRender([6,7,8])}
                </div>
            </div>  
        );
    }
}

export default Board;
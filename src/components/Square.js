import React from 'react';

import '../componentsCss/square.css';

const Square=({onClick,value})=>{
      return(
          <button className="square" data-pro={value} onClick={onClick}>{value}</button>
      );
}

export default Square;
import React from 'react';

import '../componentsCss/statusArea.css'

const StatusArea=({value})=>{
    return (
        <div className="StatusSide">
                <button className="Status" value={value}>
                    {value}
                </button>
        </div> 
    );
}

export default StatusArea;
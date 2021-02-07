import React from 'react';

import '../componentsCss/featureButtons.css';

const FeatureButtons = ({ onUndo, onRedo, onReset, undisb, rdodisb, resetdisb, value }) => {
    return (
        <div className="Feature-Buttons">
            <div>
                <button className="feature" onClick={onUndo} disabled={undisb} value={value}>
                    Undo
                </button>
            </div>
            <div>
                <button className="feature" onClick={onReset} disabled={resetdisb}>
                    {value}
                </button>
            </div>
            <div>
                <button className="feature" onClick={onRedo} disabled={rdodisb} value={value}>
                    Redo
            </button>
            </div>
        </div>
    );
}

export default FeatureButtons;

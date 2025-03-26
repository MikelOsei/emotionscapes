import React from "react";
import { useState } from "react";


function SubmissionBar(visibility = true) {
    const [isVisible, setVisible] = useState(visibility);

    return (
        <div id="input-submit" style={{top: "50vh", position: "absolute", zIndex: "10"}}>
            <button className="hide-show" onClick={() => setVisible(!isVisible)}>
                {isVisible ? "Hide" : "Show"}
            </button>
            {isVisible && (
                <div>
                    <input type="text" className="input-box" placeholder="How does this image make you feel?"></input>
                    <button className="next" id="player-option">Next</button> 
                </div>
            )}
        </div>
    );
}

export default SubmissionBar;
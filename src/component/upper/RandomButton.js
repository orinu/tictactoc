import React from "react";

const RandomButton = ({ randomHandler }) => {
    return (
        <button className="button" onClick={randomHandler}>
            בחר אקראית
        </button>
    )
}

export default RandomButton

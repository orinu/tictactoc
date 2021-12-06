import React from "react";

const BackButton = ({ backHandler }) => {
    return (
        <button className="button" onClick={backHandler}>
            צעד אחורה
        </button>
    )
}

export default BackButton
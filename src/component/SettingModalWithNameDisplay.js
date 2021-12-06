import React from "react";
import Modal from "./Modal/StartModal";
import NameDisplay from "./dataDisplay/NameDisplay";

function SettingWithName({ resetTimer, setModalClose }) {
    return (
        <div className="playerName">
            <Modal resetTimer={resetTimer} setModalClose={setModalClose} />
            <NameDisplay player={2} />
        </div>
    )
}

export default SettingWithName;

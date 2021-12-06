import React, { useState } from "react";
import { Button, Input, Modal, Icon } from "semantic-ui-react";
import { useDispatch } from "react-redux";

import makeStateArray from "../../utils/utils";
import { startGame } from "../../store/action";
import "./Modal.css";

function ModalExampleModal({ resetTimer, setModalClose }) {
  const [open, setOpen] = useState(true);
  const [boxNumber, setBoxNumber] = useState(3);
  const [player1Name, setPlayer1Name] = useState("player 1");
  const [player2Name, setPlayer2Name] = useState("player 2");
  const [time, setTime] = useState(20);

  const dispatch = useDispatch();

  // Regex int only
  const boxSizeHandler = (e) => {
    const re = /^[0-9\b]+$/;
    if (e === "" || re.test(e)) {
      setBoxNumber(e);
    }
  };

  // Regex int only
  const timeHandler = (e) => {
    const re = /^[0-9\b]+$/;
    if (re.test(e)) {
      setTime(e);
    }
  };

  // on submit
  const submitHandler = () => {
    dispatch(
      startGame({
        boxNumber,
        time,
        player1Name,
        player2Name,
        stateArray: makeStateArray(boxNumber),
        stackArray: [],
      })
    );
    setModalClose(true);
    resetTimer();
    setOpen(false);
  };

  return (
    <div id="setting">
      <Modal
        onClose={() => {
          setModalClose(true);
          setOpen(false);
        }}
        onOpen={() => {
          setModalClose(false);
          setOpen(true);
        }}
        closeOnDimmerClick={false}
        open={open}
        trigger={
          <Button className="button" style={{ backgroundColor: "transparent" }}>
            <Icon name="setting" size="huge" style={{ color: "white" }} />
          </Button>
        }
      >
        <Modal.Header>
          <div className="header-modal">
            <span> Tic Tac Toe</span>
            <Icon
              onClick={() => {
                setModalClose(true);
                setOpen(false);
              }}
              link
              name="close"
            />
          </div>
        </Modal.Header>
        <Modal.Content style={{ textAlign: "right", direction: "rtl" }}>
          <Modal.Description>
            <h2>עוד רגע מתחילים לשחק</h2>
            <h3>הכנס את הנתונים הבאים:</h3>
            <div className="input-form">
              <Input
                className="input-modal"
                icon="tags"
                value={boxNumber}
                iconPosition="left"
                label={{ tag: true, content: "גודל המשחק" }}
                labelPosition="left"
                placeholder="עבור 5X5 הזן 5"
                onChange={(numberInput) => {
                  boxSizeHandler(numberInput.target.value);
                }}
              />
              <Input
                className="input-modal"
                icon="gamepad"
                value={player1Name}
                iconPosition="left"
                label={{ tag: true, content: "שם שחקן 1" }}
                labelPosition="left"
                placeholder="הזן שם שחקן"
                onChange={(player1NameInput) => {
                  setPlayer1Name(player1NameInput.target.value);
                }}
              />
              <Input
                className="input-modal"
                icon="gamepad"
                iconPosition="left"
                value={player2Name}
                label={{ tag: true, content: "שם שחקן 2" }}
                labelPosition="left"
                placeholder="הזן שם שחקן"
                onChange={(player2NameInput) => {
                  setPlayer2Name(player2NameInput.target.value);
                }}
              />
              <Input
                className="input-modal"
                icon="time"
                iconPosition="left"
                value={time}
                label={{ tag: true, content: "שניות לתור" }}
                labelPosition="left"
                onChange={(timeInput) => {
                  timeHandler(timeInput.target.value);
                }}
              />
            </div>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions style={{ display: "flex" }}>
          <Button
            style={{ backgroundColor: "#14213d" }}
            content="התחל"
            labelPosition="left"
            icon="angle left"
            onClick={submitHandler}
            positive
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default ModalExampleModal;

import React, { useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { makeStateArray } from "../utils/utils";
import * as actions from "../store/action";
import "./Modal.css";

function ModalWinner({tie , playerName }) {
  const dispatch = useDispatch();
  // modal open close
  const [open, setOpen] = useState(true);
  // get boxNumber from redux
  const boxNumber = useSelector((state) => state.boxNumber);

  // submit handler
  const buttonHandler = () => {
    dispatch(
      actions.startGame({
        stateArray: makeStateArray(boxNumber),
        stackArray: [],
      })
    );
    setOpen(false);
  };

  return (
    <Modal
      onClose={() => {
        setOpen(false);
      }}
      onOpen={() => {
        setOpen(true);
      }}
      open={open}
      size="mini"
      closeOnDimmerClick={false}
    >
      <Modal.Header>Tic Tac Toe </Modal.Header>
      <Modal.Content style={{ textAlign: "right", direction: "rtl" }}>
        <Modal.Description style={{ textAlign: "center" }}>
          {tie ? (
            <div>
              <h2>תיקו</h2>
              <h1>כמה זה כבר קשה לנצח באיקס עיגול?</h1>
            </div>
          ) : (
            <div>
              <h2>ברכות לזוכים</h2>
              <h1>{playerName} ניצח!</h1>
            </div>
          )}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions style={{ display: "flex" }}>
        <Button
          style={{ backgroundColor: "#14213d" }}
          content="התחל משחק חדש"
          labelPosition="left"
          icon="game"
          color="black"
          onClick={buttonHandler}
          fluid
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default ModalWinner;

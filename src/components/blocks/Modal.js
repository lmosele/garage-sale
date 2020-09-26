import React, { useState } from "react";
import styled from "styled-components";
import { Row, Col } from "react-flexbox-grid";
import SheetDb from "sheetdb-js";

import UISlider from "./UISlider";

const Modal = styled.div`
  z-index: 5;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 75%;
  padding: 30px;
  min-height: 500px;
  max-height: 900px;
  max-height: 90vh;
  overflow-y: scroll;
  overflow-x: hidden;
  background: white;
  border-radius: 6px;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModalBackground = styled.div`
  display: block;
  background: black;
  opacity: 0.6;
  width: 100%;
  position: absolute;
  height: 100vh;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 4;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  input {
    margin: 5px;
    height: 30px;
    border-radius: 0;
    margin-left: 0;
  }
`;

const Inputs = ({ formState, status, onClose, onChange, onSubmit }) => {
  if (status === "success") {
    return (
      <div>
        {`Thanks for your bid of ${formState.bid} ${formState.userName}! You will be contacted by email or
        text soon if you are the highest bidder.`}
        <button onClick={onClose}>Close</button>
      </div>
    );
  }
  if (status === "error") {
    return (
      <div>
        Oops, I broke something (thats what happens when you build an app in a
        day). Refresh and if you can't fix it shoot me a message at
        lucasmosele@gmail.com
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        name="userName"
        placeholder="Your name"
        onChange={onChange}
        type="text"
      />
      <input
        name="userEmail"
        placeholder="Your Email"
        onChange={onChange}
        type="email"
      />
      <input
        name="bid"
        placeholder="Your Bid"
        onChange={onChange}
        type="number"
      />
      <input
        name="userPhone"
        placeholder="(Optional) - Your Phone #"
        onChange={onChange}
        type="text"
      />
      <button>Send Bid</button>
    </form>
  );
};

const UIModal = ({ modalState, handleClose }) => {
  const [formState, setFormState] = useState({
    userName: null,
    userEmail: null,
    bid: null,
    bidTime: null,
    userPhone: null,
    itemId: null,
    itemName: null,
  });
  const [formStatus, setStatus] = useState(null);

  const handleChange = ({ target }) => {
    setFormState((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const time = Date.now();
    setFormState((prev) => ({
      ...prev,
      bidTime: time,
      itemId: modalState.id,
      itemName: modalState.itemName,
    }));
    setStatus("success");

    // SheetDb.write("https://sheetdb.io/api/v1/m59ar6rgiqwz8", {
    //   data: formState,
    // }).then(
    //   (result) => {
    //     console.log(result);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  };
  console.log(formState);

  return (
    <React.Fragment>
      <Modal>
        <Row between="xs">
          <Col>Bid On Item</Col>
          <Col>
            <button onClick={handleClose}>x</button>
          </Col>
        </Row>
        <Row>
          <UISlider height={400}>
            <UISlider.Item index={0}>
              <img src={modalState.image1} />
            </UISlider.Item>
            <UISlider.Item index={1}>
              <img src={modalState.image1} />
            </UISlider.Item>
            <UISlider.Item index={2}>
              <img src={modalState.image1} />
            </UISlider.Item>
          </UISlider>
        </Row>
        <ModalContainer>
          <Row>
            <Col xs={7}>
              <h2>{modalState.itemName}</h2>
              <span>Current Bid: {modalState.highestBid}</span>
              <p>{modalState.itemDescription}</p>
            </Col>
            <Col xs={5}>
              <Inputs
                formState={formState}
                status={formStatus}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onClose={handleClose}
              />
            </Col>
          </Row>
        </ModalContainer>
      </Modal>
      <ModalBackground onClick={handleClose} />
    </React.Fragment>
  );
};

export default UIModal;

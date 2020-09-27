import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Row, Col } from "react-flexbox-grid";
import SheetDb from "sheetdb-js";

import UISlider from "./UISlider";

const Modal = styled.div`
  z-index: 5;
  display: flex;
  flex-direction: column;
  top: 3%;
  bottom: 3%;
  position: fixed;
  overflow-y: scroll;
  overflow-x: hidden;
  left: 50%;
  transform: translateX(-50%);
  width: 75%;
  padding: 30px;
  background: white;
  border-radius: 6px;
  .close {
    padding: 10px;
    cursor: pointer;
    margin-bottom: 5px;
    border-bottom: 1px solid white;
    &:hover {
      border-bottom: 1px solid lightgray;
    }
  }
`;

const ImgBlock = styled.div`
  display: flex;
  width: 250px;
  height: 400px;
  margin: 5px;
  background-image: url(${(props) => props.src});
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 1;
  transition: background-position 0.5s ease-in-out;
`;

const ModalBackground = styled.div`
  display: block;
  background: black;
  opacity: 0.6;
  width: 100%;
  position: fixed;
  height: 100vh;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 4;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  form {
    border-left: 1px solid lightgray;
    padding-left: 20px;
  }
  input {
    display: flex;
    margin-top: 15px;
    height: 30px;
    width: 70%;
    border-radius: 0;
    padding: 4px;
    margin-left: 0;
    border-bottom: 1px solid lightgray;
    & + span {
      display: none;
    }
    &::before {
      width: 20px;
      height: 30px;
      float: left;
      content: "$";
      padding: 3px 4px 3px 3px;
    }
    &:invalid {
      border-bottom: 1px solid red;
      & + span {
        margin-top: 3px;
        color: red;
        font-size: 12px;
        display: block;
      }
    }
    &:active,
    &:focus,
    &:hover {
      background-color: #eee;
      border-bottom: 1px solid #ef8354;
    }
  }
`;

const Bid = styled.h3`
  text-align: right;
  color: #ef8354;
  border-bottom: 1px solid #ef8354;
`;

const Button = styled.button`
  margin-top: 30px;
  padding: 20px;
  width: 75%;
  background: #04a777;
  color: white;
  font-weight: 700;
  font-size: 18px;
  &:disabled {
    background: lightgray;
  }
  &:hover {
    cursor: pointer;
    background: #05c78d;
  }
`;

const Inputs = ({ minBid, formState, status, onClose, onChange, onSubmit }) => {
  if (status === "success") {
    return (
      <div>
        {`Thanks for your bid of ${formState.bid} ${formState.userName}! You will be contacted by email or
        text soon if you are the highest bidder.`}
        <Button onClick={onClose}>Close</Button>
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
    <FormContainer>
      <form onSubmit={onSubmit}>
        <h2>Enter Your Bid</h2>
        <p>Must be greater than current bid.</p>
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
          min={minBid + 1}
          max={10000}
          type="number"
        />
        <span>Value must be above current bid: ${minBid}</span>
        <input
          name="userPhone"
          placeholder="(Optional) - Your Phone #"
          onChange={onChange}
          type="text"
        />
        <Button
          disabled={
            !formState.bid || !formState.userEmail || !formState.userName
          }
        >
          Send Bid
        </Button>
      </form>
    </FormContainer>
  );
};

const UIModal = ({ modalState, handleClose }) => {
  const {
    image1,
    image2,
    image3,
    image4,
    itemName,
    id,
    itemDescription,
    highestBid,
    itemCondition,
  } = modalState;

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

  const handleChange = useCallback(({ target }) => {
    setFormState((prev) => ({ ...prev, [target.name]: target.value }));
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const time = Date.now();
    setFormState((prev) => ({
      ...prev,
      bidTime: time,
      itemId: id,
      itemName: itemName,
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

  return (
    <React.Fragment>
      <Modal>
        <Row around="xs">
          <Col xs={11}>
            <h2>{itemName}</h2>
          </Col>
          <Col xs={1}>
            <button className="close" onClick={handleClose}>
              Close
            </button>
          </Col>
        </Row>
        <Row>
          <Col xs={8}>
            <Bid>Current Bid: ${highestBid}</Bid>
            <p>Condition: {itemCondition}</p>
            <p>{itemDescription}</p>
            <br />
            <UISlider height={400}>
              <UISlider.Item index={0}>
                <ImgBlock src={image1} />
              </UISlider.Item>
              <UISlider.Item index={1}>
                <ImgBlock src={image2} />
              </UISlider.Item>
              <UISlider.Item index={2}>
                <ImgBlock src={image3} />
              </UISlider.Item>
              <UISlider.Item index={3}>
                <ImgBlock src={image4} />
              </UISlider.Item>
            </UISlider>
          </Col>
          <Col xs={4}>
            <Inputs
              minBid={highestBid}
              formState={formState}
              status={formStatus}
              onChange={handleChange}
              onSubmit={handleSubmit}
              onClose={handleClose}
            />
          </Col>
        </Row>
      </Modal>
      <ModalBackground onClick={handleClose} />
    </React.Fragment>
  );
};

export default UIModal;

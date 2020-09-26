import React from "react";
import styled from "styled-components";
import { Row, Col } from "react-flexbox-grid";

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
  height: auto;
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

const SliderImage = styled.div`
  width: 33%;
  height: auto;
`;

const UIModal = ({ modalState, handleClose }) => {
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
              fooo
            </Col>
          </Row>
        </ModalContainer>
      </Modal>
      <ModalBackground onClick={handleClose} />
    </React.Fragment>
  );
};

export default UIModal;

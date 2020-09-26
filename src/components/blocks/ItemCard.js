import React from "react";
import styled from "styled-components";

import UISkeleton from "./UISkeleton";

const CardContainer = styled.div`
  position: relative;
  width: 100%;
  height: 50vh;
  padding: 20px;
`;

const Card = styled.div`
  position: absolute;
  left: 30%;
  top: 30%;
  display: flex;
  flex-direction: column;
  background: white;
  border: 1px solid lightgray;
  border-radius: 6px;
  width: 300px;
  height: auto;
  padding: 10px 20px;
  z-index: 2;
`;

const CardImage = styled.div`
  position: absolute;
  left: 20%;
  top: 20%;
  display: flex;
  max-width: 250px;
  width: 250px;
  height: 300px;
  background-image: url(${(props) => props.src});
  background-position: 50% 50%;
  z-index: 1;
`;

const ItemCard = ({ item, callback }) => {
  const handleCallBack = () => {
    callback(item);
  };

  return (
    <CardContainer role="button" onClick={handleCallBack}>
      <CardImage src={item.image1} />
      <Card>
        {item ? <h2>{item.itemName}</h2> : <UISkeleton />}
        {item ? <span>{item.itemCondition}</span> : <UISkeleton />}
        {item ? <p>{item.itemDescription}</p> : <UISkeleton />}
      </Card>
    </CardContainer>
  );
};

export default ItemCard;

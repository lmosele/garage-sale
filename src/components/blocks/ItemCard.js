import React from "react";
import styled from "styled-components";

import UISkeleton from "./UISkeleton";

const CardImage = styled.div`
  display: flex;
  width: 100%;
  height: 300px;
  background-image: url(${(props) => props.src});
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 1;
  transition: background-position 0.5s ease-in-out;
`;

const Footer = styled.footer`
  padding: 20px;
  span {
    font-weight: 700;
    float: right;
    &:after {
      /* overflow: hidden; */
      display: block;
      content: "";
      width: 100%;
      height: 2px;
      opacity: 0;
      transform: translateX(-100%);
      background: #ef8354;
      transition: all 0.8 ease-in-out;
    }
  }
`;

const Condition = styled.div`
  color: #04a777;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 6px;
  height: auto;
  z-index: 2;
  margin: 20px;
  &:hover {
    cursor: pointer;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
    transition: box-shadow 0.3s ease-in-out;
    ${CardImage} {
      background-position: 100% 100%;
      transition: background-position 1s ease-in-out;
    }
    ${Footer} {
      span {
        &:after {
          opacity: 1;
          transform: translateX(0%);
          transition: transform 0.8 ease-in;
        }
      }
    }
  }
`;

const Content = styled.div`
  padding: 20px;
  height: 200px;
  overflow-y: hidden;
  text-overflow: ellipsis;
  margin-bottom: 20px;
`;

const ItemCard = ({ item, callback }) => {
  const handleCallBack = () => {
    callback(item);
  };

  return (
    <Card role="button" onClick={handleCallBack}>
      <CardImage src={item.image1} />
      <Content>
        {item ? <h2>{item.itemName}</h2> : <UISkeleton />}
        {item ? <Condition>{item.itemCondition}</Condition> : <UISkeleton />}
        {item ? <p>{item.itemDescription}</p> : <UISkeleton />}
      </Content>
      <Footer>
        <span>See More</span>
      </Footer>
    </Card>
  );
};

export default ItemCard;

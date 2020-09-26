import React, { useEffect, useState } from "react";
import SheetDb from "sheetdb-js";
import styled from "styled-components";

import ItemCard from "./components/blocks/ItemCard";
import UIModal from "./components/blocks/Modal";

const Grid = ({ items, callback }) => {
  return items.map((item) => <ItemCard item={item} callback={callback} />);
};

function App(props) {
  const [items, setItems] = useState([]);
  const [modalState, setModalState] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // SheetDb.read("https://sheetdb.io/api/v1/pmtcj1407cc5q", {}).then(
    //   (result) => {
    //     setItems(result);
    //   }
    // );

    const mockResult = [
      {
        id: "1",
        itemName: "Sony A7 Camera Kit",
        itemCondition: "Good",
        itemDescription: "Some long description about cameras",
        image1:
          "https://images.craigslist.org/00E0E_dxuBamfbGu4_0lM0t2_600x450.jpg",
      },
    ];
    setItems(mockResult);
  }, []);

  const getHighestBid = (results) => {
    const bidList = results.map(({ bid }) => bid);
    return {
      highestBid: Math.max(...bidList),
    };
  };

  const handleModalOpen = (item) => {
    if (item.id !== modalState.id) {
      // SheetDb.read("https://sheetdb.io/api/v1/m59ar6rgiqwz8", {
      //   itemId: item.id,
      // }).then((results) => {
      //   const highestBid = getHighestBid(results);
      //   setModalState(Object.assign(item, highestBid));
      // });

      const fakeresults = [
        {
          userEmail: "lucasmosele@gmail.com",
          userName: "Lucas Mosele",
          bid: "700",
          bidTime: "",
          itemName: "Sony A7",
          itemId: "1",
        },
        {
          userEmail: "lucasmosele@gmail.com",
          userName: "Lucas Mosele",
          bid: "500",
          bidTime: "",
          itemName: "Sony A7",
          itemId: "1",
        },
        {
          userEmail: "lucasmosele@gmail.com",
          userName: "Lucas Mosele",
          bid: "300",
          bidTime: "",
          itemName: "Sony A8",
          itemId: "1",
        },
      ];
      const highestBid = getHighestBid(fakeresults);
      setModalState(Object.assign(item, highestBid));
      setModalVisible(true);
    } else {
      setModalVisible(true);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <div>
      {modalVisible === true && (
        <UIModal modalState={modalState} handleClose={handleModalClose} />
      )}
      <Grid items={items} callback={handleModalOpen} />
    </div>
  );
}

export default App;

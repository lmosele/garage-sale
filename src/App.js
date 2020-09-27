import React, { useEffect, useMemo, useState } from "react";
import SheetDb from "sheetdb-js";
import styled from "styled-components";

import { Grid, Row, Col } from "react-flexbox-grid";

import ItemCard from "./components/blocks/ItemCard";
import UIModal from "./components/blocks/Modal";

const IntroParagraph = styled.p`
  text-align: left;
  font-size: 17px;
  color: white;
  a {
    text-decoration: none;
    color: #ef8354;
    padding: 2px 4px;
    border-radius: 2px;
    &:hover {
      background-color: #ef8354;
      color: white;
    }
  }
`;

const IntroLogo = styled.figure`
  display: block;
  margin: 0 auto;
  background: url(https://i.imgur.com/zjpCNPR.png);
  width: 200px;
  height: 100px;
  background-size:cover;
  background-position: 50% 50%;
  margin-top: 40px;
`;

const fakeresults = [
  {
    userEmail: "lucasmosele@gmail.com",
    userName: "Lucas Mosele",
    bid: "650",
    bidTime: "",
    itemName: "Initial Bid",
    itemId: "1",
  },
  {
    userEmail: "lucasmosele@gmail.com",
    userName: "Lucas Mosele",
    bid: "150",
    bidTime: "",
    itemName: "Initial Bid",
    itemId: "2",
  },
  {
    userEmail: "lucasmosele@gmail.com",
    userName: "Lucas Mosele",
    bid: "160",
    bidTime: "",
    itemName: "Initial Bid",
    itemId: "3",
  },
  {
    userEmail: "lucasmosele@gmail.com",
    userName: "Lucas Mosele",
    bid: "600",
    bidTime: "",
    itemName: "Initial Bid",
    itemId: "4",
  },
  {
    userEmail: "lucasmosele@gmail.com",
    userName: "Lucas Mosele",
    bid: "120",
    bidTime: "",
    itemName: "Initial Bid",
    itemId: "5",
  },
  {
    userEmail: "lucasmosele@gmail.com",
    userName: "Lucas Mosele",
    bid: "50",
    bidTime: "",
    itemName: "Initial Bid",
    itemId: "6",
  },
];

const mockResult = [
  {
    id: "1",
    itemName: "Sony A7 Camera Kit",
    itemCondition: "Good",
    itemDescription:
      "Selling my A7 and assorted Accessories. Great for amateur photographers looking to get into mirrorless photography.\n\nIncludes\n- Sony A7 Body\n- Sony 28-70mm Lens (a $300 value)\n- 1 Battery\n- Battery Grip (for extra battery life and portrait shooting)\n- Battery Charger\n- Custom Leather Camera Strap\n\nThe camera is in good shape besides some brassing from the strap clips which is pretty normal for this lineup. The main screen film has some UV damage which is also a known and common quirk with this model but there are no functional issues with the camera and it operates extremely well. I would not be selling it if I did not need a dedicated video camera.\n",
    image1:
      "https://images.craigslist.org/00E0E_dxuBamfbGu4_0lM0t2_600x450.jpg",
    image2:
      "https://images.craigslist.org/00F0F_1mWLni4PBVx_0CI0t2_600x450.jpg",
    image3:
      "https://images.craigslist.org/00b0b_iZ6m3orpiVM_0CI0t2_600x450.jpg",
    image4:
      "https://images.craigslist.org/00x0x_7wE3HSSu2RQ_0CI0t2_600x450.jpg",
  },
  {
    id: "2",
    itemName: "Braemar Chaise Lounge (Black)",
    itemCondition: "Excellent",
    itemDescription:
      "This Braemer was purchased from AllModern for $300 and is now taking up space since we dont use it. Super comfortable and makes a great piece in any living room. Color is black and easy to clean. Can be transported in pieces or whole.",
    image1:
      "https://secure.img1-fg.wfcdn.com/im/51129936/resize-h800-w800%5Ecompr-r85/9236/92362159/Braemar+Chaise+Lounge.jpg",
    image2:
      "https://secure.img1-fg.wfcdn.com/im/11731609/resize-h800-w800%5Ecompr-r85/9236/92362172/Braemar+Chaise+Lounge.jpg",
    image3:
      "https://secure.img1-fg.wfcdn.com/im/81924945/resize-h800-w800%5Ecompr-r85/9476/94762754/Braemar+Chaise+Lounge.jpg",
    image4:
      "https://secure.img1-fg.wfcdn.com/im/45818569/resize-h800-w800%5Ecompr-r85/9236/92362086/Braemar+Chaise+Lounge.jpg",
  },
  {
    id: "3",
    itemName: "\nGoPro HERO+",
    itemCondition: "Good",
    itemDescription:
      "HERO+ captures immersive 1080p60 video and 8MP photos and features Wi-Fi and Bluetooth, which provide access to the GoPro App and Smart Remote. The GoPro App lets you control your camera remotely, preview your shots, play back content and create short highlight clips on your phone or tablet for easy sharing to Instagram, Facebook, YouTube and more.",
    image1:
      "https://m.media-amazon.com/images/S/aplus-media/mg/d15240f9-0516-40ff-8fbc-757208de01e5._SR285,285_.jpg",
    image2:
      "https://images.craigslist.org/01010_5m5hWvRCZ4B_0CI0t2_600x450.jpg",
    image3:
      "https://images.craigslist.org/00I0I_bvbQH6jjZYB_0CI0t2_600x450.jpg",
    image4:
      "https://images.craigslist.org/00R0R_iq1eRJv5DJa_0CI0t2_600x450.jpg",
  },
  {
    id: "4",
    itemName: '17" Andros Wheels & All-Season Tires',
    itemCondition: "Good",
    itemDescription:
      "Used on F56 Mini Cooper but fit other make and models as well. Please check specs to confirm for your car. Bought these last August for the winter season but didnt drive on them as much as expected and now I need to switch out for a larger brake caliper upgrade. Great looking set of wheels and high build quality. The tires currently have tire stickers on them which are easily removable.",
    image1:
      "https://scontent-bos3-1.xx.fbcdn.net/v/t1.0-9/p720x720/91057562_4255334987825375_6360570854245400576_o.jpg?_nc_cat=107&_nc_sid=843cd7&_nc_ohc=ZKY3FIEr5RIAX9cQOrJ&_nc_ht=scontent-bos3-1.xx&tp=6&oh=8750b79e510dcbdfa1f43c6e57d75b5c&oe=5F94FEAC",
    image2:
      "https://scontent-bos3-1.xx.fbcdn.net/v/t1.0-9/91285217_4255335814491959_4300467448299126784_n.jpg?_nc_cat=100&_nc_sid=843cd7&_nc_ohc=2tNEmAuES9kAX831Xur&_nc_ht=scontent-bos3-1.xx&oh=d740d17a691e4aa372821034632909f6&oe=5F93B515",
    image3:
      "https://images.craigslist.org/00f0f_jdfCDHpoBkM_0CI0t2_600x450.jpg",
    image4:
      "https://images.craigslist.org/00v0v_ejbrpKRvhF8_0CI0t2_600x450.jpg",
  },
  {
    id: "5",
    itemName: "LED Interior Lighting",
    itemCondition: "Excellent",
    itemDescription:
      "I purchased this kit brand new from the MVP Aesthetics shop for but never got around to installing it. The kit takes in a 12V power source so I soldered it to use cigarette lighter plug. Other than that its completely unused and straight from the box. Works perfectly when i plugged it in. Pictures are from the promotional site since I never actually installed it. Box is pictured on seat in pictures. Includes fiber optic cables with the appropriate mounting hardware, a small tool for pushing the edges into your vehicle's creases, the control module and the cigarette lighter adapter to the 12v power cable. \n\nIf you want to hardwire the power to your fusebox or some other power supply you can just snip the soldered area and strip the wire a bit to do with it as you will. Make me a fair offer.",
    image1:
      "https://scontent-bos3-1.xx.fbcdn.net/v/t1.0-9/s960x960/104160315_4572376419454562_6731211347498669566_o.jpg?_nc_cat=103&_nc_sid=843cd7&_nc_ohc=DjjRjh0AvvEAX_qxsl_&_nc_ht=scontent-bos3-1.xx&tp=7&oh=4c44faa080ea64919548895cecf8ed7a&oe=5F946883",
    image2:
      "https://scontent-bos3-1.xx.fbcdn.net/v/t1.0-9/p960x960/83682677_4572376509454553_3835987848800127595_o.jpg?_nc_cat=101&_nc_sid=843cd7&_nc_ohc=4neBMMByfsUAX87Q6An&_nc_ht=scontent-bos3-1.xx&tp=6&oh=f9c6b05f8ace0b52e69c2eb6107c1128&oe=5F93BC35",
    image3:
      "https://scontent-bos3-1.xx.fbcdn.net/v/t1.0-9/s960x960/83280484_4572376429454561_4113184410108320928_o.jpg?_nc_cat=103&_nc_sid=843cd7&_nc_ohc=UD2ROUwzTmsAX9Qx7pf&_nc_ht=scontent-bos3-1.xx&tp=7&oh=a95bfecf46a3f9ce61058fc63ab716dd&oe=5F93BECA",
    image4: "",
  },
  {
    id: "6",
    itemName: "Smart Mirror Frame (DIY)",
    itemCondition: "Good",
    itemDescription:
      "Raspberry PI powered smart mirror. Construction is pretty shoddy as it was my first ever project. Mirror alone costs about $200 bucks. Parts in total were about $500 after everything. Uses a modified LCD screen as the panel and a Raspberry pi running Raspbian. Highly recommend you have some experience with this stuff if purchasing. I dont have a place to hang this anymore and want to at least part it out to someone who'll use it. LED back-lighting isnt included as it fell off, but it was just a cheap amazon strip connected to the included power adaptor.",
    image1:
      "https://scontent-bos3-1.xx.fbcdn.net/v/t1.0-9/p960x960/87153651_4117674004924808_1806341503849594880_o.jpg?_nc_cat=102&_nc_sid=843cd7&_nc_ohc=d1wAhBV6P4EAX9PFcpF&_nc_ht=scontent-bos3-1.xx&tp=6&oh=822e31379c376316810d66a38fb2d634&oe=5F95CBDB",
    image2:
      "https://scontent-bos3-1.xx.fbcdn.net/v/t1.0-9/s960x960/87180114_4117673914924817_1506880776061321216_o.jpg?_nc_cat=110&_nc_sid=843cd7&_nc_ohc=BIg0zgqVs5gAX-cLEif&_nc_ht=scontent-bos3-1.xx&tp=7&oh=886815a817920cc5f1e750e0f3e5aed9&oe=5F954B1D",
    image3:
      "https://scontent-bos3-1.xx.fbcdn.net/v/t1.0-9/s960x960/87055246_4117673924924816_1851120991791480832_o.jpg?_nc_cat=107&_nc_sid=843cd7&_nc_ohc=daefz_gRWLcAX__Vvv3&_nc_ht=scontent-bos3-1.xx&tp=7&oh=0fd051213869bbc5a7faef051c697fcc&oe=5F93EE34",
    image4: "",
  },
];

const CardGrid = ({ items, callback }) => {
  return items.map((item) => (
    <Col lg={4} md={6} xs={12}>
      <ItemCard item={item} callback={callback} />
    </Col>
  ));
};

function App(props) {
  const [items, setItems] = useState([]);
  const [modalState, setModalState] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // SheetDb.read("https://sheetdb.io/api/v1/pmtcj1407cc5q", {}).then(
    //   (result) => {
    //     console.log(result)
    //     setItems(result);
    //   }
    // );

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
      SheetDb.read("https://sheetdb.io/api/v1/m59ar6rgiqwz8", {
        search: { itemId: item.id },
      })
        .then((results) => {
          console.log(results)
          const highestBid = getHighestBid(results);
          setModalState(Object.assign(item, highestBid));
          setModalVisible(true);
        })
        .then((error) => {});

      // const highestBid = getHighestBid(fakeresults);
      // setModalState(Object.assign(item, highestBid));
      // setModalVisible(true);
    } else {
      setModalVisible(true);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <Grid>
      {modalVisible === true && (
        <UIModal modalState={modalState} handleClose={handleModalClose} />
      )}
      <Row center="xs">
        <Col xs={8} sm={6}>
          <IntroLogo />
          <IntroParagraph>
            This is my garage sale. Feel free to bid on what you see, I will
            email you personally if you win! If you want to reach out to me
            directly <a href="mailto:lucasmosele@gmail.com">email me</a>
          </IntroParagraph>
        </Col>
      </Row>
      <Row between="xs">
        <CardGrid items={items} callback={handleModalOpen} />
      </Row>
    </Grid>
  );
}

export default App;

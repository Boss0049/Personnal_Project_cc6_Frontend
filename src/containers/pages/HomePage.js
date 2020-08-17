import React from "react";
import Typed from "react-typed";
import Typist from "react-typist";
import { Row } from "antd";

function HomePage() {
  return (
    <Row
      justify="center"
      align="middle"
      style={{
        height: "100%",
        background: "#FF0000",
        animation: "colorchange 175s linear 1s infinite",
        animationDuration: "20s",
      }}
    >
      <Typed
        style={{ fontSize: "70px" }}
        strings={[
          "Do you want share your Story ?",
          "Do you want to read other people's stories?",
          "Register Now!!",
        ]}
        typeSpeed={40}
        backSpeed={50}
        loop
      ></Typed>
    </Row>
  );
}

export default HomePage;

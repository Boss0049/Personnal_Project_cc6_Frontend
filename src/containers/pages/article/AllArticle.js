import React, { useState, useEffect, useContext } from "react";
import { PostContext } from "../../../context/PostContext";
import { Tabs, Row, Col } from "antd";
import CardComponent from "../../../components/Card";
import axios from "../../../config/axios";
import { Link } from "react-router-dom";
import SideBar from "../../../components/SideBar";

const { TabPane } = Tabs;
const saveData = new Map();
function AllArticle() {
  const [dataPopular, setDataPopular] = useState([]);
  const [statusCategory, setStatusCategory] = useState("Technology");
  const { dataArticle, setDataArticle } = useContext(PostContext);

  const fetchData = async ({ force = false }) => {
    if (!force && saveData.has(statusCategory)) {
      setDataArticle(
        saveData.get(statusCategory).data?.message[0]?.Articles || []
      );
    } else {
      const data = await axios.get(`/article/?category=${statusCategory}`);
      saveData.set(statusCategory, data);
      setDataArticle(data.data?.message[0]?.Articles || []);
    }
  };

  useEffect(() => {
    fetchData({ force: true });
    // saveData.set("statusCategory", "data");
  }, [statusCategory]);

  const onChange = (key) => {
    if (key === "1") {
      // console.log(1);
      setStatusCategory("Technology");
    } else if (key === "2") {
      // console.log(2);
      setStatusCategory("Nature");
    } else if (key === "3") {
      // console.log(3);
      setStatusCategory("Sports");
    } else {
      setStatusCategory("Other");
    }
  };

  useEffect(() => {
    async function fetchData() {
      const popular = await axios.get("/article/popular");
      setDataPopular((preDataProp) => popular.data);
    }
    fetchData();
  }, []);

  const addView = async (id) => {
    axios
      .patch(`/article/view/${id}`)
      .then((res) => {
        console.log(id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const parseJson = dataArticle.map((ele) => ele);

  return (
    <Row justify="center" style={{ marginBottom: "20px" }}>
      <Col span={20}>
        <Tabs defaultActiveKey="1" onChange={onChange}>
          <TabPane tab="Technology" key="1">
            <Row gutter={30} justify="space-around">
              <Col span={16}>
                {parseJson.length > 0 && (
                  <CardComponent
                    addView={addView}
                    content={parseJson}
                  ></CardComponent>
                )}
              </Col>
              <Col span={8}>
                <SideBar dataPopular={dataPopular} addView={addView}></SideBar>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="Nature" key="2">
            <Row gutter={30} justify="space-around">
              <Col span={16}>
                {parseJson.length > 0 && (
                  <CardComponent
                    addView={addView}
                    content={parseJson}
                  ></CardComponent>
                )}
              </Col>
              <Col span={8}>
                <SideBar dataPopular={dataPopular} addView={addView}></SideBar>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="Sports" key="3">
            <Row gutter={30} justify="space-around">
              <Col span={16}>
                {parseJson.length > 0 && (
                  <CardComponent
                    addView={addView}
                    content={parseJson}
                  ></CardComponent>
                )}
              </Col>
              <Col span={8}>
                <SideBar dataPopular={dataPopular} addView={addView}></SideBar>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="Other" key="4">
            <Row gutter={30} justify="space-around">
              <Col span={16}>
                {parseJson.length > 0 && (
                  <CardComponent
                    addView={addView}
                    content={parseJson}
                  ></CardComponent>
                )}
              </Col>
              <Col span={8}>
                <SideBar dataPopular={dataPopular} addView={addView}></SideBar>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  );
}

export default AllArticle;

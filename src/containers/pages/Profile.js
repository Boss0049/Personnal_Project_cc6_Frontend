import React from "react";
import { Row, Col, Avatar, List, Button, Skeleton, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import jwtDecode from "jwt-decode";
import localStorage from "../../services/LocalStorageService";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "../../config/axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Profile() {
  const [dataList, setDataList] = useState([]);
  const [load, setLoad] = useState(true);
  const { confirm } = Modal;

  let decoded = null;
  if (localStorage.getToken()) {
    decoded = jwtDecode(localStorage.getToken());
  }

  const getArticleOwner = async () => {
    const dataOwner = await axios.get("/article/me");
    setDataList(dataOwner.data);
    setLoad(false);
  };

  const createTime = (create) => {
    moment.locale("th");
    let time = moment(create).fromNow();
    return time;
  };

  const deleteArticle = async (id) => {
    await axios.delete(`/article/${id}`);
    getArticleOwner();
  };

  function showDeleteConfirm(id) {
    // console.log(id);
    confirm({
      title: "Are you sure delete this Article?",
      icon: <ExclamationCircleOutlined />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteArticle(id);
      },
      onCancel() {},
    });
  }

  useEffect(() => {
    getArticleOwner();
  }, []);

  return (
    <>
      <Row justify="center" align="middle" style={{ height: "90%" }}>
        <Col span={22}>
          <Row justify="center" align="top">
            <Avatar size={150} icon={<UserOutlined />} />
          </Row>
          <Row justify="center" style={{ marginBottom: "50px" }}>
            <Col span={10}>
              <Row justify="center">
                <Col span={6}>
                  <h1 style={{ fontWeight: "750" }}>{decoded.name}</h1>
                </Col>
                <Col span={6}>
                  <h1 style={{ fontWeight: "750" }}>{decoded.surname}</h1>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row justify="center" align="middle">
            <Col span={15}>
              <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={dataList}
                loading={load}
                pagination={{
                  onChange: (page) => {
                    // console.log(page);
                  },
                  pageSize: 5,
                }}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Link to={`/update/${item.id}`} key="list-loadmore-edit">
                        edit
                      </Link>,
                      <a
                        key="list-loadmore-more"
                        onClick={() => showDeleteConfirm(item.id)}
                      >
                        delete
                      </a>,
                    ]}
                  >
                    <Skeleton
                      avatar
                      title={false}
                      loading={item.loading}
                      active
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        }
                        // title={<a href="https://ant.design">{item.name.last}</a>}
                        description={
                          JSON.parse(JSON.parse(item.content).post).find(
                            (ele) => ele.type === "header"
                          ).data.text
                        }
                      />
                      <div>{createTime(item.createdAt)}</div>
                    </Skeleton>
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default Profile;

import React from "react";
import parse from "html-react-parser";
import { Card, Col, Row, List, Avatar, Space } from "antd";
import {
  MessageOutlined,
  LikeOutlined,
  StarOutlined,
  FieldTimeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import jwtDecode from "jwt-decode";
import moment from "moment";
import localStorage from "../services/LocalStorageService";
import axios from "../config/axios";
import { Link } from "react-router-dom";

function CardComponent(props) {
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const createTime = (create) => {
    moment.locale("th");
    let time = moment(create).fromNow();
    return time;
  };

  let decoded = null;
  if (localStorage.getToken()) {
    decoded = jwtDecode(localStorage.getToken());
  }

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          // console.log(page);
        },
        pageSize: 3,
      }}
      dataSource={props.content}
      renderItem={(item) => (
        <List.Item
          key={item.title}
          actions={[
            <IconText
              icon={UserOutlined}
              text={`${item.User.name} ${item.User.surname}`}
              key="list-vertical-star-2"
            />,
            <IconText
              icon={FieldTimeOutlined}
              text={createTime(item.createdAt)}
              key="list-vertical-star-1"
            />,
            <IconText
              icon={StarOutlined}
              text={item.view}
              key="list-vertical-star-o"
            />,
          ]}
          extra={
            <img
              width={272}
              alt="logo"
              src={
                JSON.parse(JSON.parse(item.content).post).find(
                  (ele) => ele.type === "image"
                )?.data.file.url ||
                "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              }
            />
          }
        >
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={
              <Link
                to={`/show/${item.id}`}
                onClick={() => props.addView(item.id)}
              >
                {
                  JSON.parse(JSON.parse(item.content).post).find(
                    (ele) => ele.type === "header"
                  ).data.text
                }
              </Link>
            }
            description={
              JSON.parse(JSON.parse(item.content).post).find(
                (ele) => ele.type === "paragraph"
              ).data.text
            }
          />
          {/* {item.content} */}
        </List.Item>
      )}
    />
  );
}

export default CardComponent;

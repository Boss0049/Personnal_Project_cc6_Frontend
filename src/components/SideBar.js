import React, { useState, useEffect } from "react";
import { List, Avatar, Space } from "antd";
import {
  MessageOutlined,
  LikeOutlined,
  StarOutlined,
  FieldTimeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { Link } from "react-router-dom";
import axios from "../config/axios";

function SideBar(props) {
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

  return (
    <>
      <h1>Popular</h1>
      <List
        itemLayout="vertical"
        dataSource={props.dataPopular}
        renderItem={(item, idx) => (
          <List.Item
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
          >
            <List.Item.Meta
              avatar={<h1>{idx + 1 + "."}</h1>}
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
            />
          </List.Item>
        )}
      />
    </>
  );
}

export default SideBar;

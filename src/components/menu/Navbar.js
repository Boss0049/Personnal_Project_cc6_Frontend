import React, { useState, useEffect, useContext } from "react";
import { Link, withRouter, useHistory, useLocation } from "react-router-dom";
import { PostContext } from "../../context/PostContext";
import jwtDecode from "jwt-decode";
import {
  Layout,
  Menu,
  Col,
  Row,
  Button,
  Modal,
  Avatar,
  Dropdown,
  Tooltip,
} from "antd";
import { UserOutlined, SearchOutlined } from "@ant-design/icons";
import "./Nav.css";
import Register from "../../containers/pages/Register";
import Login from "../../containers/pages/Login";
import localStorage from "../../services/LocalStorageService";

const { Header, Content, Footer } = Layout;

function Navbar(props) {
  const { SubMenu } = Menu;

  const [isRegister, setIsRegister] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const { submit, post, selectedTags, search, update, idEdit } = useContext(
    PostContext
  );

  const history = useHistory();
  const location = useLocation();

  let decoded = null;

  if (localStorage.getToken()) {
    decoded = jwtDecode(localStorage.getToken());
  }

  const isShowRegister = (status) => {
    setIsRegister(status);
  };

  const isShowLogin = (status) => {
    setIsLogin(status);
  };

  const logout = () => {
    localStorage.removeToken();
    props.setRole("guest");
    window.location.replace("/");
  };
  // console.log(selectedTags.length);

  const menu = (
    <Menu>
      <Menu.Item>
        <Row justify="center">
          <Button
            key="1"
            style={{ color: "#000000", width: "100%" }}
            type="text"
          >
            <Link to={"/post"}>New Story</Link>
          </Button>
        </Row>
      </Menu.Item>
      <Menu.Item>
        <Row justify="center">
          <Button
            key="1"
            style={{ color: "#000000", width: "100%" }}
            type="text"
          >
            <Link to={"/profile"}>Profile</Link>
          </Button>
        </Row>
      </Menu.Item>
      <Menu.Item>
        <Row justify="center">
          <Button
            key="1"
            onClick={logout}
            style={{ color: "#000000" }}
            type="text"
          >
            Logout
          </Button>
        </Row>
      </Menu.Item>
    </Menu>
  );

  const guestNav = (
    <Header
      style={{
        background: "#fff",
        position: "fixed",
        width: "100%",
      }}
    >
      <Row>
        <Col span="4">
          <Row justify="end">
            <Link to={"/"}>
              <div className="logo" />
            </Link>
          </Row>
        </Col>
        <Col span="20">
          <Row justify="end">
            <Menu
              theme="light"
              mode="horizontal"
              style={{ borderBottom: "0px solid #f0f0f0" }}
            >
              <Button
                key="1"
                disabled={isRegister}
                onClick={() => isShowRegister(true)}
                style={{ color: "#000000" }}
                type="link"
              >
                Sing Up
                <Modal
                  visible={isRegister}
                  onCancel={() => isShowRegister(false)}
                  footer={null}
                >
                  <Register
                    isCloseRegis={setIsRegister}
                    isOpenLogin={setIsLogin}
                  ></Register>
                </Modal>
              </Button>

              <Button
                key="2"
                disabled={isLogin}
                onClick={() => isShowLogin(true)}
                style={{ color: "#000000" }}
                type="link"
              >
                Get Started
                <Modal
                  visible={isLogin}
                  onCancel={() => isShowLogin(false)}
                  footer={null}
                >
                  <Login
                    isCloseLogin={setIsLogin}
                    isOpenRegis={setIsRegister}
                    setRole={props.setRole}
                  ></Login>
                </Modal>
              </Button>
            </Menu>
          </Row>
        </Col>
      </Row>
    </Header>
  );

  const userNav = (
    <Header style={{ background: "#fff" }}>
      <Row>
        <Col span="4">
          <Row justify="end">
            <Link to={"/"}>
              <div className="logo" />
            </Link>
          </Row>
        </Col>
        <Col span="20">
          <Row gutter={10} justify="end">
            <Col>
              <Tooltip
                style={{
                  backgroundColor: "#FFF",
                  width: "100%",
                  border: "none",
                }}
                title={
                  <input
                    style={{ color: "black", width: "100%", border: "none" }}
                    placeholder="search..."
                    onChange={search}
                  ></input>
                }
              >
                <Button shape="circle" icon={<SearchOutlined />} />
              </Tooltip>
            </Col>
            <Col>
              <h3>{decoded && decoded.name}</h3>
            </Col>
            <Col>
              <Dropdown
                disabled={false}
                overlay={menu}
                placement="topCenter"
                arrow
                trigger={["click"]}
              >
                <Avatar size="large" icon={<UserOutlined />} />
              </Dropdown>
            </Col>
          </Row>
        </Col>
      </Row>
    </Header>
  );

  const userPostNav = (
    <Header style={{ background: "#fff" }}>
      <Row>
        <Col span="4">
          <Row justify="end">
            <Link to={"/"}>
              <div className="logo" />
            </Link>
          </Row>
        </Col>
        <Col span="20">
          <Row gutter={10} justify="end">
            <Col>
              <Button
                onClick={
                  location.pathname.includes("/post")
                    ? submit
                    : () => update(idEdit)
                }
                disabled={
                  location.pathname.includes("/post")
                    ? post.length === 0 || selectedTags.length === 0
                    : false
                }
              >
                {location.pathname.includes("/post") ? "Publish" : "Update"}
              </Button>
            </Col>
            <Col>
              <h3>{decoded && decoded.name}</h3>
            </Col>
            <Col>
              <Dropdown
                overlay={menu}
                placement="topCenter"
                arrow
                trigger={["click"]}
              >
                <Avatar size="large" icon={<UserOutlined />} />
              </Dropdown>
            </Col>
          </Row>
        </Col>
      </Row>
    </Header>
  );

  return props.role !== "user"
    ? guestNav
    : location.pathname.includes("/post") ||
      location.pathname.includes("/update")
    ? userPostNav
    : userNav;
}

export default Navbar;

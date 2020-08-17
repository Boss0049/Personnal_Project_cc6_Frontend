import React from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "../../config/axios";
import { withRouter, Link } from "react-router-dom";
import localStorage from "../../services/LocalStorageService";

function Login(props) {
  const switchModel = () => {
    props.isOpenRegis(true);
    props.isCloseLogin(false);
  };

  const onFinish = async (values) => {
    try {
      const token = await axios.post("/users/login", {
        username: values.username,
        password: values.password,
      });
      localStorage.setToken(token.data.accessToken);
      props.setRole("user");
      props.history.push("/");
      notification.success({
        message: "เข้าสู่ระบบสำเร็จ",
      });
      props.isCloseLogin(false);
    } catch (err) {
      notification.error({
        message: "Username or Password Wrong",
      });
    }
  };
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <Link onClick={switchModel}>register now!</Link>
      </Form.Item>
    </Form>
  );
}

export default withRouter(Login);

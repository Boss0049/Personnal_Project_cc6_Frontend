import React, { useState } from "react";
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  notification,
} from "antd";
import axios from "../../config/axios";
import { withRouter } from "react-router-dom";

const formLayout = {
  labelCol: { xs: 24, sm: 24, md: 5, lg: 7, xl: 7 },
  wrapperCol: { xs: 24, sm: 24, md: 19, lg: 17, xl: 17 },
};

let strongRegex = new RegExp(
  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])(\\S).{8,}$"
);

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function Register(props) {
  const onFinish = (values) => {
    axios
      .post("/users/register", {
        username: values.username,
        password: values.password,
        name: values.firstName,
        surname: values.surname,
        email: values.email,
      })
      .then((res) => {
        props.history.push("/");
        notification.success({
          message: "สมัครสำเร็จ",
        });
        props.isCloseRegis(false);
        props.isOpenLogin(true);
      })
      .catch((err) => {
        notification.error({
          message: err.response?.data?.message || "มีบางอย่างผิดพลาด",
        });
      });
  };

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  return (
    <Form
      {...formLayout}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        name="username"
        label="Username"
        rules={[
          {
            required: true,
            message: "Please input your Username",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (
                value.length >= 8 &&
                value.length <= 22 &&
                strongRegex.test(value)
              ) {
                return Promise.resolve();
              }
              return Promise.reject(
                "Password have Uppercase letter , Lowercase letter , Number , Symbols And more 8"
              );
            },
          }),
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                "The two passwords that you entered do not match!"
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="firstName"
        label="First Name"
        rules={[
          {
            required: true,
            message: "Please input your First Name!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="surname"
        label="Surname"
        rules={[
          {
            required: true,
            message: "Please input your First Name!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject("Should accept agreement"),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}

export default withRouter(Register);

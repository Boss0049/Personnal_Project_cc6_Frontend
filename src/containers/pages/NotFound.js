import React from "react";
import { Result, Button, Row } from "antd";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Row justify="center" align="middle">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link to={"/"}>
            <Button type="primary">Back Home</Button>
          </Link>
        }
      />
    </Row>
  );
}

export default NotFound;

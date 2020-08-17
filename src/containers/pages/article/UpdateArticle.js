import React from "react";
import axios from "../../../config/axios";
import { PostContext } from "../../../context/PostContext";
import { useEffect, useContext } from "react";
import { useParams } from "react-router";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./editor/constants";
import { Button, Input, Tag, Col, Row } from "antd";
import { useState } from "react";
import { Skeleton } from "antd";

function UpdateArticle() {
  const [oneData, setOneData] = useState([]);
  const { post, setPost, setIdEdit } = useContext(PostContext);
  let { id } = useParams();

  useEffect(() => {
    getData(id);
  }, []);

  const getData = async (id) => {
    const data = await axios.get(`/article/${id}`);
    setIdEdit(id);
    const showData = JSON.parse(JSON.parse(data.data.content).post);
    setOneData(showData);
  };

  const onChangeEditor = (api, newData) => {
    setPost(newData.blocks);
  };

  return (
    <>
      {
        oneData.length !== 0 ? (
          <>
            <Row justify="center">
              <Col span={24}>
                <EditorJs
                  onChange={onChangeEditor}
                  tools={EDITOR_JS_TOOLS}
                  data={{
                    blocks: oneData,
                    version: "2.12.4",
                  }}
                />
              </Col>
            </Row>
            {/* <Row justify="space-around" style={{ paddingBottom: "200px" }}>
              <Col span={10}>
                <Row justify="end">
                  <Col span={20}>
                    <label>
                      <Row justify="center">
                        <Col span={3}>
                          <span>Keyword :</span>
                        </Col>
                        <Col span={21}>
                          <Input
                            style={{ display: "inline-block" }}
                            placeholder="Keyword"
                            onChange={(e) => setKeywords(e.target.value)}
                          />
                        </Col>
                      </Row>
                    </label>
                  </Col>
                </Row>
              </Col>
              <Col span={10}>
                <Row justify="start">
                  <Col
                    span={14}
                    style={{
                      border: "1px solid #000",
                      padding: "5px",
                    }}
                  >
                    <span style={{ marginRight: 8 }}>Categories:</span>
                    {tagsData.map((tag) => (
                      <CheckableTag
                        style={{
                          border: "1px solid #000",
                        }}
                        key={tag}
                        checked={selectedTags.indexOf(tag) > -1}
                        onChange={(checked) => handleChange(tag, checked)}
                      >
                        {tag}
                      </CheckableTag>
                    ))}
                  </Col>
                </Row>
              </Col>
            </Row> */}
          </>
        ) : null
        // <Skeleton loading={true} active={true} />
      }
    </>
  );
}

export default UpdateArticle;

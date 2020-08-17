import React, { useEffect, useState, useContext } from "react";
import { PostContext } from "../../../../context/PostContext";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./constants";
import axios from "../../../../config/axios";
import localStorage from "../../../../services/LocalStorageService";
import { Button, Input, Tag, Col, Row } from "antd";
import { withRouter, useHistory } from "react-router-dom";
import { SubmitContext } from "../../../../App";
const { CheckableTag } = Tag;

function Post() {
  const {
    post,
    setPost,
    selectedTags,
    setSelectedTags,
    keywords,
    setKeywords,
  } = useContext(PostContext);

  const tagsData = ["Technology", "Nature", "Sports", "Other"];

  const onChangeEditor = (api, newData) => {
    setPost(newData.blocks);
  };

  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
  };

  return (
    <>
      <Row justify="center">
        <Col span={24}>
          <EditorJs
            onChange={onChangeEditor}
            tools={EDITOR_JS_TOOLS}
            data={{
              blocks: [
                {
                  type: "header",
                  data: {
                    level: 1,
                  },
                },
              ],
              version: "2.12.4",
            }}
          />
        </Col>
      </Row>
      <Row justify="space-around" style={{ paddingBottom: "200px" }}>
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
      </Row>
    </>
  );
}

export default withRouter(Post);

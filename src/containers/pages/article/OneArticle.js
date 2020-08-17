import React from "react";
import axios from "../../../config/axios";
import { useEffect } from "react";
import { useParams } from "react-router";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./editor/constants";
import { useState } from "react";
import { Skeleton } from "antd";

function OneArticle() {
  const [oneData, setOneData] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    getData(id);
  }, []);

  const getData = async (id) => {
    const data = await axios.get(`/article/${id}`);
    const showData = JSON.parse(JSON.parse(data.data.content).post);
    setOneData(showData);
  };

  const onReady = () => {
    let tool = document.querySelectorAll(".ce-toolbar");
    let editableElements = document.querySelectorAll("[contenteditable=true]");
    for (let i = 0; i < tool.length; i++) {
      tool[i].style.display = "none";
    }
    for (var i = 0; i < editableElements.length; ++i) {
      editableElements[i].setAttribute("contentEditable", false);
    }
  };

  return (
    <>
      {
        oneData.length !== 0 ? (
          <EditorJs
            autofocus={true}
            onReady={onReady}
            tools={EDITOR_JS_TOOLS}
            data={{
              blocks: oneData,
              version: "2.12.4",
            }}
          />
        ) : null
        // <Skeleton loading={true} active={true} />
      }
    </>
  );
}

export default OneArticle;

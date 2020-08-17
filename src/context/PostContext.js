import React, { createContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "../config/axios";
// import jwtDecode from "jwt-decode";
// import localStorage from "../services/LocalStorageService";

export const PostContext = createContext();
export const PostContextProvider = ({ children }) => {
  const [post, setPost] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [keywords, setKeywords] = useState("");
  const [dataArticle, setDataArticle] = useState([]);
  const [idEdit, setIdEdit] = useState("");
  const history = useHistory();

  //   console.log(post, selectedTags, keywords);

  const submit = () => {
    let stringPost = JSON.stringify(post);
    let postJson = JSON.stringify({ post: `${stringPost}` });

    const category = selectedTags.join(".");

    // let decoded = null;
    // if (localStorage.getToken()) {
    //   let decoded = jwtDecode(localStorage.getToken());
    // }

    axios
      .post("/article", {
        category,
        content: postJson,
        status: "public",
        keywords: keywords,
      })
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const update = async (id) => {
    let stringPost = JSON.stringify(post);
    let postJson = JSON.stringify({ post: `${stringPost}` });

    // const category = selectedTags.join(".");
    try {
      await axios.patch(`/article/${id}`, {
        content: postJson,
      });
      console.log("object");
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const search = async (e) => {
    const result = await axios.get(`/search/?key=${e.target.value}`);
    setDataArticle(result.data);
  };

  const store = {
    post,
    setPost,
    selectedTags,
    setSelectedTags,
    keywords,
    setKeywords,
    submit,
    search,
    dataArticle,
    setDataArticle,
    update,
    idEdit,
    setIdEdit,
  };

  return <PostContext.Provider value={store}>{children}</PostContext.Provider>;
};

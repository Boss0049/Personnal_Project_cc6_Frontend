import HomePage from "../containers/pages/HomePage";
import AllArticle from "../containers/pages/article/AllArticle";
import OneArticle from "../containers/pages/article/OneArticle";
import Category from "../containers/pages/article/Category";
import Post from "../containers/pages/article/editor/Post";
import Profile from "../containers/pages/Profile";
import UpdateArticle from "../containers/pages/article/UpdateArticle";

let id, category, myId;
const components = {
  homepage: {
    url: "/",
    page: HomePage,
  },
  allArticle: {
    url: "/",
    page: AllArticle,
  },
  post: {
    url: "/post",
    page: Post,
  },
  oneArticle: {
    url: "/show/:id",
    page: OneArticle,
  },
  profile: { url: "/profile", page: Profile },
  updateArticle: {
    url: "/update/:id",
    page: UpdateArticle,
  },
};
const {
  allArticle,
  oneArticle,
  profile,
  homepage,
  post,
  updateArticle,
} = components;
export default {
  guest: [homepage],
  user: [allArticle, oneArticle, profile, post, updateArticle],
};

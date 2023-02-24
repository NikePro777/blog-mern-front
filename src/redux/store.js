import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/posts.js";
import { authReduser } from "./slices/auth.js";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReduser,
  },
});

export default store;

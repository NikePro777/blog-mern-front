import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";
// импортируем аксиос не из библиотеки а из файла, где мы уже все настроили

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  return data;
});

export const fetchTags = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},

  // в extraRedusers записываем состояние нащего асинхронного экшена
  extraReducers: {
    // суть в том, что если мы отправили запрос fetchPosts и он сейчас в состоянии pending, то мы в стейте ставим статус лоадинг
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    // а если в состоянии fulfilled то ставим статус что загружено
    [fetchPosts.fulfilled]: (state, action) => {
      // в posts.items помещаем все что мы с вами загрузили
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    // а если в ошибка то обнуляем наш items
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
  },
});

export const postsReducer = postsSlice.reducer;

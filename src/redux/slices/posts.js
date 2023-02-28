import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";
// импортируем аксиос не из библиотеки а из файла, где мы уже все настроили

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  return data;
});

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

export const fetchRemovePost = createAsyncThunk(
  "posts/fetchRemovePost",
  async (id) => axios.delete(`/posts/${id}`)
);

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
    // Получение тэгов
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload.flat();
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = "error";
    },
    // удаление статьи
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (obj) => obj.id !== action.meta.arg
      );
    },
  },
});

export const postsReducer = postsSlice.reducer;

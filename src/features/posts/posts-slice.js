import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "../../consts";

export const loadPostsAsync = createAsyncThunk(
  "@@posts/loadPosts",
  (arg, { extra: { client, API }, getState }) => {
    const { lazyLoading } = arg;
    const { pagination, posts } = getState();
    const paramsCfg = {
      limit: pagination.pageSize,
      skip: lazyLoading
        ? posts.list.length
        : (pagination.currentPage - 1) * pagination.pageSize,
    };

    return client.get(API.getPostsBy(paramsCfg));
  }
);

const initialState = {
  status: "idle",
  error: null,
  total: 0,
  list: [],
  sortConfig: null,
};

const postsSlice = createSlice({
  name: "@@posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadPostsAsync.pending, (state) => {
        state.status = FetchStatus.LOADING;
        state.error = null;
      })
      .addCase(loadPostsAsync.rejected, (state, action) => {
        state.status = FetchStatus.REJECTED;
        state.error = action.payload || action.meta.error;
      })
      .addCase(loadPostsAsync.fulfilled, (state, action) => {
        const { lazyLoading } = action.meta.arg;
        const { posts } = action.payload.data;

        state.status = FetchStatus.RECEIVED;
        state.error = null;
        state.total = action.payload.data.total;

        if (lazyLoading) {
          state.list.push(...posts);
        } else {
          state.list = posts;
        }
      });
  },
});

export const postsReducer = postsSlice.reducer;

// selectors
export const selectPostsInfo = (state) => ({
  status: state.posts.status,
  error: state.posts.error,
  total: state.posts.total,
  qty: state.posts.list.length,
});

export const selectPosts = (state) => state.posts.list;

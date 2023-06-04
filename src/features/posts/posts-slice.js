import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "../../consts";

export const loadPostsUsersAsync = createAsyncThunk(
  "@@posts/loadPostsUsers",
  async (arg, { extra: { client, API }, getState }) => {
    const { lazyLoading } = arg;

    const {
      pagination,
      posts: { list },
    } = getState();

    const paramsCfg = {
      limit: pagination.pageSize,
      skip: lazyLoading
        ? list.length
        : (pagination.currentPage - 1) * pagination.pageSize,
    };

    const {
      data: { posts, total },
    } = await client.get(API.getPostsBy(paramsCfg));

    const userPromises = await posts.map((item) =>
      client.get(API.getUserById(item.userId))
    );
    const users = await Promise.all(userPromises);

    return {
      posts,
      total,
      users: users.map(({ data }) => data),
    };
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
      .addCase(loadPostsUsersAsync.pending, (state) => {
        state.status = FetchStatus.LOADING;
        state.error = null;
      })
      .addCase(loadPostsUsersAsync.rejected, (state, action) => {
        state.status = FetchStatus.REJECTED;
        state.error = action.payload || action.meta.error;
      })
      .addCase(loadPostsUsersAsync.fulfilled, (state, action) => {
        const { lazyLoading } = action.meta.arg;
        const { posts, total } = action.payload;

        state.status = FetchStatus.RECEIVED;
        state.error = null;
        state.total = total;

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

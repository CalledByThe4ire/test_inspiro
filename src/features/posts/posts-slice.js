import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadPosts = createAsyncThunk(
  "@@countries/load-countries",
  (id, { extra: { client, API } }) => {
    return client.get(API.getPostsByUserId(id));
  }
);

const initialState = {
  status: "idle",
  error: null,
  list: [],
  sortConfig: null,
};

const postsSlice = createSlice({
  name: "@@posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadPosts.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload || action.meta.error;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.status = "received";
        state.error = null;
        state.list = action.payload.data.posts;
      });
  },
});

export const postsReducer = postsSlice.reducer;

// selectors
export const selectPostsInfo = (state) => ({
  status: state.posts.status,
  error: state.posts.error,
  qty: state.posts.list.length,
});

export const selectAllPosts = (state) => state.posts.list;

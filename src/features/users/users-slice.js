import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "../../consts";

import { loadPostsUsersAsync } from "../posts/posts-slice";

const initialState = {
  status: "idle",
  error: null,
  list: [],
};

const usersSlice = createSlice({
  name: "@@users",
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
        const { users } = action.payload;
        state.status = FetchStatus.RECEIVED;
        state.error = null;

        if (lazyLoading) {
          state.list.push(...users);
        } else {
          state.list = users;
        }
      });
  },
});

export const usersReducer = usersSlice.reducer;

// selectors
export const selectUsers = (state) => state.users.list;
export const selectUsersInfo = (state) => ({
  status: state.users.status,
  error: state.users.error,
  qty: state.users.list.length,
});

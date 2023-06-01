import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "../../consts";

export const loadUsersAsync = createAsyncThunk(
  "@@users/loadUsers",
  async (_, { getState, extra: { client, API } }) => {
    const userPromises = await getState().posts.list.map((item) =>
      client.get(API.getUserById(item.userId))
    );
    const result = await Promise.all(userPromises);
    return result;
  }
);

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
      .addCase(loadUsersAsync.pending, (state) => {
        state.status = FetchStatus.LOADING;
        state.error = null;
      })
      .addCase(loadUsersAsync.rejected, (state, action) => {
        state.status = FetchStatus.REJECTED;
        state.error = action.payload || action.meta.error;
      })
      .addCase(loadUsersAsync.fulfilled, (state, action) => {
        const { lazyLoading } = action.meta.arg;
        const users = action.payload.map(({ data }) => data);
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

import { createSlice } from "@reduxjs/toolkit";

const sortSlice = createSlice({
  name: "@@sort",
  initialState: null,
  reducers: {
    setSort: (_state, action) => action.payload,
  },
});

export const { setSort } = sortSlice.actions;
export const sortReducer = sortSlice.reducer;

// selectors
export const selectSort = (state) => state.sort;

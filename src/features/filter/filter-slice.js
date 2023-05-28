import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "@@filter",
  initialState: "",
  reducers: {
    addFilter: (_state, action) => action.payload,
  },
});

export const { addFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;

// selectors
export const selectFilter = (state) => state.filter;

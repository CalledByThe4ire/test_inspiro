import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
  name: "@@pagination",
  initialState: {
    currentPage: 1,
    isHidden: false,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setIsHidden: (state) => {
      state.isHidden = true;
    },
  },
});

export const { setCurrentPage, setIsHidden } = paginationSlice.actions;
export const paginationReducer = paginationSlice.reducer;

// selectors
export const selectPagination = (state) => state.pagination;

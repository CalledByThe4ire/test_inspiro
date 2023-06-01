import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const setCurrentPageAsync = createAsyncThunk(
  "@@pagination/setCurrentPage",
  (currentPage) => currentPage
);

export const setPageSizeAsync = createAsyncThunk(
  "@@pagination/setPageSize",
  (pageSize) => pageSize
);

export const setIsHiddenAsync = createAsyncThunk(
  "@@pagination/setIsHidden",
  () => {}
);

const paginationSlice = createSlice({
  name: "@@pagination",
  initialState: {
    currentPage: 1,
    pageSize: 3,
    isHidden: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setCurrentPageAsync.fulfilled, (state, action) => {
        state.currentPage = action.payload;
      })
      .addCase(setPageSizeAsync.fulfilled, (state, action) => {
        state.pageSize = action.payload;
      })
      .addCase(setIsHiddenAsync.fulfilled, (state) => {
        state.isHidden = true;
      });
  },
});

export const paginationReducer = paginationSlice.reducer;

// selectors
export const selectPagination = (state) => state.pagination;

import axios from "axios";
import { configureStore } from "@reduxjs/toolkit";

import * as API from "./config";
import { postsReducer } from "./features/posts/posts-slice";
import { usersReducer } from "./features/users/users-slice";
import { filterReducer } from "./features/filter/filter-slice";
import { sortReducer } from "./features/sort/sort-slice";
import { paginationReducer } from "./features/pagination/pagination-slice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    filter: filterReducer,
    sort: sortReducer,
    pagination: paginationReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware({
      thunk: {
        extraArgument: {
          client: axios,
          API,
        },
      },
      serializableCheck: false,
    }),
});

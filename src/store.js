import axios from "axios";
import { configureStore } from "@reduxjs/toolkit";

import * as API from "./config";
import { postsReducer } from "./features/posts/posts-slice";
import { filterReducer } from "./features/filter/filter-slice";
import { sortReducer } from "./features/sort/sort-slice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    filter: filterReducer,
    sort: sortReducer,
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

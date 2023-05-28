import axios from "axios";
import { configureStore } from "@reduxjs/toolkit";

import * as API from "./config";
import { postsReducer } from "./features/posts/posts-slice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
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

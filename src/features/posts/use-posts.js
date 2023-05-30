import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { loadPosts, selectAllPosts, selectPostsInfo } from "./posts-slice";

export const usePosts = (id) => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const { status, error, qty } = useSelector(selectPostsInfo);

  useEffect(() => {
    if (id) {
      dispatch(loadPosts(id));
    }
  }, [id, dispatch]);

  return [posts, { status, error, qty }];
};

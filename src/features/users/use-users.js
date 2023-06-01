import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { loadUsersAsync, selectUsers } from "./users-slice";
import { selectPosts } from "../posts/posts-slice";
import { selectPagination } from "../pagination/pagination-slice";

export const useUsers = () => {
  const posts = useSelector(selectPosts);
  const users = useSelector(selectUsers);
  const { isHidden } = useSelector(selectPagination);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUsersAsync({ lazyLoading: isHidden }));
  }, [posts, isHidden, dispatch]);

  return users;
};

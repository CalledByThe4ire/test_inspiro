import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import classnames from "classnames";
import { motion, AnimatePresence } from "framer-motion";

import { useSortableData } from "../sort/use-sortable-data";
import {
  loadPostsUsersAsync,
  selectPosts,
  selectPostsInfo,
} from "./posts-slice";
import {
  setPageSizeAsync,
  setCurrentPageAsync,
  selectPagination,
} from "../pagination/pagination-slice";
import { selectUsers, selectUsersInfo } from "../users/users-slice";
import { addFilter, selectFilter } from "../filter/filter-slice";
import {
  Color,
  FetchStatus,
  LAZY_LOADING_INTERVAL,
  LAZY_LOADING_ITEMS_LIMIT,
  SearchParam,
} from "../../consts";

import { ReactComponent as ReactCaret } from "../../assets/images/table-caret.svg";
import Pagination from "../pagination/pagination";
import styles from "./posts.module.scss";

function Posts() {
  const dispatch = useDispatch();
  const parentRef = useRef(null);
  const postsRef = useRef(null);
  const [scrollValue, setScrollValue] = useState(0);
  const { total, qty } = useSelector(selectPostsInfo);
  const { status: userFetchStatus } = useSelector(selectUsersInfo);
  const users = useSelector(selectUsers);
  const posts = useSelector(selectPosts);
  const filter = useSelector(selectFilter);
  const {
    currentPage,
    pageSize,
    isHidden: isPaginationHidden,
  } = useSelector(selectPagination);
  const { items, requestSort, sort } = useSortableData(posts);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (isPaginationHidden) {
      const parentElement = parentRef?.current;
      const newScrollValue = postsRef?.current?.scrollHeight || 0;

      if (parentElement) {
        parentElement.scrollTop = scrollValue;

        if (newScrollValue !== scrollValue) {
          setScrollValue(newScrollValue);
        }
      }
    }
    /* eslint-disable */
  }, [isPaginationHidden, posts]);
  /* eslint-enable */

  useEffect(() => {
    searchParams.forEach((value, key) => {
      switch (key) {
        case SearchParam.PAGE:
          dispatch(setCurrentPageAsync(Number(value)));
          break;
        case SearchParam.SIZE:
          dispatch(setPageSizeAsync(Number(value)));
          break;
        case SearchParam.TITLE:
          dispatch(addFilter(value));
          break;
        default:
          return;
      }
    });
  }, [searchParams, dispatch]);

  useEffect(() => {
    let timerId;

    if (isPaginationHidden) {
      if (!timerId && total - qty > 0) {
        timerId = setInterval(() => {
          if (qty + LAZY_LOADING_ITEMS_LIMIT <= total) {
            dispatch(setPageSizeAsync(LAZY_LOADING_ITEMS_LIMIT))
              .then(() => dispatch(setCurrentPageAsync(currentPage + 1)))
              .then(() => {
                dispatch(
                  loadPostsUsersAsync({ lazyLoading: isPaginationHidden })
                );
              });
          } else {
            dispatch(setPageSizeAsync(total - qty))
              .then(() =>
                dispatch(
                  loadPostsUsersAsync({ lazyLoading: isPaginationHidden })
                )
              )
              .then(() => {
                timerId = clearInterval(timerId);
              });
          }
        }, LAZY_LOADING_INTERVAL);
      }
    } else {
      dispatch(loadPostsUsersAsync({ lazyLoading: isPaginationHidden }));
    }

    return () => clearInterval(timerId);
  }, [isPaginationHidden, pageSize, qty, currentPage, total, dispatch]);

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(filter)
  );

  const getSortDirectionClassName = (name) => {
    if (!sort) {
      return;
    }
    return sort.key === name ? sort.direction : "";
  };

  return (
    <>
      {filter && filteredItems.length === 0 ? (
        <h3>Посты не найдены...</h3>
      ) : (
        <>
          <div
            className={classnames(
              {
                [`${styles["posts"]}`]: true,
              },
              "rounded"
            )}
            ref={parentRef}
          >
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
              >
                <Table className={`${styles["posts__table"]} bg-white`}>
                  <thead>
                    <tr>
                      <th
                        className={classnames("text-center", {
                          [`${styles["posts"]}`]: true,
                          [`${styles["posts__table-th"]}`]: true,
                          [`${
                            styles[
                              `posts__table-th--dir-${getSortDirectionClassName(
                                "id"
                              )}`
                            ]
                          }`]: getSortDirectionClassName("id"),
                        })}
                      >
                        <Link onClick={() => requestSort("id")}>
                          <span>id</span>
                          <ReactCaret />
                        </Link>
                      </th>
                      <th>Заголовок</th>
                      <th>Теги</th>
                      <th
                        className={`text-center ${styles["posts"]} ${
                          styles["posts__table-th"]
                        } ${
                          getSortDirectionClassName("reactions")
                            ? styles[
                                `posts__table-th--dir-${getSortDirectionClassName(
                                  "reactions"
                                )}`
                              ]
                            : ""
                        }`}
                      >
                        <Link onClick={() => requestSort("reactions")}>
                          <span>Реакции</span>
                          <ReactCaret />
                        </Link>
                      </th>
                      <th>Автор</th>
                    </tr>
                  </thead>
                  <tbody ref={postsRef}>
                    {filteredItems.map((item) => {
                      const user = users.find(({ id }) => {
                        return id === item.userId;
                      });

                      const postInfo = {
                        id: item?.id,
                        title: item?.title,
                        body: item?.body,
                        tags: item?.tags,
                        reactions: item?.reactions,
                        userName: `${user?.firstName} ${user?.lastName}`,
                      };

                      return (
                        <tr key={postInfo.id}>
                          <td className="text-center">{postInfo.id}</td>
                          <td>
                            <h4>{postInfo.title}</h4>
                            <p>{postInfo.body}</p>
                          </td>
                          <td>
                            <ul className="d-flex flex-row">
                              {postInfo.tags.map((tag, id) => {
                                return (
                                  <li key={tag}>
                                    <Badge
                                      bg={
                                        id === 0
                                          ? Color.SUCCESS
                                          : id === 1
                                          ? Color.PRIMARY
                                          : Color.WARNING
                                      }
                                    >
                                      {tag}
                                    </Badge>
                                  </li>
                                );
                              })}
                            </ul>
                          </td>
                          <td className="text-center">{postInfo.reactions}</td>
                          <td>
                            {userFetchStatus === FetchStatus.LOADING ? (
                              <Spinner animation="border" />
                            ) : (
                              postInfo.userName
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </motion.div>
            </AnimatePresence>
          </div>
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <Pagination
                currentPage={currentPage}
                totalCount={total}
                pageSize={pageSize}
                handlePageChange={(page) => dispatch(setCurrentPageAsync(page))}
              />
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </>
  );
}

export default Posts;

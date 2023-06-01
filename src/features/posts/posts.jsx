import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import classnames from "classnames";

import { useSortableData } from "../sort/use-sortable-data";
import { loadPostsAsync, selectPosts, selectPostsInfo } from "./posts-slice";
import {
  setPageSizeAsync,
  setCurrentPageAsync,
  selectPagination,
} from "../pagination/pagination-slice";
import { selectUsersInfo } from "../users/users-slice";
import { addFilter, selectFilter } from "../filter/filter-slice";
import { useUsers } from "../users/use-users";
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
  const postsRef = useRef(null);
  const { total, qty } = useSelector(selectPostsInfo);
  const { status: userFetchStatus } = useSelector(selectUsersInfo);
  const users = useUsers();
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
    const total = 20;

    if (isPaginationHidden) {
      postsRef?.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      if (!timerId && total - qty > 0) {
        timerId = setInterval(() => {
          if (qty + LAZY_LOADING_ITEMS_LIMIT <= total) {
            dispatch(setPageSizeAsync(LAZY_LOADING_ITEMS_LIMIT))
              .then(() => dispatch(setCurrentPageAsync(currentPage + 1)))
              .then(() => {
                dispatch(loadPostsAsync({ lazyLoading: isPaginationHidden }));
              });
          } else {
            dispatch(setPageSizeAsync(total - qty))
              .then(() =>
                dispatch(loadPostsAsync({ lazyLoading: isPaginationHidden }))
              )
              .then(() => {
                timerId = clearInterval(timerId);
              });
          }
        }, LAZY_LOADING_INTERVAL);
      }
    } else {
      dispatch(loadPostsAsync({ lazyLoading: isPaginationHidden }));
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
      {filteredItems.length === 0 ? (
        <h3>Посты не найдены...</h3>
      ) : (
        <>
          <div
            className={classnames({
              [`${styles["posts"]}`]: true,
              [`${styles["posts--is-lazy"]}`]: isPaginationHidden,
            })}
            ref={postsRef}
          >
            <Table
              hover
              className={`${styles["posts__table"]} bg-white rounded`}
            >
              <thead>
                <tr>
                  <th
                    className={classnames("text-center", {
                      [`${styles["posts"]}`]: true,
                      [`${styles["posts__th"]}`]: true,
                      [`${
                        styles[
                          `posts__th--dir-${getSortDirectionClassName("id")}`
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
                      styles["posts__th"]
                    } ${
                      getSortDirectionClassName("reactions")
                        ? styles[
                            `posts__th--dir-${getSortDirectionClassName(
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
              <tbody>
                {filteredItems.map((item) => {
                  const [user] = users.filter(({ id }) => {
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
          </div>
          <Pagination
            currentPage={currentPage}
            totalCount={total}
            pageSize={pageSize}
            handlePageChange={(page) => dispatch(setCurrentPageAsync(page))}
          />
        </>
      )}
    </>
  );
}

export default Posts;

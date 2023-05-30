import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import classnames from "classnames";

import { useUserAPI } from "../../contexts";
import { useSortableData } from "../sort/use-sortable-data";
import { selectAllPosts } from "./posts-slice";
import {
  selectPagination,
  setCurrentPage,
} from "../pagination/pagination-slice";
import { selectFilter } from "../filter/filter-slice";
import { Color, PAGE_SIZE } from "../../consts";

import { ReactComponent as ReactCaret } from "../../assets/images/table-caret.svg";
import Pagination from "../pagination/pagination";
import styles from "./posts.module.scss";

function Posts() {
  const dispatch = useDispatch();
  const { user } = useUserAPI();
  const posts = useSelector(selectAllPosts);
  const filter = useSelector(selectFilter);
  const { currentPage } = useSelector(selectPagination);
  const { items, requestSort, sort } = useSortableData(posts);

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(filter)
  );

  const getSortDirectionClassName = (name) => {
    if (!sort) {
      return;
    }
    return sort.key === name ? sort.direction : "";
  };

  const currentPostsData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PAGE_SIZE;
    const lastPageIndex = firstPageIndex + PAGE_SIZE;
    return filteredItems.slice(firstPageIndex, lastPageIndex);
  }, [filteredItems, currentPage]);

  return (
    <>
      {filteredItems.length === 0 ? (
        <h3>Посты не найдены...</h3>
      ) : (
        <>
          <Table hover className={`${styles.posts} bg-white rounded`}>
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
              {currentPostsData.map((item) => {
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
                    <td>{postInfo.userName}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Pagination
            currentPage={currentPage}
            totalCount={filteredItems.length}
            pageSize={PAGE_SIZE}
            handlePageChange={(page) => dispatch(setCurrentPage(page))}
          />
        </>
      )}
    </>
  );
}

export default Posts;

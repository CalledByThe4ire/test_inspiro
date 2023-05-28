import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";

import { useUserAPI } from "../../contexts";
import { useSortableData } from "../sort/use-sortable-data";
import { selectAllPosts } from "./posts-slice";
import { selectFilter } from "../filter/filter-slice";
import { Color } from "../../consts";

import { ReactComponent as ReactCaret } from "../../assets/images/table-caret.svg";
import styles from "./posts.module.scss";

function Posts() {
  const { user } = useUserAPI();
  const posts = useSelector(selectAllPosts);
  const filter = useSelector(selectFilter);
  const { items, requestSort, sort } = useSortableData(posts);

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(filter)
  );

  const getClassNamesFor = (name) => {
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
          <Table hover className={`${styles.posts} bg-white rounded`}>
            <thead>
              <tr>
                <th
                  className={`text-center ${styles["posts"]} ${
                    styles["posts__th"]
                  } ${
                    getClassNamesFor("id")
                      ? styles[`posts__th--dir-${getClassNamesFor("id")}`]
                      : ""
                  }`}
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
                    getClassNamesFor("reactions")
                      ? styles[
                          `posts__th--dir-${getClassNamesFor("reactions")}`
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
        </>
      )}
    </>
  );
}

export default Posts;

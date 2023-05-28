import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";

import { useUserAPI } from "../../contexts";
import { selectAllPosts } from "./posts-slice";
import { Color } from "../../consts";

import { ReactComponent as ReactCaret } from "../../assets/images/table-caret.svg";
import styles from "./posts.module.scss";

function Posts() {
  const { user } = useUserAPI();
  const posts = useSelector(selectAllPosts);

  return (
    <Table hover className={`${styles.posts} bg-white rounded`}>
      <thead>
        <tr>
          <th className="text-center">
            <Link>
              <span>id</span>
              <ReactCaret />
            </Link>
          </th>
          <th>Заголовок</th>
          <th>Теги</th>
          <th className="text-center">
            <Link>
              <span>реакции</span>
              <ReactCaret />
            </Link>
          </th>
          <th>Автор</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => {
          const postInfo = {
            id: post?.id,
            title: post?.title,
            body: post?.body,
            tags: post?.tags,
            reactions: post?.reactions,
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
  );
}

export default Posts;

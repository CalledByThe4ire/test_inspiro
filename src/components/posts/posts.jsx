import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";

import { ReactComponent as ReactCaret } from "../../assets/images/table-caret.svg";
import styles from "./posts.module.scss";

function Posts() {
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
        <tr>
          <td className="text-center">1</td>
          <td>
            <h4>Заголовок поста</h4>
            <p>
              His mother had always taught him not to ever think of himself as
              better...
            </p>
          </td>
          <td>
            <ul className="d-flex flex-row">
              <li>
                <Badge bg="success">crime</Badge>
              </li>
              <li>
                <Badge bg="primary">american</Badge>
              </li>
              <li>
                <Badge bg="warning">history</Badge>
              </li>
            </ul>
          </td>
          <td className="text-center">2</td>
          <td>Terry Medhurst</td>
        </tr>
        <tr>
          <td className="text-center">2</td>
          <td>
            <h4>Заголовок поста</h4>
            <p>
              His mother had always taught him not to ever think of himself as
              better...
            </p>
          </td>

          <td>
            <ul className="d-flex flex-row">
              <li>
                <Badge bg="success">crime</Badge>
              </li>
              <li>
                <Badge bg="primary">american</Badge>
              </li>
              <li>
                <Badge bg="warning">history</Badge>
              </li>
            </ul>
          </td>
          <td className="text-center">1</td>
          <td>Terry Medhurst</td>
        </tr>
        <tr>
          <td className="text-center">3</td>
          <td>
            <h4>Заголовок поста</h4>
            <p>
              His mother had always taught him not to ever think of himself as
              better...
            </p>
          </td>
          <td>
            <ul className="d-flex flex-row">
              <li>
                <Badge bg="success">crime</Badge>
              </li>
              <li>
                <Badge bg="primary">american</Badge>
              </li>
              <li>
                <Badge bg="warning">history</Badge>
              </li>
            </ul>
          </td>
          <td className="text-center">4</td>
          <td>Terry Medhurst</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default Posts;

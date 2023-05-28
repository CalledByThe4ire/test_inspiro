import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import { useSelector } from "react-redux";
import {} from "../../features/posts/posts-slice";

import styles from "./filter.module.scss";
import classnames from "classnames";

function Filter() {
  return (
    <div
      className={classnames(styles.filter, {
        "d-flex": true,
        "flex-row": true,
        "flex-wrap": true,
      })}
    >
      <Form.Label
        htmlFor="basic-url"
        className={classnames(styles["filter__title"], {
          "d-flex": true,
          "mb-0": true,
        })}
      >
        Заголовок
      </Form.Label>
      <InputGroup className="mb-2">
        <Form.Control
          id="basic-url"
          placeholder="Введите заголовок для поиска"
          className={classnames(styles["filter__field"], {
            "d-flex": true,
            "py-2": true,
          })}
        />
      </InputGroup>
      <Button
        variant="outline-secondary"
        className="ms-auto"
        style={{ minWidth: "150px" }}
      >
        Фильтровать
      </Button>
    </div>
  );
}

export default Filter;

import { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import { useDispatch } from "react-redux";
import { addFilter } from "./filter-slice";

import styles from "./filter.module.scss";

function Filter() {
  const formControlRef = useRef();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  return (
    <div className={`${styles.filter} d-flex flex-row flex-wrap`}>
      <Form.Label
        htmlFor="basic-url"
        className={`${styles["filter__title"]} d-flex mb-2`}
      >
        Заголовок
      </Form.Label>
      <InputGroup className="mb-2">
        <Form.Control
          className={`${styles["filter__field"]} d-flex py-2`}
          ref={formControlRef}
          id="basic-url"
          placeholder="Введите заголовок для поиска"
          value={search}
          onChange={(evt) => setSearch(evt.target.value)}
        />
      </InputGroup>
      <Button
        variant="outline-secondary"
        className="ms-auto"
        style={{ minWidth: "150px" }}
        onClick={(evt) => {
          evt.preventDefault();

          dispatch(addFilter(search.trim()));
          formControlRef?.current.focus();
          formControlRef?.current.select();
        }}
      >
        Фильтровать
      </Button>
    </div>
  );
}

export default Filter;

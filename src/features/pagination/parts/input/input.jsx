import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";

import { selectPagination, setPageSizeAsync } from "../../pagination-slice";
import styles from "../../pagination.module.scss";
import { Range } from "../../../../consts";

function Input(_props) {
  const dispatch = useDispatch();
  const { pageSize } = useSelector(selectPagination);
  const [input, setInput] = useState(pageSize);

  return (
    <Form.Control
      className={`${styles["pagination__btn--set-page-size"]} text-center ms-auto`}
      placeholder={pageSize}
      value={input}
      onChange={(evt) => setInput(evt.target.value)}
      onBlur={() => {
        if (!Number(input)) {
          setInput(pageSize);
        } else {
          const newPageSize = Number(input);

          dispatch(
            setPageSizeAsync(
              Math.max(Math.min(newPageSize, Range.MAX), Range.MIN)
            )
          );
          setInput(Math.max(Math.min(newPageSize, Range.MAX), Range.MIN));
        }
      }}
    />
  );
}

export default Input;

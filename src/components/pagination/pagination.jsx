import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { ReactComponent as IconClose } from "../../assets/images/cross.svg";
import { ReactComponent as IconFirstLast } from "../../assets/images/pagination-caret-first-last.svg";
import { ReactComponent as IconPrevNext } from "../../assets/images/pagination-caret-prev-next.svg";
import styles from "./pagination.module.scss";

function Pagination() {
  return (
    <Card className={`${styles.pagination} mt-auto`}>
      <Card.Body className="d-flex flex-column flex-wrap align-items-center justify-content-center p-2">
        <ul
          className={`${styles["pagination__list"]} d-flex align-items-center justify-content-center ms-auto`}
        >
          <li className={styles["pagination__item"]}>
            <Link
              to="/"
              className={`${styles["pagination__btn"]} ${styles["pagination__btn--first"]}`}
            >
              <IconFirstLast />
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className={`${styles["pagination__btn"]} styles["pagination__btn--prev"]`}
            >
              <IconPrevNext />
            </Link>
          </li>
          <li className={styles["pagination__item"]}>
            <Link to="/" className={styles["pagination__btn"]}>
              1
            </Link>
          </li>

          <li className={styles["pagination__item"]}>
            <Link to="/" className={styles["pagination__btn"]}>
              2
            </Link>
          </li>

          <li className={styles["pagination__item"]}>
            <Link to="/" className={styles["pagination__btn"]}>
              3
            </Link>
          </li>

          <li className={styles["pagination__item"]}>
            <Link
              to="/"
              className={`${styles["pagination__btn"]} ${styles["pagination__btn--active"]}`}
            >
              4
            </Link>
          </li>

          <li className={styles["pagination__item"]}>
            <Link to="/" className={styles["pagination__btn"]}>
              5
            </Link>
          </li>

          <li className={styles["pagination__item"]}>
            <Link to="/" className={styles["pagination__btn"]}>
              6
            </Link>
          </li>

          <li className={styles["pagination__item"]}>
            <Link to="/" className={styles["pagination__btn"]}>
              7
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className={`${styles["pagination__btn"]} ${styles["pagination__btn--next"]}`}
            >
              <IconPrevNext />
            </Link>
          </li>
          <li className={styles["pagination__item"]}>
            <Link
              to="/"
              className={`${styles["pagination__btn"]} ${styles["pagination__btn--last"]}`}
            >
              <IconFirstLast />
            </Link>
          </li>
        </ul>
        <Button
          variant="link"
          to="/"
          className={`${styles["pagination__btn"]} ${styles["pagination__btn--close"]} d-inline-flex p-0 m-0 ms-auto`}
        >
          <IconClose />
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Pagination;

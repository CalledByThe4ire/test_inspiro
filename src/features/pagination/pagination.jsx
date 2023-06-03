import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import classnames from "classnames";

import { Separator } from "../../consts";
import { usePagination } from "./usePagination";
import { setIsHiddenAsync, selectPagination } from "./pagination-slice";
import { selectPostsInfo } from "../posts/posts-slice";
import { ReactComponent as IconClose } from "../../assets/images/cross.svg";
import { ReactComponent as IconFirstLast } from "../../assets/images/pagination-caret-first-last.svg";
import { ReactComponent as IconPrevNext } from "../../assets/images/pagination-caret-prev-next.svg";
import PaginationInput from "./parts/input/input";
import styles from "./pagination.module.scss";

function Pagination(props) {
  const {
    handlePageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  const dispatch = useDispatch();
  const paginationRef = useRef(null);
  const { isHidden } = useSelector(selectPagination);
  const { qty } = useSelector(selectPostsInfo);

  useEffect(() => {
    if (!isHidden) {
      paginationRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [qty, isHidden]);

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const handleNext = () => {
    handlePageChange(currentPage + 1);
  };

  const handlePrev = () => {
    handlePageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <Card
      className={classnames("mt-auto", {
        [`${styles["pagination"]}`]: true,
        "visually-hidden": isHidden,
      })}
      ref={paginationRef}
    >
      <Card.Body className="d-flex flex-row flex-wrap align-items-center justify-content-center p-2">
        <PaginationInput />
        <ul
          className={`${styles["pagination__list"]} d-flex align-items-center justify-content-center`}
        >
          <li
            className={classnames({
              [`${styles["pagination__item"]}`]: true,
              [`${styles["pagination__item--first"]}`]: true,
              [`${styles["pagination__item--disabled"]}`]: currentPage === 1,
            })}
          >
            <Link
              to="/"
              className={`${styles["pagination__link"]}`}
              onClick={handlePrev}
            >
              <IconFirstLast />
            </Link>
          </li>
          {paginationRange.map((pageNumber) => {
            if (pageNumber === Separator.PREV) {
              return (
                <li
                  key={pageNumber}
                  className={`${styles["pagination__item"]} ${styles["pagination__item--prev"]} ${styles["pagination__item--disabled"]}`}
                >
                  <Link to="/" className={`${styles["pagination__link"]}`}>
                    <IconPrevNext />
                  </Link>
                </li>
              );
            } else if (pageNumber === Separator.NEXT) {
              return (
                <li
                  key={pageNumber}
                  className={`${styles["pagination__item"]} ${styles["pagination__item--next"]} ${styles["pagination__item--disabled"]}`}
                >
                  <Link to="/" className={`${styles["pagination__link"]}`}>
                    <IconPrevNext />
                  </Link>
                </li>
              );
            }

            return (
              <li
                key={pageNumber}
                className={classnames({
                  [`${styles["pagination__item"]}`]: true,
                  [`${styles["pagination__item--active"]} ${styles["pagination__item--disabled"]}`]:
                    pageNumber === currentPage,
                })}
              >
                <Link
                  to="/"
                  className={`${styles["pagination__link"]}`}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </Link>
              </li>
            );
          })}

          <li
            className={classnames({
              [`${styles["pagination__item"]}`]: true,
              [`${styles["pagination__item--last"]}`]: true,
              [`${styles["pagination__item--disabled"]}`]:
                currentPage === lastPage,
            })}
          >
            <Link
              to="/"
              className={`${styles["pagination__link"]}`}
              onClick={handleNext}
            >
              <IconFirstLast />
            </Link>
          </li>
        </ul>
        <Button
          variant="link"
          to="/"
          className={classnames("d-inline-flex", "p-0", "m-0", "ms-auto", {
            [`${styles["pagination__btn"]}`]: true,
            [`${styles["pagination__btn--close"]}`]: true,
            [`${styles["pagination__btn--is-hidden"]}`]: isHidden,
          })}
          onClick={() => dispatch(setIsHiddenAsync())}
        >
          <IconClose />
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Pagination;

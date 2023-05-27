import Container from "react-bootstrap/Container";

import Filter from "../filter/filter";
import Posts from "../posts/posts";
import Pagination from "../pagination/pagination";

import styles from "./main-page.module.scss";

function MainPage({ title }) {
  return (
    <Container
      fluid
      className={`${styles["main-page"]} d-flex flex-column flex-wrap p-0`}
    >
      <div
        className={`${styles["main-page__wrapper"]} d-flex flex-column flex-wrap`}
      >
        <h2 className={styles["main-page__title"]}>{title}</h2>
        <Filter />
        <Posts />
        <Pagination />
      </div>
    </Container>
  );
}

export default MainPage;

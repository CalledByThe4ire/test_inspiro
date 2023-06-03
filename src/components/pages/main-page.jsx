import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

import Filter from "../../features/filter/filter";
import Posts from "../../features/posts/posts";

import { selectPostsInfo } from "../../features/posts/posts-slice";
import { FetchStatus } from "../../consts";

import styles from "./main-page.module.scss";

function MainPage() {
  const { status, error, qty } = useSelector(selectPostsInfo);

  return (
    <Container
      fluid
      className={`${styles["main-page"]} d-flex flex-column flex-wrap p-0`}
      as="main"
    >
      <div className={`${styles["main-page__wrapper"]}`}>
        {error && <h2>Не удалось получить данные от сервера</h2>}
        {status === FetchStatus.LOADING && (
          <h3>
            <Spinner animation="border" /> Загружаем посты...
          </h3>
        )}
        {status === FetchStatus.RECEIVED && qty !== 0 && (
          <>
            <h3 className={styles["main-page__title"]}>Посты</h3>
          </>
        )}
        <>
          <Filter />
          <Posts />
        </>
      </div>
    </Container>
  );
}

export default MainPage;

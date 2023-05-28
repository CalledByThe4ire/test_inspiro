import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

import Filter from "../../features/filter/filter";
import Posts from "../../features/posts/posts";
import Pagination from "../pagination/pagination";

import { useUserAPI } from "../../contexts";
import { usePosts } from "../../features/posts/use-posts";
import { selectPostsInfo } from "../../features/posts/posts-slice";

import styles from "./main-page.module.scss";

function MainPage() {
  const { error, status, qty } = useSelector(selectPostsInfo);
  const { user } = useUserAPI();
  usePosts(user?.id);

  return (
    <Container
      fluid
      className={`${styles["main-page"]} d-flex flex-column flex-wrap p-0`}
    >
      <div
        className={`${styles["main-page__wrapper"]} d-flex flex-column flex-wrap`}
      >
        {error && <h2>Не удалось получить данные от сервера</h2>}
        {status === "loading" && (
          <h3>
            <Spinner animation="grow" /> Загружаем посты...
          </h3>
        )}
        {status === "received" && qty === 0 && (
          <h3>{`У пользователя ${user?.firstName} ${user?.lastName} нет постов`}</h3>
        )}
        {status === "received" && qty !== 0 && (
          <>
            <h3 className={styles["main-page__title"]}>
              Посты пользователя {user?.firstName} {user?.lastName}
            </h3>
            <Filter />
            <Posts />
            <Pagination />
          </>
        )}
      </div>
    </Container>
  );
}

export default MainPage;

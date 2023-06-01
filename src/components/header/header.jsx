import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";

import Logo from "../logo/logo";
import Profile from "../profile/profile";
import styles from "./header.module.scss";

function Header() {
  return (
    <Container
      fluid
      className={`${styles.header} bg-dark d-flex p-0`}
      as="header"
    >
      <div
        className={`${styles["header__wrapper"]} d-flex align-items-center justify-content-between`}
      >
        <h1 className="p-0 m-0">
          <Link to="/" className="d-flex">
            <Logo />
          </Link>
        </h1>
        <Profile />
      </div>
    </Container>
  );
}

export default Header;

import { Link } from "react-router-dom";
import styles from "./profile.module.scss";

function Profile() {
  return (
    <div
      className={`${styles.profile} d-flex align-items-center justify-content-center`}
    >
      <Link
        className={`${styles["profile__link"]} ${styles["profile__link--user-name"]} text-align text-white`}
        to="/"
        data-text="A"
      >
        Alexander
      </Link>
      <Link
        className={`${styles["profile__link"]} ${styles["profile__link--feedback"]} text-light`}
        to="/"
      >
        ?
      </Link>
    </div>
  );
}

export default Profile;

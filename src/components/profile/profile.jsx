import { Link } from "react-router-dom";

import { useUserAPI } from "../../contexts";
import { Color } from "../../consts";
import { getRandomNumber } from "../../utils";
import styles from "./profile.module.scss";

function Profile() {
  const { user = {} } = useUserAPI();

  return (
    <div
      className={`${styles.profile} d-flex align-items-center justify-content-center`}
    >
      <Link
        className={`${styles["profile__link"]} ${styles["profile__link--user-name"]} text-align text-white`}
        to="/"
      >
        {user?.firstName}
        <span
          className={`bg-${
            Object.values(Color)[
              getRandomNumber(0, Object.keys(Color).length - 1)
            ]
          }`}
        >
          {user?.firstName.at(0)}
        </span>
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

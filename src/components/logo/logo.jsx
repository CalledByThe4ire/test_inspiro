import { ReactComponent as ReactLogo } from "../../assets/images/logo.svg";
import styles from "./logo.module.scss";

function Logo() {
  return <ReactLogo className={styles.logo} />;
}

export default Logo;

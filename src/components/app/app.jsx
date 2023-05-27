import { BrowserRouter as Router } from "react-router-dom";

import Header from "../header/header";
import MainPage from "../pages/main-page";

import styles from "./app.module.scss";
import classnames from "classnames";

function App() {
  return (
    <Router>
      <div className={classnames(styles.app)}>
        <Header />
        <MainPage title="Посты" />
      </div>
    </Router>
  );
}

export default App;

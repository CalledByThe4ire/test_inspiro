import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainPage from "../pages/main-page";
import Layout from "../layout/layout";
import { APIUserContextProvider } from "../../contexts";
import styles from "./app.module.scss";

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <APIUserContextProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<MainPage />} />
            </Route>
          </Routes>
        </APIUserContextProvider>
      </div>
    </Router>
  );
}

export default App;

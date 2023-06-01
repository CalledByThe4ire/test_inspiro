import { Outlet } from "react-router-dom";
import Header from "../header/header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

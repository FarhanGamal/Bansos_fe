import { Outlet } from "react-router-dom";
import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";

export default function PublicLayout() {
  return (
    <>
      <Header />
        <Outlet />
      <Footer />
    </>
  )
}
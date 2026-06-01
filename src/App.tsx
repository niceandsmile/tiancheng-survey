import { Outlet } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import FloatingCall from "./components/common/FloatingCall";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      <FloatingCall />
    </div>
  );
}

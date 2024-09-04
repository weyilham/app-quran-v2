import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Content from "./components/Layouts/Content";
import Footer from "./components/Layouts/Footer";
import Sidebar from "./components/Layouts/Sidebar";
import { useEffect, useState } from "react";
import SidbarMenu from "./components/Layouts/SidbarMenu";

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (pathname === "/") {
      navigate("/surat/1");
    }
  }, [pathname, navigate]);

  const handleClick = () => {
    setIsActive(!isActive);
  };
  return (
    <div className="w-screen h-screen bg-slate-100 lg:p-4 p-0 relative">
      <div className={`container mx-auto p-2 lg:p-4 lg:flex lg:gap-4 `}>
        <div
          className={`${isActive ? "block " : "hidden"} lg:hidden`}
          id="sidebar-menu"
        >
          <div className="bg-slate-100 shadow-md w-[75%] h-[75%] rounded-md fixed bottom-0 left-1/2 -translate-x-1/2 ">
            <Sidebar active={isActive} />
          </div>
        </div>

        <SidbarMenu onClick={handleClick} active={isActive} />
        <Sidebar />
        <Content />
      </div>
      <Footer />
    </div>
  );
}

export default App;

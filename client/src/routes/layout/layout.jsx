import { Outlet } from "react-router-dom";
import LeftBar from "../../components/leftBar/leftBar";
import TopBar from "../../components/topBar/topBar";
import "./layout.css";

const MainLayout = () => {
  return (
    <div className="app">
      <LeftBar />
      <div className="content">
        <TopBar />
        <Outlet/>
      </div>
    </div>
  );
};

export default MainLayout
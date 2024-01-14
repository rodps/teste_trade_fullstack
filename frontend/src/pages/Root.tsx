import { Outlet } from "react-router-dom";
import { FaTrophy } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import MenuButton from "../components/MenuButton";

export default function Root() {
  return (
    <div className="h-full bg-primary-50 flex">
      <nav className="h-full flex flex-column justify-content-between w-20rem bg-primary-100 py-4 fixed">
        <div>
          <MenuButton
            to="/championship"
            label="Championship"
            icon={<FaTrophy />}
          />
          <MenuButton to="/historic" label="Historic" icon={<FaHistory />} />
        </div>
        <MenuButton to="/logout" label="Logout" icon={<LuLogOut />} />
      </nav>
      <div
        className="py-5 px-8 w-full min-h-screen"
        style={{ marginLeft: "20rem" }}
      >
        <Outlet />
      </div>
    </div>
  );
}

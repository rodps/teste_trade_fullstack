import { Link, Outlet, useLocation } from "react-router-dom";

const MenuButton = ({ to, label }: { to: string; label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      className={`w-full block text-center py-3 hover:bg-primary-200 no-underline text-900 font-semibold ${
        isActive ? "bg-primary-200" : ""
      }`}
      to={to}
    >
      {label}
    </Link>
  );
};

export default function Root() {
  return (
    <div className="h-full bg-primary-50 flex">
      <nav className="h-full flex flex-column justify-content-between w-20rem bg-primary-100 py-4 fixed">
        <div>
          <MenuButton to="/championship" label="Championship" />
          <MenuButton to="/historic" label="Historic" />
        </div>
        <MenuButton to="/logout" label="Logout" />
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

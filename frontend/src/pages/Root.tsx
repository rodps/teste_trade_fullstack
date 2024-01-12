import { Link } from "react-router-dom";

const MenuButton = ({ to, label }: { to: string; label: string }) => {
  return (
    <Link
      className="w-full block text-center py-3 hover:bg-primary-200 no-underline text-900"
      to={to}
    >
      {label}
    </Link>
  );
};

export default function Root() {
  return (
    <div className="h-screen bg-primary-50">
      <div className="h-full flex flex-column justify-content-between w-2 bg-primary-100 py-4">
        <div>
          <MenuButton to="/" label="Championships" />
          <MenuButton to="/historic" label="Historic" />
        </div>
        <MenuButton to="/logout" label="Logout" />
      </div>
    </div>
  );
}

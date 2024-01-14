import { Link, useLocation } from "react-router-dom";

export default function MenuButton({
  to,
  label,
  icon,
}: {
  to: string;
  label: string;
  icon?: JSX.Element;
}) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      className={`w-full block text-center py-3 hover:bg-primary-200 no-underline text-900 font-semibold flex align-items-center gap-2 justify-content-center ${
        isActive ? "bg-primary-200" : ""
      }`}
      to={to}
    >
      {icon}
      {label}
    </Link>
  );
}

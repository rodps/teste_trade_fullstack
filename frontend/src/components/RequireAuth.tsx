import { Navigate } from "react-router-dom";
import { cookies } from "../libs/cookies";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  if (!cookies.getJWT()) {
    return <Navigate to="/login" />;
  }
  return children;
}

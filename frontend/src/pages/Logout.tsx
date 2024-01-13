import { toast } from "react-toastify";
import { cookies } from "../libs/cookies";
import { Navigate } from "react-router-dom";

export default function Logout() {
  cookies.deleteJWT();
  toast.success("Logout successfully");
  return <Navigate to="/login" replace={true} />;
}

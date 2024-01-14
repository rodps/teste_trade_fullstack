import { ProgressSpinner } from "primereact/progressspinner";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import axiosClient from "../libs/axios";
import { cookies } from "../libs/cookies";
import { toast } from "react-toastify";

export default function OauthGithub() {
  const [urlSearchParams] = useSearchParams();
  const code = urlSearchParams.get("code");
  const navigate = useNavigate();

  if (!code) {
    return <Navigate to={"/login"} replace={true} />;
  }

  axiosClient
    .post(
      "/oauth/github",
      {},
      {
        params: {
          code,
        },
      },
    )
    .then((res) => {
      const token = res.data.token;
      cookies.storeJWT(token);
      window.location.href = "/championship";
    })
    .catch(() => {
      toast.error("Authentication failed");
      navigate("/login");
    });

  return (
    <div className="bg-primary-50 w-screen h-screen flex flex-column gap-3 justify-content-center align-items-center">
      <ProgressSpinner />
      <p className="text-900 font-semibold">Authenticating...</p>
    </div>
  );
}

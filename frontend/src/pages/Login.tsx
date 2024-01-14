import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import axiosClient from "../libs/axios";
import { AxiosError } from "axios";
import { cookies } from "../libs/cookies";
import InputErrorHelper from "../components/InputErrorHelper";
import { toast } from "react-toastify";
import { FaGithubAlt } from "react-icons/fa";
import { LuLogIn } from "react-icons/lu";
import { env } from "../env";

type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const mutation = useMutation<any, AxiosError, Inputs>({
    mutationFn: (data: Inputs) => axiosClient.post("/login", data),
    onSuccess: (data) => {
      const token = data.data.token;
      cookies.storeJWT(token);
      window.location.href = "/championship";
    },
    onError: (error) => {
      const errorMessage = error.response?.data as any;
      toast.error(errorMessage.error);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutation.mutate(data);
  };

  const githubLogin = () => {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set("client_id", env.githubClientId);
    urlSearchParams.set("redirect_uri", env.githubRedirectUri);
    urlSearchParams.set("scope", "user");
    const url = `https://github.com/login/oauth/authorize?${urlSearchParams.toString()}`;
    window.location.href = url;
  };

  return (
    <div className="flex justify-content-center align-items-center h-screen bg-primary-50">
      <Card title="Login" className="w-26rem p-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-column gap-3">
            <div>
              <InputText
                type="text"
                placeholder="Email"
                className={`block w-full ${errors.email ? "p-invalid" : ""}`}
                {...register("email", {
                  required: { message: "This field is required", value: true },
                })}
              />
              {errors.email && (
                <InputErrorHelper error={errors.email.message!} />
              )}
            </div>
            <div>
              <InputText
                type="password"
                placeholder="Password"
                className={`block w-full ${errors.password ? "p-invalid" : ""}`}
                {...register("password", {
                  required: { message: "This field is required", value: true },
                })}
              />
              {errors.password && (
                <InputErrorHelper error={errors.password.message!} />
              )}
            </div>
            <Button
              label="Login with GitHub"
              outlined
              type="button"
              icon={<FaGithubAlt />}
              onClick={githubLogin}
            />
            <Button
              label="Login"
              type="submit"
              loading={mutation.isLoading}
              icon={<LuLogIn />}
            />
          </div>
        </form>
      </Card>
    </div>
  );
}

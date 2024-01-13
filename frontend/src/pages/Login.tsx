import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import axiosClient from "../libs/axios";
import { AxiosError } from "axios";
import { cookies } from "../libs/cookies";
import InputErrorHelper from "../components/InputErrorHelper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

  const navigate = useNavigate();

  const mutation = useMutation<any, AxiosError, Inputs>((data: Inputs) =>
    axiosClient.post("/login", data),
  );

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutation.mutate(data);
  };

  if (mutation.isError) {
    const error = mutation.error.response?.data as any;
    toast.error(error.error);
  }
  if (mutation.isSuccess) {
    cookies.storeJWT(mutation.data.data.token);
    navigate("/championship");
  }

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
            <Button label="Social Login" outlined type="button" />
            <Button label="Login" type="submit" loading={mutation.isLoading} />
          </div>
        </form>
      </Card>
    </div>
  );
}

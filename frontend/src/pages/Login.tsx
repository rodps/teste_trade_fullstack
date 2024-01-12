import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";

export default function Login() {
  return (
    <div className="flex justify-content-center align-items-center h-screen bg-primary-50">
      <Card title="Login" className="w-3 p-5">
        <form action="">
          <div className="flex flex-column gap-3">
            <InputText type="text" placeholder="Email" />
            <InputText type="password" placeholder="Password" />
            <Button label="Social Login" outlined type="button" />
            <Button label="Login" type="submit" />
          </div>
        </form>
      </Card>
    </div>
  );
}

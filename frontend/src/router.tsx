import { createBrowserRouter } from "react-router-dom";
import Championship from "./pages/Championship";
import Historic from "./pages/Historic";
import Login from "./pages/Login";
import Root from "./pages/Root";
import RequireAuth from "./components/RequireAuth";
import Logout from "./pages/Logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <Root />
      </RequireAuth>
    ),
    children: [
      {
        path: "/championship",
        element: <Championship />,
      },
      {
        path: "/historic",
        element: <Historic />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);

export { router };

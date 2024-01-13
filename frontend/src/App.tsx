import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { router } from "./router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <ToastContainer theme="colored" />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />;
      </QueryClientProvider>
    </>
  );
}

export default App;

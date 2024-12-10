import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout.jsx";
import App from "./App.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>404</div>,
    children: [
      { path: "/", element: <App /> },
      // Add other routes here
    ],
  },
]);

export default router;

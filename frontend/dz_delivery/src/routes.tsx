import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout.jsx";
import App from "./App.jsx";
import PackageManagement from "./pages/PackageManagement.js";
import Allocation from "./pages/Allocation.js";
import StockPrediction from "./pages/Prediction.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>404</div>,
    children: [
      { path: "/", element: <App /> },
      {path:"/package-management", element: <PackageManagement />,},
      {path:"/allocation", element: <Allocation />,},
      {path:"/prediction", element: <StockPrediction />,}
    ],
  },
]);

export default router;

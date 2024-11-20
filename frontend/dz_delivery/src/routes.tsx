import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App />, errorElement: <div>404</div>, children: [] },
]);

export default router;

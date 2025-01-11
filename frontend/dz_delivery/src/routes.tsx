import { createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Pincode from "./pages/Pincode";
import Track from "./pages/Track";
import React from "react";

const router = createBrowserRouter([
  { path: "/", element: <App />, errorElement: <div>404</div>, 
    children: [
      { path: "/", element: <Home /> },
      { path: "Login", element: <Login /> },
      { path: "Signup", element: <Signup /> },
      { path: "Package", element: <Pincode />},
      { path: "Track", element: <Track />},
    ] 
  },
]);

export default router;

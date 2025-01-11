import { createBrowserRouter } from "react-router-dom";
<<<<<<< Updated upstream
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Pincode from "./pages/Pincode"
import React from "react";
=======
import App from "./App.jsx";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
>>>>>>> Stashed changes

const router = createBrowserRouter([
  { path: "/", element: <App />, errorElement: <div>404</div>, 
    children: [
      { path: "/", element: <Home /> },
      { path: "Login", element: <Login /> },
      { path: "Signup", element: <Signup /> },
<<<<<<< Updated upstream
      { path: "Package", element: <Pincode />},
=======
>>>>>>> Stashed changes
    ] 
  },
]);

export default router;

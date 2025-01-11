import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "react-bootstrap";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
<<<<<<< Updated upstream
import React from "react";
=======
import theme from "./theme";
>>>>>>> Stashed changes



createRoot(document.getElementById("root")!).render(
<StrictMode>
<<<<<<< Updated upstream
=======
    <ThemeProvider theme={theme}>
>>>>>>> Stashed changes
      <CssBaseline />
      <RouterProvider router={router} />
  </StrictMode>
);



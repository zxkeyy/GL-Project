import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "react-bootstrap";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import React from "react";



createRoot(document.getElementById("root")!).render(
<StrictMode>
      <CssBaseline />
      <RouterProvider router={router} />
  </StrictMode>
);



import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { RouterProvider } from "react-router-dom";
import "./i18n.js";
import "./index.css";
import theme from "./theme";
import router from "./routes.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Suspense fallback={<div>Loading...</div>}>
                <RouterProvider router={router} />
                <Toaster />
            </Suspense>
        </ThemeProvider>
    </StrictMode>
);

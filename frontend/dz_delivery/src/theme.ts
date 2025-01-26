import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#72BF78",
            light: "#A0D683",
            dark: "#5A9960",
        },
        secondary: {
            main: "#FEFF9F",
            light: "#FFFFB5",
            dark: "#CBCC7F",
        },
        background: {
            default: "#F5F5F5",
            paper: "#FFFFFF",
        },
        text: {
            primary: "#333333",
            secondary: "#666666",
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: "2.5rem",
            fontWeight: 700,
            color: "#72BF78",
        },
        h2: {
            fontSize: "2rem",
            fontWeight: 600,
            color: "#72BF78",
        },
        h3: {
            fontSize: "1.75rem",
            fontWeight: 600,
            color: "#72BF78",
        },
        h4: {
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "#72BF78",
        },
        h5: {
            fontSize: "1.25rem",
            fontWeight: 500,
            color: "#72BF78",
        },
        h6: {
            fontSize: "1rem",
            fontWeight: 500,
            color: "#72BF78",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: "none",
                    fontWeight: 600,
                },
                contained: {
                    boxShadow: "none",
                    "&:hover": {
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                },
            },
        },
    },
});

export default theme;

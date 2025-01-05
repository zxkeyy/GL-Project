import { Button, Typography, Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./components/LanguageSwitcher";

function App() {
  const { t, i18n } = useTranslation();
  return (
    <Container>
      <p>Current Language: {i18n.language}</p>
      <LanguageSwitcher />
      <Typography variant="h2" gutterBottom>
        {t("welcome")}
      </Typography>
      <Button variant="contained" color="primary">
        {t("get_started")}
      </Button>
    </Container>
  );
}

export default App;

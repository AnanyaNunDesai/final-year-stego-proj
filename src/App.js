import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import "./App.css";
import WelcomePage from "./pages/welcome/WelcomePage";
import LsbPage from "./pages/lsb/LsbPage";
import PvdPage from "./pages/pvd/PvdPage";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline></CssBaseline>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/lsb" element={<LsbPage />} />
          <Route path="/pvd" element={<PvdPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

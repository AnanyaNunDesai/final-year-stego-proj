import { Link } from "react-router-dom";
import EnhancedEncryption from "@mui/icons-material/EnhancedEncryption";
import ArrowBack from "@mui/icons-material/ArrowBack";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import "./TitleBar.css";

// TODO: Change title text here
function TitleBar({ canGoBack }) {
  return (
    <AppBar
      sx={{
        position: "static",
      }}
    >
      <Toolbar>
        {setAppBarIcon(canGoBack)}
        <Typography>Group 12</Typography>
      </Toolbar>
    </AppBar>
  );
}

function setAppBarIcon(canGoBack) {
  if (canGoBack) {
    return (
      <Link to="/" className="back-btn">
        <ArrowBack
          style={{ display: { xs: "none", md: "flex" }, mr: 1, fontSize: 36 }}
        />
      </Link>
    );
  } else {
    return (
      <EnhancedEncryption sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
    );
  }
}

export default TitleBar;

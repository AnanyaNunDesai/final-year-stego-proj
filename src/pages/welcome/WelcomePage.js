import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import TitleBar from "../../components/TitleBar";

import "./WelcomePage.css";

function WelcomePage() {
  return (
    <div>
      <CssBaseline />
      <TitleBar />
      <div className="appbar-content">
        <Typography variant="h2">IMAGE STEGANOGRAPHY SUITE</Typography>
        <div className="content-subtitle">
          <Typography variant="h5">
            To get started, please select an algorithm below.
          </Typography>
        </div>
        <div className="algo-block">
          <Grid
            container
            spacing={40}
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid item>
              <div>
                <Link to="/lsb" className="algo-item">
                  <Box
                    sx={{
                      borderRadius: "10%",
                      borderColor: "white",
                      border: 2,
                    }}
                  >
                    <div>
                      <img
                        className="algo-img"
                        src="https://cdn-icons-png.flaticon.com/512/647/647857.png"
                        alt="Least Significant Bit steganography"
                      />
                    </div>
                    <Typography variant="subtitle">
                      LSB Steganography
                    </Typography>
                  </Box>
                </Link>
              </div>
            </Grid>
            <Grid item>
              <div>
                <Link to="/pvd" className="algo-item">
                  <Box
                    sx={{
                      borderRadius: "10%",
                      border: 1,
                    }}
                  >
                    <div>
                      <img
                        className="algo-img"
                        src="https://upload.wikimedia.org/wikipedia/commons/c/c7/The_three_primary_colors_of_RGB_Color_Model_%28Red%2C_Green%2C_Blue%29.png"
                        alt="Pixel-Value Differencing steganography"
                      />
                    </div>
                    <Typography variant="subtitle">
                      PVD Steganography
                    </Typography>
                  </Box>
                </Link>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;

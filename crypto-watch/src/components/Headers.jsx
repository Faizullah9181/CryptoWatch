import React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import { MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CryptoState } from "../store/crypto-context";

const dark = createTheme({
  palette: {
    mode: "dark",
  },
});

const Headers = () => {
  const history = useNavigate();
  const {currency, setCurrency} = CryptoState();

  console.log(currency)
  return (
    <ThemeProvider theme={dark}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              variant="h6"
              style={{
                fontWeight: "bold",
                fontSize: 24,
                flex: 1,
                color: "#8ab200",
                cursor: "pointer",
              }}
              onClick={() => history("/")}
            >
              Crypto Watch
            </Typography>

            <Select
              variant="outlined"
              style={{
                marginLeft: 15,
                height: 40,
                width: 100,
                borderColor: "white",
                marginRight: 15,
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"EUR"}>EUR</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
              <MenuItem value={"GBP"}>GBP</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Headers;

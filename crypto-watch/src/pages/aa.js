import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../store/crypto-context";
import { SingleCoin } from "../config/api";
import CoinsInfo from "../components/coinsInfo";
import { createTheme } from "@mui/material/styles";
import axios from "axios";
import { Typography } from "@mui/material";

const numberWithCommas = (x) => {
  if (x === undefined || x === null) return x;
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});


const CoinPage = () => {
  const { id } = useParams();
  const { currency, symbol } = CryptoState();
  const [coin, setCoin] = useState();

  const fetchSingleCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  console.log("ss", coin);

  useEffect(() => {
    fetchSingleCoin();
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            alignItems: "center",
          },
        }}
      >
        <div
          style={{
            width: "30%",
            [theme.breakpoints.down("md")]: {
              width: "30%",
              backgroundColor: "red",
            },

            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 25,
            borderRight: "2px solid grey",
          }}
        >
          <img
            src={coin?.image.large}
            alt={coin?.name}
            height="200"
            style={{ marginBottom: 20 }}
          />

          <Typography
            variant="h3"
            style={{
              fontWeight: "bold",
              marginBottom: 20,
              fontFamily: "Montserrat",
            }}
          >
            {coin?.name}
          </Typography>
          <Typography
            variant="subtitle1"
            style={{
              width: "100%",
              fontFamily: "Montserrat",
              padding: 25,
              paddingBottom: 15,
              paddingTop: 0,
              textAlign: "justify",
            }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: coin?.description.en.split(".").slice(0, 6)+".",
              }}
            />
          </Typography>
          <div
            style={{
              alignSelf: "start",
              padding: 25,
              paddingTop: 10,
              width: "100%",
              [theme.breakpoints.down("md")]: {
                display: "flex",
                justifyContent: "space-around",
              },
              [theme.breakpoints.down("sm")]: {
                flexDirection: "column",
                alignItems: "center",
              },
              [theme.breakpoints.down("xs")]: {
                alignItems: "start",
              },
            }}
          >
            <span style={{ display: "flex" }}>
              <Typography
                variant="h5"
                style={{
                  fontWeight: "bold",
                  marginBottom: 20,
                  fontFamily: "Montserrat",
                }}
              >
                Rank:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {numberWithCommas(coin?.market_cap_rank)}
              </Typography>
            </span>

            <span style={{ display: "flex" }}>
              <Typography
                variant="h5"
                style={{
                  fontWeight: "bold",
                  marginBottom: 20,
                  fontFamily: "Montserrat",
                }}
              >
                Current Price:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {symbol}
                {numberWithCommas(
                  coin?.market_data.current_price[currency.toLowerCase()]
                )}
              </Typography>
            </span>
            <span style={{ display: "flex" }}>
              <Typography
                variant="h5"
                style={{
                  fontWeight: "bold",
                  marginBottom: 20,
                  fontFamily: "Montserrat",
                }}
              >
                Market Cap:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {symbol}
                {numberWithCommas(
                  coin?.market_data.market_cap[currency.toLowerCase()]
                )}
              </Typography>
            </span>
          </div>
        </div>
        <CoinsInfo />
      </div>
    </>
  );
};

export default CoinPage;

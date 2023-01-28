import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../store/crypto-context";
import { SingleCoin } from "../config/api";
import CoinsInfo from "../components/coinsInfo";
import axios from "axios";
import { Box, Typography } from "@mui/material";

const numberWithCommas = (x) => {
  if (x === undefined || x === null) return x;
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const CoinPage = () => {
  const { id } = useParams();
  const { currency, symbol } = CryptoState();
  const [coin, setCoin] = useState();

  const fetchSingleCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

 

  useEffect(() => {
    fetchSingleCoin();
  }, []);

  
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { md: "row", xs: "column" },
        }}
      >
        <Box
          sx={{
            width: { md: "30%" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 10,
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
            sx={{
              fontWeight: "bold",
              marginBottom: 5,
              fontFamily: "Montserrat",
              backgroundColor: "red",
            }}
          >
            {coin?.name}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              width: "100%",
              fontFamily: "Montserrat",
              padding: 2,
              paddingBottom: 2,
              textAlign: "justify",
            }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: coin?.description.en.split(".").slice(0, 6) + ".",
              }}
            />
          </Typography>
          <div
            sx={{
              alignSelf: "start",
              padding: 25,
              paddingTop: 10,
              width: "100%",
              display: { md: "flex" },
              justifyContent: { md: "space-around" },
              flexDirection: { sm: "column" },
              alignItems: { sm: "center", xs: "start" },
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
        </Box>
        <CoinsInfo coin={coin}/>
      </Box>
    </>
  );
};

export default CoinPage;

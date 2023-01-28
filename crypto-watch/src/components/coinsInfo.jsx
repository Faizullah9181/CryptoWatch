import React, { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import { CryptoState } from "../store/crypto-context";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import SelectButton from "./SelectButton";
import { chartDays } from "./Days";
import { Line } from "react-chartjs-2";

const CoinsInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [flag, setflag] = useState(false);
  const fetchHistoricData = async () => {
    if (coin) {
      const coinObject = await { ...coin };
      // console.log(coinObject);
      // console.log(HistoricalChart(coinObject.id, days, currency));

      try {
        const { data } = await axios.get(
          HistoricalChart(coinObject.id, days, currency)
        );
        if (data) {
          setHistoricData(data.prices);
          setflag(true);
          console.log(data.prices);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (coin && coin.id) {
      fetchHistoricData();
    }
  }, [days, coin]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        style={{
          // width: "75%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 25,
          padding: 4,
          // width: {  md: "40%" },
          marginTop: { md: 0 },
          padding: { md: 20 },
          paddingTop: { md: 0 },
          height: { md: "20%" },
          width: "70%",

        }}
      >
        {!historicData | (flag === false) ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  if (days === 1) {
                    return `${date.getHours()}:${date.getMinutes()}`;
                  } else {
                    return date.toLocaleDateString();
                  }
                }),
                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
            />

            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "75%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {
                    setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default CoinsInfo;

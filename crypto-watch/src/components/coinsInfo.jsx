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
    const coinObject = await { ...coin };
    const data = await axios.get(HistoricalChart(coinObject.id, days, currency));
    if (data) {
      setflag(true);
      setHistoricData(data.prices);
    }

    console.log(data.prices);
  };

  useEffect(() => {
    fetchHistoricData();
  }, [days]);

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
        xs={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 25,
          padding: 40,
          width: { lg: 1200, md: "100%" },
          marginTop: { md: 0 },
          padding: { md: 20 },
          paddingTop: { md: 0 },
          backgroundColor: "red",
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
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
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

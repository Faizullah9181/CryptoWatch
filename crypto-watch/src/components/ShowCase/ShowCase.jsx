import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import image from "../../assets/image.jpg";
import Carousel from "./Carousel";

const ShowCase = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        flexDirection: "column",
      }}
    >
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          height: 400,
          paddingTop: 25,
        }}
      >
        <div
          style={{
            display: "flex",
            height: "30%",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
            Crypto Watch
          </Typography>

          <Typography
            variant="h6"
            style={{
              color: "white",
              fontWeight: "bold",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </div>

        <Carousel
          style={{ height: "50%", display: "flex", alignItems: "center" }}
        />
      </Container>
    </div>
  );
};

export default ShowCase;

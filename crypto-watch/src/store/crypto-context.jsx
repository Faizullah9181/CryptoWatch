import React from "react";
import { createContext, useContext, useState, useEffect } from "react";

const Crypto = createContext();

const CryptoContext = (props) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("₹");
  
  useEffect(() => {
    if (currency === "USD") {
      setSymbol("$");
    }
    if (currency === "INR") {
      setSymbol("₹");
    }
    if (currency === "EUR") {
      setSymbol("€");
    }
    if (currency === "GBP") {
      setSymbol("£");
    }
  }, []);

  return (
    <Crypto.Provider value={{ currency,symbol, setCurrency }}>
      {props.children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};

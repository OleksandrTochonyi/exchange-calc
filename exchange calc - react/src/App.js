import React, { useEffect, useState } from "react";
import "./App.css";
import bonusImage from "./assets/images/unicorn.jpg";
import { RATES_API } from "./constants";

import axios from "axios";
import Header from "./components/Header/Header";
import Calculator from "./components/Calculator/Calculator";

function App() {
  let [rates, setRates] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(RATES_API);
        const responseWithoutBTC = response.filter(
          (rate) => rate.ccy !== "BTC"
        );
        setRates(responseWithoutBTC);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="wrapper">
      <Header rates={rates} />
      <Calculator rates={rates} />
      <img className="unicorn" src={bonusImage} alt="unicorn" />
    </div>
  );
}

export default App;

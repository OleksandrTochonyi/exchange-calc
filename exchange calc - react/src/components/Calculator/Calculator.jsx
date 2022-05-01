import React, { useEffect, useRef, useState } from "react";
import "./calculator.css";

import USD from "../../assets/images/flag-USA.png";
import EUR from "../../assets/images/flag-EUR.png";
import UAH from "../../assets/images/flag-UA.png";

import { cutTheNumber } from "../../helpers/cutTheNumber";
import ExchangeInput from "../ExchangeInput/ExchangeInput";

const FLAG_ICONS = {
  USD,
  EUR,
  UAH,
};

const Calculator = ({ rates }) => {
  const inputEl = useRef(null);
  const inputEl2 = useRef(null);

  let [rate, setRate] = useState(null);
  let [firstInput, setFirstInput] = useState("");
  let [secondInput, setSecondInput] = useState("");
  let [firstSelect, setFirtsSelect] = useState("USD");
  let [secondSelect, setSecondSelect] = useState("UAH");

  useEffect(() => {
    if (!!rates) {
      function init() {
        let USD;
        let EUR;
        rates.forEach((element) => {
          if (element.ccy === "USD") {
            USD = element.buy;
          } else if (element.ccy === "EUR") {
            EUR = element.buy;
          }
        });
        setRate({
          USD,
          EUR,
          UAH: 1,
        });
      }
      init();
    }
  }, [rates]);

  function calculateFirstInput(amount, ccy) {
    if (ccy === secondSelect) {
      setSecondInput(amount);
      return;
    }
    setSecondInput(cutTheNumber((rate[ccy] / rate[secondSelect]) * amount));
  }

  function calculateSecondInput(amount, ccy) {
    if (ccy === firstSelect) {
      setFirstInput(amount);
      return;
    }
    setFirstInput(cutTheNumber((rate[ccy] / rate[firstSelect]) * amount));
  }

  function calculateSecondSelect(amount, ccy) {
    if (ccy === firstSelect) {
      setSecondInput(amount);
      return;
    }
    setSecondInput(cutTheNumber((rate[firstSelect] / rate[ccy]) * amount));
  }

  return (
    <div className="calculator">
      <h4 className="calculator__title">
        Введите сумму и выберите валюту для конвертации
      </h4>
      <ExchangeInput
        src={FLAG_ICONS[firstSelect]}
        ref={inputEl}
        name={"firstAmount"}
        inputValue={firstInput}
        selectValue={firstSelect}
        onChangeInput={(e) => {
          setFirstInput(e.target.value);
          calculateFirstInput(e.target.value, firstSelect);
        }}
        onChangeSelect={(e) => {
          setFirtsSelect(e.target.value);
          calculateFirstInput(inputEl.current.value, e.target.value);
        }}
      />
      <ExchangeInput
        src={FLAG_ICONS[secondSelect]}
        ref={inputEl2}
        name={"secondAmount"}
        inputValue={secondInput}
        selectValue={secondSelect}
        onChangeInput={(e) => {
          setSecondInput(e.target.value);
          calculateSecondInput(e.target.value, secondSelect);
        }}
        onChangeSelect={(e) => {
          setSecondSelect(e.target.value);
          calculateSecondSelect(inputEl.current.value, e.target.value);
        }}
      />
      <p>*Ввиду отсутствия кросс курсов, просчет производится по "Покупке"</p>
    </div>
  );
};

export default Calculator;

import React from "react";
import "./header.css";
import { v4 as uuidv4 } from "uuid";
import { cutTheNumber } from "../../helpers/cutTheNumber";
import { dateGenerator } from "../../helpers/dateGenerator";

const Header = ({ rates }) => {
  let currentDate = dateGenerator();
  return (
    <header className="header">
      <h2>Курс валют по состоянию на {currentDate}</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Валюта</th>
            <th scope="col">Покупка</th>
            <th scope="col">Продажа</th>
          </tr>
        </thead>
        <tbody>
          {rates.map((currency) => {
            return (
              <tr key={uuidv4()}>
                <th scope="row">{currency.ccy}</th>
                <td>{cutTheNumber(currency.buy)}</td>
                <td>{cutTheNumber(currency.sale)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </header>
  );
};

export default Header;

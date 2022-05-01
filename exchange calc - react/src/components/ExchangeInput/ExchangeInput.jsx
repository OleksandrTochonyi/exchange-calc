import React from "react";
import "./exchangeInput.css";

const ExchangeInput = React.forwardRef(
  (
    { inputValue, selectValue, onChangeInput, onChangeSelect, name, src },
    ref
  ) => {
    return (
      <div className="input-group mb-3">
        <input
          ref={ref}
          name={name}
          value={inputValue}
          type="text"
          className="form-control"
          onChange={onChangeInput}
        />
        <img className="country-flag" src={src} alt={name} />
        <select
          name={name}
          value={selectValue}
          className="form-select"
          aria-label="Сurrency"
          onChange={onChangeSelect}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="UAH">UAH</option>
        </select>
      </div>
    );
  }
);

export default ExchangeInput;

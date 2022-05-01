import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../services/Currency.service';
import { flagObj } from '../shared/const';
import { cutTheNumber } from '../helpers/cutTheNumbers';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent implements OnInit {
  public currencies: any = [];

  firstInputValue: any = '';
  secondInputValue: any = '';
  firstSelectValue: string = 'USD';
  secondSelectValue: string = 'UAH';
  exchangeRate: number | string = '';
  flagObj: any;

  constructor(private currencyService: CurrencyService) {
    this.flagObj = flagObj;
  }

  ngOnInit(): void {
    this.currencyService.getRates().subscribe({
      next: (res) => {
        this.currencies = filterCurrency(res);
        this.exchangeRate = this.countExchangeRate();
      },
      error: (e) => console.error(e),
    });
  }

  countExchangeRate() {
    let firstRate = this.currencies.find(
      (currency: { ccy: string }) => currency.ccy === this.firstSelectValue
    ).buy;
    let secondRate = this.currencies.find(
      (currency: { ccy: string }) => currency.ccy === this.secondSelectValue
    ).buy;
    return firstRate / secondRate;
  }

  // функция проверки не одинаковые ли селекты
  changeSelect(index: number) {
    switch (index) {
      case 1:
        // Проверяет первый селект на повторяющуюся валюту => если повторяется, меняем второй селект.
        if (this.firstSelectValue === this.secondSelectValue) {
          this.secondSelectValue = this.getRandomCurrencyExceptThis(
            this.firstSelectValue
          );
        }
        break;
      case 2:
        // Проверяет второй селект на повторяющуюся валюту => если повторяется, меняем первый селект.
        if (this.firstSelectValue === this.secondSelectValue) {
          this.firstSelectValue = this.getRandomCurrencyExceptThis(
            this.secondSelectValue
          );
        }
        break;
    }

    this.secondInputValue = this.calculateFirstInput(
      this.firstInputValue,
      'first'
    );
    this.exchangeRate = this.countExchangeRate();
  }

  // генератор рандомной валюты для селекта (при повторяющихся)
  getRandomCurrencyExceptThis(name: string) {
    let tmp = this.currencies.filter(
      (currency: { ccy: string }) => currency.ccy !== name
    );
    return tmp[Math.floor(Math.random() * (tmp.length - 1))].ccy;
  }

  firstInputCount(event: any) {
    this.secondInputValue = this.calculateFirstInput(
      event.target.value,
      'first'
    );
  }

  secondInputCount(event: any) {
    this.firstInputValue = this.calculateFirstInput(
      event.target.value,
      'second'
    );
  }

  calculateFirstInput(amount: string | number, inputToChange: string) {
    let firstRate = this.currencies.find(
      (currency: { ccy: string }) => currency.ccy === this.firstSelectValue
    ).buy;
    let secondRate = this.currencies.find(
      (currency: { ccy: string }) => currency.ccy === this.secondSelectValue
    ).buy;
    if (inputToChange === 'first') {
      return cutTheNumber((firstRate / secondRate) * +amount);
    }
    return cutTheNumber((secondRate / firstRate) * +amount);
  }
}

// фильтр прилетающего обьекта, убираем биткоины
function filterCurrency(array: any) {
  return array.map((currency: { ccy: string; buy: number; sale: number }) => {
    if (currency.ccy === 'BTC') {
      currency.ccy = 'UAH';
      currency.sale = 1;
      currency.buy = 1;
      return currency;
    }
    return currency;
  });
}

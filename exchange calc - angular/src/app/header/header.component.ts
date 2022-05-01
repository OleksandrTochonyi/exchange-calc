import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../services/Currency.service';
import { dateGenerator } from '../helpers/dateGenerator';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public currencies: any = [];
  currentDay = dateGenerator();

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getRates().subscribe({
      next: (res) => {
        this.currencies = filterCurrency(res);
      },
      error: (e) => console.error(e),
    });
  }
}

function filterCurrency(array: any) {
  return array.filter((currency: { ccy: string }) => currency.ccy !== 'BTC');
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Currency, CurrencyCode} from '../model/currencyInfo';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  private currencies: Array<Currency> = [];

  constructor(private http: HttpClient) {
    this.loadCurrencies();
    this.currencies.push({name: 'Рубль', code: 'RUR', value: 1});
  }

  public getCurrencyByCode(code: CurrencyCode): Currency {
    console.log(this.currencies);
    if (this.currencies.length === 0) {
      this.loadCurrencies();
    }
    return this.currencies.find((currency: Currency) => currency.code === code);
  }

  private loadCurrencies(): void {
    this.http.get(environment.cbrApi).subscribe((res: any) => {
      const valutes = res.Valute;
      this.currencies.push({name: valutes.USD.Name, code: valutes.USD.CharCode, value: valutes.USD.Value});
      this.currencies.push({name: valutes.EUR.Name, code: valutes.EUR.CharCode, value: valutes.EUR.Value});
    });
  }
}



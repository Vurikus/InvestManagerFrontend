import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Currency} from '../model/currencyInfo';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  constructor(private http: HttpClient) {
    this.loadCurrencies();
    this.currencies.push(ExchangeService.defaultCurrency());
  }
  private currencies: Array<Currency> = [];

  public static defaultCurrency(): Currency{
    return {name: 'Рубль', code: 'RUR', rate: 1, shortDisplayName: 'руб.'};
  }

  public getCurrencyByCode(code: string): Currency {
    console.log(this.currencies);
    if (this.currencies.length === 0) {
      this.loadCurrencies();
    }
    return this.currencies.find((currency: Currency) => currency.code === code);
  }

  public allowedCurrencies(): Array<Currency>{
    return this.currencies;
  }

  private loadCurrencies(): void {
    this.http.get(environment.cbrApi).subscribe((res: any) => {
      const valutes = res.Valute;
      this.currencies.push({name: valutes.USD.Name, code: valutes.USD.CharCode, rate: valutes.USD.Value, shortDisplayName: 'дол.'});
      this.currencies.push({name: valutes.EUR.Name, code: valutes.EUR.CharCode, rate: valutes.EUR.Value, shortDisplayName: 'евро'});
    });
  }
}



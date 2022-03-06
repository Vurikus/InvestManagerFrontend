import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Abbreviation, Currency} from '../model/currencyInfo';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  constructor(private http: HttpClient) {
    this.loadCurrencies();
    this.loadAbbreviation();
    this.currencies.push(ExchangeService.defaultCurrency());
  }
  private currencies: Array<Currency> = [];
  private abbreviations: Array<Abbreviation> = [];

  public static defaultCurrency(): Currency{
    return {name: 'Рубль', code: 'RUR', rate: 1, shortDisplayName: 'руб.'};
  }

  public static defaultAbbreviation(): Abbreviation{
    return {shortDisplayName: '', code: 'ONE', value: 1};
  }

  public getCurrencyByCode(code: string): Currency {
    console.log(this.currencies);
    if (this.currencies.length === 0) {
      this.loadCurrencies();
    }
    return this.currencies.find((currency: Currency) => currency.code === code);
  }

  public getAbbreviationByCode(code: string): Abbreviation {
    const abbreviation = this.abbreviations.find((abr: Abbreviation) => abr.code === code);
    if (abbreviation) {
      return abbreviation;
    } else {
      throw new Error(`Abbreviation by '${code}' not found`);
    }
  }

  public allowedCurrencies(): ReadonlyArray<Currency>{
    return this.currencies;
  }

  public getAbbreviations(): ReadonlyArray<Abbreviation> {
    return this.abbreviations;
  }

  private loadCurrencies(): void {
    this.http.get(environment.cbrApi).subscribe((res: any) => {
      const valutes = res.Valute;
      this.currencies.push({name: valutes.USD.Name, code: valutes.USD.CharCode, rate: valutes.USD.Value, shortDisplayName: 'дол.'});
      this.currencies.push({name: valutes.EUR.Name, code: valutes.EUR.CharCode, rate: valutes.EUR.Value, shortDisplayName: 'евро'});
    });
  }

  private loadAbbreviation(): void {
    this.abbreviations.push({shortDisplayName: 'млрд.', code: 'BLN', value: 1_000_000_000});
    this.abbreviations.push({shortDisplayName: 'млн.', code: 'MLN', value: 1_000_000});
    this.abbreviations.push({shortDisplayName: 'т.', code: 'TSD', value: 1_000});
    this.abbreviations.push({shortDisplayName: '', code: 'ONE', value: 1});
  }
}



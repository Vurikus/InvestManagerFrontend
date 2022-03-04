import {Injectable} from '@angular/core';
import {CurrencyInfo} from '../model/currencyInfo';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor() { }

  /**
   * return number of abbreviation * currency rate between old and new currency
   */
  public static currencyFactor(newCurrency: CurrencyInfo, oldCurrency: CurrencyInfo): number {
    return (oldCurrency.currency.rate / newCurrency.currency.rate) *
      (oldCurrency.abbreviation.value / newCurrency.abbreviation.value);
  }

  public static clone(currency: CurrencyInfo): CurrencyInfo{
    return {currency: {rate: currency.currency.rate, code: currency.currency.code, shortDisplayName: currency.currency.shortDisplayName, name: currency.currency.name},
      abbreviation: {value: currency.abbreviation.value, code: currency.abbreviation.code, shortDisplayName: currency.abbreviation.shortDisplayName}};
  }
}

import { Injectable } from '@angular/core';
import {EnumUtil} from '../util/EnumUtil';
import {ExchangeService} from './exchange.service';
import {Abbreviation, CurrencyInfo} from '../model/currencyInfo';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private exchangeService: ExchangeService) { }

  /**
   * return number of abbreviation * currency rate between old and new currency
   */
  public static currencyFactor(newCurrency: CurrencyInfo, oldCurrency: CurrencyInfo): number {
    return (oldCurrency.currency.rate / newCurrency.currency.rate) *
      (this.getAbbreviationFactor(oldCurrency.abbreviation) / this.getAbbreviationFactor(newCurrency.abbreviation));
  }

  private static getAbbreviationFactor(abr: Abbreviation): number{
    let factor;
    switch (abr) {
      case Abbreviation.BLN: factor = 1_000_000_000; break;
      case Abbreviation.MLN: factor = 1_000_000; break;
      case Abbreviation.TS: factor = 1_000; break;
      case Abbreviation.ONE: factor = 1; break;
      default: throw new Error('Unknown abbreviation - ' + EnumUtil.getNameByValue(abr, Abbreviation));
    }
    return factor;
  }

  public static clone(currency: CurrencyInfo): CurrencyInfo{
    return {currency: {rate: currency.currency.rate, code: currency.currency.code, shortDisplayName: currency.currency.shortDisplayName, name: currency.currency.name},
      abbreviation: currency.abbreviation};
  }
}

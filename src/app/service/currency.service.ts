import { Injectable } from '@angular/core';
import {EnumUtil} from '../util/EnumUtil';
import {ExchangeService} from './exchange.service';
import {Abbreviation, CurrencyCode, CurrencyInfo} from '../model/currencyInfo';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private exchangeService: ExchangeService) { }

  public currencyFactor(value: CurrencyInfo): number {
    let factor;
    switch (value.abbreviation) {
      case Abbreviation.BLN: factor = 1_000_000_000; break;
      case Abbreviation.MLN: factor = 1_000_000; break;
      case Abbreviation.TS: factor = 1_000; break;
      case Abbreviation.ONE: factor = 1; break;
      default: throw new Error('Unknown abbreviation - ' + EnumUtil.getNameByValue(value.abbreviation, Abbreviation));
    }
    console.log('factor before: ' + value.currency);
    factor = factor * this.exchangeService.getCurrencyByCode(EnumUtil.getNameByValue(value.currency, CurrencyCode) as CurrencyCode).value;
    console.log('factor after: ' + factor);
    return factor;
  }
}

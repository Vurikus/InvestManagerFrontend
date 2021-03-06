import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'negative'
})
export class NegativeReportCurrencyPipe implements PipeTransform {

  transform(value: number, needBracket: boolean = true): string {
    if (value < 0 && needBracket) {
      return `(${Math.round(value * (-100)) / 100})`;
    } else {
      return `${Math.round(value * 100) / 100}`;
    }
  }

}

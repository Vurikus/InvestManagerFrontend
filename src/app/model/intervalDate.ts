export interface IntervalDateDTO {
  start: Date;
  end: Date;
  // startText: string;
  // endText: string;
}

export class IntervalDate {
  private _start: Date;
  private _end: Date;
  private _startText: string;
  private _endText: string;

  private constructor(start: Date, end: Date) {
    this._start = start;
    this._end = end;
    this._startText = start.toISOString().slice(0, 10);
    this._endText = end.toISOString().slice(0, 10);
  }

  static newInstance(interval?: IntervalDateDTO): IntervalDate {
    if (interval) {
      return  new IntervalDate(interval.start, interval.end);
    } else {
      const now = new Date();
      const start = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      return new IntervalDate(start, now);
    }
  }

  get start(): Date {
    return this._start;
  }

  set start(value: Date) {
    this._start = value;
    this._startText = value.toISOString().slice(0, 10);
  }

  get end(): Date {
    return this._end;
  }

  set end(value: Date) {
    this._end = value;
    this._endText = value.toISOString().slice(0, 10);
  }

  get startText(): string {
    return this._startText;
  }

  set startText(value: string) {
    this._startText = value;
    this._start = new Date(Date.parse(value));
  }

  get endText(): string {
    return this._endText;
  }

  set endText(value: string) {
    this._endText = value;
    this._end = new Date(Date.parse(value));
  }

  covertToQueryString(): string {
    return this._startText + ',' + this._endText;
  }
}

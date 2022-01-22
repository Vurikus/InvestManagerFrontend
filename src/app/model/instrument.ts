import { InstrumentType } from './instrumentType';

export interface Instrument {
  id: number;
  exchange: string;
  ticker: string;
  type: InstrumentType;
  name: string;
  sector: string;
}

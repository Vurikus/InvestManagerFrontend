import {ReportHeaderName} from './reportHeaderName';

export interface Report {
  id: number;
  date: Date;
  getValueByHeaderName(headerName: string): number | string | Date;
  getHeaders(): ReportHeaderName[];
  setValueByHeaderName(headerName: string, value: any): void;
}

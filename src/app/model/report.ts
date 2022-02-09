import {ReportHeaderName} from "./ReportHeaderName";

export interface Report {
  id: number;
  date: Date;
  getValueByHeaderName(headerName: string): number | string | Date;
  getHeaders(): ReportHeaderName[];
}

export interface IPositionEvent {
  date: Date;
  price: number;
  volume: number;
  commission: number;
  buy: boolean;
}

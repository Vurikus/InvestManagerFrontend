import {Sector} from './sector';

export interface Company{
  id: number;
  country: string;
  organisationName: string;
  ticker: string;
  sector: Sector;
  headquartersCountry: string;
  exchange: string;
}

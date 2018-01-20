import {Deal} from './deal.model';

export interface Response {
  currency: string;
  deals: Deal[];
}

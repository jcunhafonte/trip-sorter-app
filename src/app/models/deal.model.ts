import {DealDuration} from './deal-duration.model';

export interface Deal {
  transport: string;
  departure: string;
  arrival: string;
  duration: DealDuration;
  cost: number;
  discount: number;
  reference: string;
}

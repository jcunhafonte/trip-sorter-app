import {Component, Input} from '@angular/core';
import {Deal} from '../models/deal.model';

@Component({
  selector: 'ts-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  @Input()
  paths: Deal[] = [];

  @Input()
  currency: string;

  getPathName(path: Deal): string {
    return `${path.departure} - ${path.arrival}`;
  }

  getPathCost(path: Deal): string {
    return `${this.getCalculatedCost(path)}${this.currency}`;
  }

  getPathTransport(path: Deal): string {
    return `${path.transport}`;
  }

  getPathDescription(path: Deal): string {
    return `${path.reference} for ${path.duration.h}h${path.duration.m}m`;
  }

  getPathDiscount(path: Deal): string {
    return `${path.cost}${this.currency}`;
  }

  getTotalCost(): string {
    return `${this.paths.reduce((a: number, path: Deal) => a + this.getCalculatedCost(path), 0)}${this.currency}`;
  }

  getTotalTime(): string {
    let hours = 0;
    let minutes = 0;

    this.paths.forEach((path) => {
      hours = hours + parseInt(path.duration.h, 0);
      minutes = minutes + parseInt(path.duration.m, 0);
    });

    if (minutes >= 60) {
      const newMinutes = minutes % 60;
      const addHours = Math.floor(minutes / 60);

      hours = hours + addHours;
      minutes = newMinutes;
    }

    return `${hours < 10 ? '0' + hours : hours}h${minutes < 10 ? '0' + minutes : minutes}m`;
  }

  getTotalDiscount(): string {
    return `-${this.paths.reduce((a: number, path: Deal) => a + path.cost * (path.discount * .01), 0)}${this.currency}`;
  }

  getCalculatedCost(path: Deal): number {
    return path.discount > 0 ? path.cost * (1 - (path.discount * .01)) : path.cost;
  }

  hasDiscount(path: Deal): boolean {
    return path.discount > 0;
  }

  hasTotalDiscount(): boolean {
    return this.paths.reduce((a: number, path: Deal) => a + path.cost * (path.discount * .01), 0) > 0;
  }
}

import {Component, OnInit} from '@angular/core';
import {ResponseService} from '../services/response.service';
import {Deal} from '../models/deal.model';
import {FormValue} from '../components/form.component';
import {ShortestPathFinderService} from '../services/shortest-path-finder.service';

@Component({
  selector: 'ts-main',
  templateUrl: './main.component.html',
  styles: ['.ts-main {margin: 16px}']
})
export class MainComponent implements OnInit {

  deals: Deal[] = [];

  dealReferenceMap: Map<string, Deal>[] = [];

  cities: string[] = [];

  paths: Deal[] = [];

  currency: string;

  constructor(private responseService: ResponseService,
              private shortestPathFinderService: ShortestPathFinderService) {
  }

  ngOnInit() {
    this.getResponse();
  }

  getResponse(): void {
    this.responseService
      .get()
      .subscribe(response => {
        const currency: string = response.currency;
        const deals: Deal[] = response.deals;

        this.setCurrency(currency);
        this.setCities(deals);
        this.setDeals(deals);
        this.setDealReferenceMap(deals);
      });
  }

  getPaths(value: FormValue): void {
    this.paths = this.shortestPathFinderService.search(this.deals, this.dealReferenceMap, value.sorting, value.from, value.to);
  }

  setCurrency(currency: string): void {
    switch (currency) {
      case 'EUR':
        this.currency = '€';
        break;
      default:
        this.currency = '€';
        break;
    }
  }

  setCities(deals: Deal[]): void {
    const cityHashmap: Object = {};
    const cities: string[] = [];

    deals.forEach((deal: Deal, index: number) => {
      if (!cityHashmap[deal.departure]) {
        cityHashmap[deal.departure] = 1;
        cities.push(deal.departure);
      }

      if (!cityHashmap[deal.arrival]) {
        cityHashmap[deal.arrival] = 1;
        cities.push(deal.arrival);
      }
    });

    cities.sort();

    this.cities = cities;
  }

  setDeals(deals: Deal[]): void {
    this.deals = deals;
  }

  setDealReferenceMap(deals: Deal[]): void {
    deals.forEach((deal, index) => this.dealReferenceMap[deals[index].reference] = deals[index]);
  }

  onSubmit(value: FormValue): void {
    this.getPaths(value);
  }

  hasPaths(): boolean {
    return !!this.paths.length;
  }
}

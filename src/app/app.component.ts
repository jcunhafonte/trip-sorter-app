import {Component, OnInit} from '@angular/core';
import {ResponseService} from './services/response.service';
import {Deal} from './models/deal.model';
import {ShortestPathFinderService} from './services/shortest-path-finder.service';

@Component({
  selector: 'ts-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // const x = this.shortestPathFinder.find(deals, this.getDealReferenceMap(deals), 'Fastest', 'Lisbon', 'London');
}

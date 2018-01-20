import {Component} from '@angular/core';

@Component({
  selector: 'ts-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public title = 'TripSorter';
  public description = `built with <3 by <a href='https://jcunhafonte.com/'>jcunhafonte</a>`;
}

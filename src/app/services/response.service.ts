import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Response} from '../models/response.model';

@Injectable()
export class ResponseService {

  constructor(private http: HttpClient) {
  }

  get(): Observable<Response> {
    return this.http.get<Response>('https://jcunhafonte.com/tripsorter/assets/data/response.json');
  }
}

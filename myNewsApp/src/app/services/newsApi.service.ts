import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Rx';
import { SessionService } from './session.service';
import { environment } from '../../environments/environment';


@Injectable()
export class NewsApi {
  BASE_URL: string;

  constructor(
    private http: Http,
    private session: SessionService
  )
  {
    this.BASE_URL = environment.API_URL;

  }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  // Get full list of newspapers
  getArticles(link) {
    return this.http.get(`${link}`)
      .map((res) => res.json())
      .catch(this.handleError);
  }

}

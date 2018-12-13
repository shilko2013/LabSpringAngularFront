import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private _http: HttpClient,
              private _cookieService: CookieService) {
  }

  addPoint(x, y, r) {
    return this._http.get('http://localhost:15880/results/add?x=' + x + '&y=' + y + '&r=' + r + '&sessionID='
      + this._cookieService.get('sessionID'),
      {responseType: 'text'});
  }

  getPoints() {
    return this._http.get('http://localhost:15880/results/get?&sessionID='
      + this._cookieService.get('sessionID'));
  }
}

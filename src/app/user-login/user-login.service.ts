import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService implements OnInit {

  private isLogged = false;

  constructor(private _http: HttpClient,
              private _cookieService: CookieService) {
  }

  disableSession() {
    this._http.get('http://localhost:15880/results/disablesession?sessionID=' + this._cookieService.get('sessionID'),
      {responseType: 'text'});
    this._cookieService.delete('sessionID');
    this.isLogged = false;
  }

  register(username, password) {
    const params = new HttpParams().set('username', username).set('password', password);
    return this._http.post('http://localhost:15880/registration', params, {responseType: 'text'});
  }

  login(username, password) {
    const params = new HttpParams().set('username', username).set('password', password);
    const query = this._http.post('http://localhost:15880/login', params, {responseType: 'text'}).toPromise();
    query.then(() => this.isLogged = true);
    return query;
  }

  isLoggedIn(): boolean {
    return this.isLogged;
  }

  ngOnInit(): void {
    this.isLogged = false;
  }

}

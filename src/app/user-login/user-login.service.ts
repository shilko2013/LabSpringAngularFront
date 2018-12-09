import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  private isLogged = false;

  constructor(private _http: HttpClient) {
  }

  disableSession() {
    this._http.get('http://localhost:8080/results/disablesession', {responseType: 'text'});
    sessionStorage.clear();
    this.isLogged = false;
  }

  register(username, password) {
    const params = new HttpParams().set('username', username).set('password', password);
    return this._http.post('http://localhost:8080/registration', params, {responseType: 'text'});
  }

  login(username, password) {
    const params = new HttpParams().set('username', username).set('password', password);
    const query = this._http.post('http://localhost:8080/login', params, {responseType: 'text'}).toPromise();
    query.then(() => this.isLogged = true);
    return query;
  }

  isLoggedIn() {
    return this.isLogged;
  }

}

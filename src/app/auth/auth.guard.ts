import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {UserLoginService} from '../user-login/user-login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _userLoginService: UserLoginService,
              private _router: Router) {}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (!this._userLoginService.isLoggedIn()) {
      this._router.navigate(['']);
      return false;
    }
    return true;
  }
}

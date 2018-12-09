import { Component, OnInit } from '@angular/core';
import {UserLoginService} from '../user-login/user-login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {

  constructor(private _userLoginService: UserLoginService,
              private _router: Router) { }

  ngOnInit() {
  }

  disableSession() {
    this._router.navigate(['']);
  }
}

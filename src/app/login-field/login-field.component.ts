import {Component, Injectable, OnInit} from '@angular/core';
import {UserLoginService} from '../user-login/user-login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-field',
  templateUrl: './login-field.component.html',
  styleUrls: ['./login-field.component.css']
})
@Injectable({providedIn: 'root'})
export class LoginFieldComponent implements OnInit {

  public login = 'Логин: ';

  public password = 'Пароль: ';

  public submitButton = 'Отправить';

  public header = 'Авторизация';

  public switchButton = 'Еще не зарегестрированы?';

  private isLoginForm = true;

  public formAction = 'login';

  public usernameField = '';

  public passwordField = '';

  public queryInfo = '';

  constructor(private _userLoginService: UserLoginService,
              private _router: Router) {
  }

  ngOnInit() {
  }

  switchRole() {
    this.queryInfo = '';
    if (this.isLoginForm) {
      this.header = 'Регистрация';
      this.switchButton = 'Уже зарегестрированы?';
    } else {
      this.header = 'Авторизация';
      this.switchButton = 'Еще не зарегестрированы?';
    }
    this.isLoginForm = !this.isLoginForm;
  }

  submit() {
    this.queryInfo = '';
    if (this.isLoginForm) {
      this._userLoginService.login(this.usernameField, this.passwordField)
        .then(() => {
            this._router.navigate(['check']);
          },
          () => {
            this.queryInfo = 'Username or password is incorrect';
          })
        .catch(
          () => {
            this.queryInfo = 'Username or password is incorrect';
          }
        );
    } else {
      this._userLoginService.register(this.usernameField, this.passwordField)
        .subscribe(() => {
            this.queryInfo = 'Registration successfully';
          },
          error => {
            this.queryInfo = error.error;
          });
    }
  }

}

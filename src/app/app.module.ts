import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFieldComponent } from './login-field/login-field.component';
import {UserLoginService} from './user-login/user-login.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginFieldComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [UserLoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }

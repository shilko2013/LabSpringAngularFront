import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFieldComponent } from './login-field/login-field.component';
import { UserLoginService } from './user-login/user-login.service';
import { FormsModule } from '@angular/forms';
import { CheckComponent } from './check/check.component';
import { SpinnerModule } from 'primeng/spinner';
import { DataTableModule } from 'primeng/datatable';
import { ButtonModule } from 'primeng/button';
import {CookieService} from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    LoginFieldComponent,
    CheckComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SpinnerModule,
    DataTableModule,
    ButtonModule
  ],
  providers: [
    UserLoginService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

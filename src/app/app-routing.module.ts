import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginFieldComponent} from './login-field/login-field.component';
import {CheckComponent} from './check/check.component';
import {AuthGuard} from './auth/auth.guard';
import {SessionGuard} from './session/session.guard';

const routes: Routes = [
  {path: '', component: LoginFieldComponent, pathMatch: 'full', canActivate: [SessionGuard]},
  {path: 'check', component: CheckComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, SessionGuard]
})
export class AppRoutingModule {
}

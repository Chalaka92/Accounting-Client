import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { SharedModule } from '../shared/shared.module';
import { ForgotPasswordComponent } from './components/authentication/forgot-password/forgot-password.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';

@NgModule({
  declarations: [
    PublicComponent,
    ForgotPasswordComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [CommonModule, PublicRoutingModule, SharedModule],
  exports: [],
  providers: [],
})
export class PublicModule {}

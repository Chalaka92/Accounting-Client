import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from './services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { TemplateSharedModule } from '@template/template-shared.module';
import { AuthService } from './auth/auth.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [LoginService, AuthGuard, AuthService, UserService],
  exports: [TemplateSharedModule],
})
export class CoreModule {}

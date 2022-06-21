import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendingInterceptorModule } from '@template/shared/loading-indicator/pending-interceptor.module';
import { TemplateSharedModule } from '@template/template-shared.module';
import { NgChartsModule } from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SidenavService } from './modules/layout/sidenav/sidenav.service';
import { MaterialModule } from '@template/shared/material-components.module';
import { LoginService } from '../core/services/login.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    // Displays Loading Bar when a Route Request or HTTP Request is pending
    PendingInterceptorModule,
  ],
  exports: [
    MaterialModule,
    TemplateSharedModule,
    NgChartsModule,
    ReactiveFormsModule,
  ],
  providers: [LoginService],
})
export class SharedModule {}

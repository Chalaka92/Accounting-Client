import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendingInterceptorModule } from '@template/shared/loading-indicator/pending-interceptor.module';
import { NgChartsModule } from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../core/services/login.service';
import { CoreModule } from '../core/core.module';
import { LayoutModule } from './modules/layout/layout.module';
import { ErrorComponent } from './components/error/error.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [ErrorComponent, ConfirmDialogComponent],
  imports: [
    CommonModule,
    // Displays Loading Bar when a Route Request or HTTP Request is pending
    PendingInterceptorModule,
    CoreModule,
  ],
  exports: [NgChartsModule, ReactiveFormsModule, LayoutModule, CoreModule],
  providers: [LoginService],
})
export class SharedModule {}

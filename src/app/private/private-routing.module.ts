import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { LayoutComponent } from '../shared/modules/layout/layout.component';
import { CompanyComponent } from './components/accountings-settings/company/company.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PrivateComponent } from './private.component';
import { PrivateModule } from './private.module';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'accountingsettings/company',
        component: CompanyComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { RoleGuard } from '../core/guards/role.guard';
import { ErrorComponent } from '../shared/components/error/error.component';
import { LayoutComponent } from '../shared/modules/layout/layout.component';
import { CompanyComponent } from './components/accountings-settings/company/company.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'accountingsettings/company',
        component: CompanyComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
          expectedRoles: ['admin'],
        },
      },
      {
        path: 'error',
        component: ErrorComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LayoutModule } from '../shared/modules/layout/layout.module';
import { AdvancedPieChartWidgetComponent } from './components/dashboard/widgets/advanced-pie-chart-widget/advanced-pie-chart-widget.component';
import { AudienceOverviewWidgetComponent } from './components/dashboard/widgets/audience-overview-widget/audience-overview-widget.component';
import { BarChartWidgetComponent } from './components/dashboard/widgets/bar-chart-widget/bar-chart-widget.component';
import { DonutChartWidgetComponent } from './components/dashboard/widgets/donut-chart-widget/donut-chart-widget.component';
import { LineChartWidgetComponent } from './components/dashboard/widgets/line-chart-widget/line-chart-widget.component';
import { QuickInfoWidgetComponent } from './components/dashboard/widgets/quick-info-widget/quick-info-widget.component';
import { RealtimeUsersWidgetComponent } from './components/dashboard/widgets/realtime-users-widget/realtime-users-widget.component';
import { RecentSalesWidgetComponent } from './components/dashboard/widgets/recent-sales-widget/recent-sales-widget.component';
import { SalesSummaryWidgetComponent } from './components/dashboard/widgets/sales-summary-widget/sales-summary-widget.component';
import { RecentSalesWidgetTableComponent } from './components/dashboard/widgets/recent-sales-widget/recent-sales-widget-table/recent-sales-widget-table.component';
import { MarketWidgetComponent } from './components/dashboard/widgets/market-widget/market-widget.component';
import { DashboardService } from './services/dashboard.service';
import { CompanyComponent } from './components/accountings-settings/company/company.component';
import { CompanyService } from './http/company.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../core/interceptors/jwt.interceptor';
import { LoginService } from '../core/services/login.service';
import { CoreModule } from '../core/core.module';
import { ErrorInterceptor } from '../core/interceptors/error.interceptor';

@NgModule({
  declarations: [
    PrivateComponent,
    DashboardComponent,
    AdvancedPieChartWidgetComponent,
    AudienceOverviewWidgetComponent,
    BarChartWidgetComponent,
    DonutChartWidgetComponent,
    LineChartWidgetComponent,
    QuickInfoWidgetComponent,
    RealtimeUsersWidgetComponent,
    RecentSalesWidgetComponent,
    SalesSummaryWidgetComponent,
    RecentSalesWidgetTableComponent,
    MarketWidgetComponent,
    CompanyComponent,
  ],
  imports: [CommonModule, PrivateRoutingModule, SharedModule],
  exports: [],
  providers: [
    DashboardService,
    CompanyService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
})
export class PrivateModule {}

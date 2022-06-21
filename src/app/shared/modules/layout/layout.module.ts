import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterModule } from './footer/footer.module';
import { LayoutComponent } from './layout.component';
import { QuickpanelModule } from './quickpanel/quickpanel.module';
import { SidenavModule } from './sidenav/sidenav.module';
import { ToolbarModule } from './toolbar/toolbar.module';
import { ConfigPanelModule } from './config-panel/config-panel.module';
import { NavigationModule } from './navigation/navigation.module';
import { BackdropModule } from '@template/shared/backdrop/backdrop.module';
import { LoadingIndicatorModule } from '@template/shared/loading-indicator/loading-indicator.module';
import { TemplateSharedModule } from '@template/template-shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@template/shared/material-components.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    LoadingIndicatorModule,
    TemplateSharedModule,

    // Core
    ToolbarModule,
    QuickpanelModule,
    SidenavModule,
    FooterModule,
    BackdropModule,
    ConfigPanelModule,
    NavigationModule,
  ],
  declarations: [LayoutComponent],
})
export class LayoutModule {}

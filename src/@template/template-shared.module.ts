import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BreadcrumbsModule } from './shared/breadcrumbs/breadcrumbs.module';
import { TitleModule } from './shared/title/title.module';
import { PageModule } from './shared/page/page.module';
import { SidebarModule } from './shared/sidebar/sidebar.module';
import { RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PageLayoutModule } from './shared/page-layout/page-layout.module';
import { TemplateCardModule } from './shared/card/card.module';
import { ScrollbarModule } from './shared/scrollbar/scrollbar.module';
import { LoadingOverlayModule } from './shared/loading-overlay/loading-overlay.module';
import { MaterialModule } from './shared/material-components.module';
import { ListModule } from './shared/list/list.module';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: [
    BreadcrumbsModule,
    TitleModule,
    PageModule,
    SidebarModule,
    RouterModule,
    PageLayoutModule,
    TemplateCardModule,
    ScrollbarModule,
    LoadingOverlayModule,
    ListModule,

    // External
    FlexLayoutModule,
    FontAwesomeModule,
    ScrollingModule,
    MaterialModule,
  ],
})
export class TemplateSharedModule {}

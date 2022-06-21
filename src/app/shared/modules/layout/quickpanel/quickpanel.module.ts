import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@template/shared/material-components.module';
import { ScrollbarModule } from '@template/shared/scrollbar/scrollbar.module';
import { QuickpanelComponent } from './quickpanel.component';

@NgModule({
  imports: [CommonModule, ScrollbarModule, MaterialModule],
  declarations: [QuickpanelComponent],
  exports: [QuickpanelComponent],
})
export class QuickpanelModule {}

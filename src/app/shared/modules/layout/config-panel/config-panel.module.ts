import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigPanelComponent } from './config-panel.component';
import { ConfigPanelToggleComponent } from './config-panel-toggle/config-panel-toggle.component';
import { TemplateSharedModule } from '@template/template-shared.module';

@NgModule({
  imports: [CommonModule, TemplateSharedModule],
  declarations: [ConfigPanelComponent, ConfigPanelToggleComponent],
  exports: [ConfigPanelComponent, ConfigPanelToggleComponent],
})
export class ConfigPanelModule {}

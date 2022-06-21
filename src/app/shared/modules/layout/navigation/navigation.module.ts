import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { NavigationItemComponent } from './navigation-item/navigation-item.component';
import { TemplateSharedModule } from '@template/template-shared.module';

@NgModule({
  imports: [CommonModule, TemplateSharedModule],
  declarations: [NavigationComponent, NavigationItemComponent],
  exports: [NavigationComponent],
})
export class NavigationModule {}

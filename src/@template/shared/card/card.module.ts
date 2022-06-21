import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  TemplateCard,
  TemplateCardActions,
  TemplateCardContent,
  TemplateCardHeader,
  TemplateCardHeaderActions,
  TemplateCardHeaderSubTitle,
  TemplateCardHeaderTitle,
} from './card.component';

const cardComponents = [
  TemplateCard,
  TemplateCardHeader,
  TemplateCardHeaderTitle,
  TemplateCardHeaderSubTitle,
  TemplateCardHeaderActions,
  TemplateCardContent,
  TemplateCardActions,
];

@NgModule({
  imports: [CommonModule],
  declarations: [...cardComponents],
  exports: [...cardComponents],
})
export class TemplateCardModule {}

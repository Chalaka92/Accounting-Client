import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  Input,
  ViewEncapsulation,
} from '@angular/core';

// noinspection TsLint
@Component({
  selector: 'template-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  host: { class: 'template-card' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateCard {}

// noinspection TsLint
@Component({
  selector: 'template-card-header',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'template-card-header' },
  template: `
    <div class="template-card-header-heading-group">
      <ng-content select="template-card-header-heading"></ng-content>
      <ng-content select="template-card-header-subheading"></ng-content>
    </div>
    <ng-content></ng-content>
    <ng-content select="template-card-header-actions"></ng-content>
  `,
})
export class TemplateCardHeader {}

// noinspection TsLint
@Component({
  selector: 'template-card-content',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'template-card-content' },
  template: ` <ng-content></ng-content>`,
})
export class TemplateCardContent {}

// noinspection TsLint
@Directive({
  selector: 'template-card-header-heading',
  host: { class: 'template-card-header-heading' },
})
export class TemplateCardHeaderTitle {}

// noinspection TsLint
@Directive({
  selector: 'template-card-header-subheading',
  host: { class: 'template-card-header-subheading' },
})
export class TemplateCardHeaderSubTitle {}

// noinspection TsLint
@Directive({
  selector: 'template-card-header-actions',
  host: { class: 'template-card-header-actions' },
})
export class TemplateCardHeaderActions {}

// noinspection TsLint
@Directive({
  selector: 'template-card-actions',
  host: {
    class: 'template-card-actions',
    '[class.template-card-actions-align-end]': 'align === "end"',
  },
})
export class TemplateCardActions {
  /** Position of the actions inside the card. */
  @Input() align: 'start' | 'end' = 'start';
}

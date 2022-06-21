import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[templatePageLayout],template-page-layout',
  host: {
    class: 'template-page-layout'
  }
})
export class PageLayoutDirective {

  @Input() mode: 'card' | 'simple' = 'simple';

  constructor() { }

  @HostBinding('class.template-page-layout-card')
  get isCard() {
    return this.mode === 'card';
  }

  @HostBinding('class.template-page-layout-simple')
  get isSimple() {
    return this.mode === 'simple';
  }

}

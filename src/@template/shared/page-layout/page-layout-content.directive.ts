import { Directive } from '@angular/core';

@Directive({
  selector: '[templatePageLayoutContent],template-page-layout-content',
  host: {
    class: 'template-page-layout-content'
  }
})
export class PageLayoutContentDirective {

  constructor() { }

}

import { Directive } from '@angular/core';

@Directive({
  selector: '[templatePageLayoutHeader],template-page-layout-header',
  host: {
    class: 'template-page-layout-header'
  }
})
export class PageLayoutHeaderDirective {

  constructor() { }

}


import { Directive } from '@angular/core';

@Directive({
  selector: '[templatePage],template-page',
  host: {
    class: 'template-page'
  }
})
export class PageDirective {

  constructor() { }

}

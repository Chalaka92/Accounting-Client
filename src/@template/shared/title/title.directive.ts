import { Directive } from '@angular/core';

@Directive({
  selector: '[templateTitle],template-title',
  host: {
    class: 'template-title'
  }
})
export class TitleDirective {

  constructor() { }

}

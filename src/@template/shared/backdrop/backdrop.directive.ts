import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[templateBackdrop],template-backdrop',
  host: {
    class: 'template-backdrop',
  },
  exportAs: 'templateBackdrop',
})
export class BackdropDirective {
  @Input()
  @HostBinding('class.visible')
  visible: boolean = false;

  @HostBinding('class.invisible') invisible: boolean = false;
  @Output() closed = new EventEmitter();

  constructor() {}

  show() {
    if (!this.visible) {
      this.visible = true;
      this.invisible = false;
    }
  }

  @HostListener('click')
  hide() {
    if (this.visible) {
      this.visible = false;
      this.invisible = false;
      this.closed.emit();
    }
  }

  showInvisible() {
    if (!this.visible) {
      this.visible = true;
      this.invisible = true;
    }
  }
}

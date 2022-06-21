import {
  AfterViewInit,
  Directive,
  HostBinding,
  Inject,
  Input,
  OnDestroy,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { componentDestroyed } from '../component-destroyed';
import { BackdropDirective } from '../backdrop/backdrop.directive';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[templateSidebar],template-sidebar',
  host: {
    class: 'template-sidebar',
  },
  exportAs: 'templateSidebar',
})
export class SidebarDirective implements AfterViewInit, OnDestroy {
  @Input() position: 'left' | 'right' = 'left';
  @Input()
  backdrop: BackdropDirective = new BackdropDirective();
  @Input() invisibleBackdrop: boolean = false;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  private _opened: boolean = false;

  get opened() {
    return this._opened;
  }

  @Input()
  @HostBinding('class.open')
  set opened(open: boolean) {
    this._opened = open;
    open ? this.showBackdrop() : this.hideBackdrop();
  }

  @HostBinding('class.position-left')
  get positionLeft() {
    return this.position === 'left';
  }

  @HostBinding('class.position-right')
  get positionRight() {
    return this.position === 'right';
  }

  ngAfterViewInit(): void {
    this.backdrop.closed
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe(() => this.close());
  }

  showBackdrop() {
    if (this.backdrop) {
      if (this.invisibleBackdrop) {
        this.backdrop.showInvisible();
      } else {
        this.backdrop.show();
      }

      this.enableScrollblock();
    }
  }

  hideBackdrop() {
    if (this.backdrop) {
      this.backdrop.hide();
    }

    this.disableScrollblock();
  }

  enableScrollblock() {
    this.document.body.classList.add('template-scrollblock');
  }

  disableScrollblock() {
    this.document.body.classList.remove('template-scrollblock');
  }

  open() {
    this.opened = true;
  }

  close() {
    this.opened = false;
  }

  ngOnDestroy(): void {}
}

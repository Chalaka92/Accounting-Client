import { Component } from '@angular/core';
import screenfull from 'screenfull';

@Component({
  selector: 'template-toolbar-fullscreen-toggle',
  templateUrl: './toolbar-fullscreen-toggle.component.html',
  styleUrls: ['./toolbar-fullscreen-toggle.component.scss'],
})
export class ToolbarFullscreenToggleComponent {
  isFullscreen: boolean;

  constructor() {}

  toggleFullscreen() {
    if (screenfull.isEnabled) {
      screenfull.toggle();
      this.isFullscreen = !this.isFullscreen;
    }
  }
}

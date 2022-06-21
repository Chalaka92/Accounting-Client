import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from '@template/services/theme.service';
import { filter } from 'rxjs/operators';
import { LoginService } from './core/services/login.service';
import { CurrentUser } from './shared/models/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Angular-with-Material';

  constructor(
    private route: ActivatedRoute,
    private themeService: ThemeService,
    @Inject(DOCUMENT) private document: Document,
    private iconRegistry: MatIconRegistry,
    private renderer: Renderer2,
    private platform: Platform
  ) {
    this.route.queryParamMap
      .pipe(filter((queryParamMap) => queryParamMap.has('style')))
      .subscribe((queryParamMap) =>
        this.themeService.setStyle(queryParamMap.get('style'))
      );

    this.iconRegistry.setDefaultFontSetClass('material-icons-outlined');
    this.themeService.theme$.subscribe((theme) => {
      if (theme[0]) {
        this.renderer.removeClass(this.document.body, theme[0]);
      }

      this.renderer.addClass(this.document.body, theme[1]);
    });

    if (this.platform.BLINK) {
      this.renderer.addClass(this.document.body, 'is-blink');
    }
  }
}

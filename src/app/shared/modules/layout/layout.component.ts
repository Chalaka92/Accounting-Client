import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SidenavService } from './sidenav/sidenav.service';
import { filter, map, startWith } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SidebarDirective } from 'src/@template/shared/sidebar/sidebar.directive';
import { ThemeService } from 'src/@template/services/theme.service';
import { checkRouterChildsData } from 'src/@template/utils/check-router-childs-data';
import { Observable } from 'rxjs';

@Component({
  selector: 'template-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  @ViewChild('configPanel', { static: true })
  configPanel!: SidebarDirective;

  sidenavOpen$ = this.sidenavService.open$;
  sidenavMode$ = this.sidenavService.mode$;
  sidenavCollapsed$ = this.sidenavService.collapsed$;
  sidenavExpanded$ = this.sidenavService.expanded$;
  quickPanelOpen: boolean | undefined;

  sideNavigation$ = this.themeService.config$.pipe(
    map((config) => config.navigation === 'side')
  );
  topNavigation$ = this.themeService.config$.pipe(
    map((config) => config.navigation === 'top')
  );
  toolbarVisible$ = this.themeService.config$.pipe(
    map((config) => config.toolbarVisible)
  );
  toolbarPosition$ = this.themeService.config$.pipe(
    map((config) => config.toolbarPosition)
  );
  footerPosition$ = this.themeService.config$.pipe(
    map((config) => config.footerPosition)
  );

  scrollDisabled$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    startWith(null),
    map(() =>
      checkRouterChildsData(
        this.router.routerState.root.snapshot,
        (data: { scrollDisabled: any }) => data.scrollDisabled
      )
    )
  );

  constructor(
    private sidenavService: SidenavService,
    private themeService: ThemeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {}

  openQuickPanel() {
    this.quickPanelOpen = true;
  }

  openConfigPanel() {
    this.configPanel.open();
  }

  closeSidenav() {
    this.sidenavService.close();
  }

  openSidenav() {
    this.sidenavService.open();
  }

  ngOnDestroy(): void {}
}

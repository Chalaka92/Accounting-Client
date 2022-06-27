import {
  Component,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ThemeService } from 'src/@template/services/theme.service';
import { SidenavItem } from './sidenav-item/sidenav-item.interface';
import { SidenavService } from './sidenav.service';

@Component({
  selector: 'template-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit, OnDestroy {
  sidenavUserVisible$ = this.themeService.config$.pipe(
    map((config) => config.sidenavUserVisible)
  );

  @Input()
  @HostBinding('class.collapsed')
  collapsed: boolean;

  @Input()
  @HostBinding('class.expanded')
  expanded: boolean;

  items$: Observable<SidenavItem[]>;

  constructor(
    private router: Router,
    private sidenavService: SidenavService,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.addNavItems();

    this.items$ = this.sidenavService.items$.pipe(
      map((items: SidenavItem[]) =>
        this.sidenavService.sortRecursive(items, 'position')
      )
    );
  }

  addNavItems() {
    this.sidenavService.items = [];
    this.sidenavService.addItems([
      // {
      //   name: 'APPS',
      //   position: 5,
      //   type: 'subheading',
      //   customClass: 'first-subheading',
      // },
      {
        name: 'Dashboard',
        routeOrFunction: '/private/dashboard',
        icon: 'dashboard',
        position: 5,
        pathMatchExact: true,
      },
      {
        name: 'Accountings Settings',
        icon: 'settings',
        position: 10,
        subItems: [
          {
            name: 'Company',
            routeOrFunction: '/private/accountingsettings/company',
            position: 10,
            icon: 'account_balance',
          },
          {
            name: 'Financial Year',
            routeOrFunction: '/forms/form-wizard',
            position: 15,
          },
          {
            name: 'Format Settings',
            routeOrFunction: '/forms/form-wizard',
            position: 20,
          },
          {
            name: 'Payment Term',
            routeOrFunction: '/forms/form-wizard',
            position: 25,
          },
          {
            name: 'Unit Of Measurement',
            routeOrFunction: '/forms/form-wizard',
            position: 30,
          },
          {
            name: 'COA Template',
            routeOrFunction: '/forms/form-wizard',
            position: 35,
          },
          {
            name: 'Item Category',
            routeOrFunction: '/forms/form-wizard',
            position: 40,
          },
          {
            name: 'Cheque Format',
            routeOrFunction: '/forms/form-wizard',
            position: 45,
          },
          {
            name: 'Pay Items Config',
            routeOrFunction: '/forms/form-wizard',
            position: 50,
          },
        ],
      },
    ]);
  }

  toggleCollapsed() {
    this.sidenavService.toggleCollapsed();
  }

  @HostListener('mouseenter')
  @HostListener('touchenter')
  onMouseEnter() {
    this.sidenavService.setExpanded(true);
  }

  @HostListener('mouseleave')
  @HostListener('touchleave')
  onMouseLeave() {
    this.sidenavService.setExpanded(false);
  }

  ngOnDestroy() {}
}

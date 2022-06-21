import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ListColumn } from '@template/shared/list/list-column.model';

@Component({
  selector: 'template-recent-sales-widget-table',
  templateUrl: './recent-sales-widget-table.component.html',
  styleUrls: ['./recent-sales-widget-table.component.scss'],
})
export class RecentSalesWidgetTableComponent implements OnInit, AfterViewInit {
  @Input() columns: ListColumn[] | any;
  @Input() pageSize: any = 10;
  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  data$: Observable<any[]> = this.subject$.asObservable();
  dataSource: MatTableDataSource<any> | any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private dialog: MatDialog) {}

  @Input() set data(value: any[]) {
    this.subject$.next(value);
  }

  get visibleColumns() {
    return this.columns
      .filter((column: { visible: any }) => column.visible)
      .map((column: { property: any }) => column.property);
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();

    this.data$
      .pipe(filter((data) => !!data))
      .subscribe((values) => (this.dataSource.data = values));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
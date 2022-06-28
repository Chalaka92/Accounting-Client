import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { fadeInRightAnimation } from 'src/@template/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@template/animations/fade-in-up.animation';
import { ListColumn } from 'src/@template/shared/list/list-column.model';
import { PaymentTermService } from 'src/app/private/http/accounting-settings/payment-term.service';
import { PaymentTerm } from 'src/app/private/models/payment-term.interface';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { PaymentTermCreateUpdateComponent } from './payment-term-create-update/payment-term-create-update.component';

@Component({
  selector: 'template-payment-term',
  templateUrl: './payment-term.component.html',
  styleUrls: ['./payment-term.component.scss'],
  animations: [fadeInUpAnimation, fadeInRightAnimation],
})
export class PaymentTermComponent implements OnInit, OnDestroy {
  paymentTerms: PaymentTerm[];

  @Input()
  columns: ListColumn[] = [
    { name: '#Seq', property: 'index', visible: true },
    { name: 'Id', property: 'id', visible: false, isModelProperty: true },
    {
      name: 'Description',
      property: 'description',
      visible: true,
      isModelProperty: true,
    },
    {
      name: 'Payment Type',
      property: 'paymentType',
      visible: true,
      isModelProperty: true,
    },
    {
      name: 'Due After Days',
      property: 'dueAfterDays',
      visible: true,
      isModelProperty: true,
    },
    {
      name: 'Active',
      property: 'isActive',
      visible: true,
      isModelProperty: true,
    },
    { name: 'Actions', property: 'actions', visible: true },
  ] as ListColumn[];
  dataSource: MatTableDataSource<PaymentTerm> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private paymentTermService: PaymentTermService,
    private snackbar: MatSnackBar
  ) {}

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  getAllPaymentTerms() {
    this.paymentTermService.getAllPaymentTerms().subscribe((response) => {
      if (response && response.data) {
        this.paymentTerms = response.data.data;
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = this.paymentTerms;

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  ngOnInit() {
    this.getAllPaymentTerms();
  }

  createPaymentTerm() {
    this.dialog
      .open(PaymentTermCreateUpdateComponent, { width: '25%' })
      .afterClosed()
      .subscribe((paymentTerm: PaymentTerm) => {
        /**
         * PaymentTerm is the updated paymentTerm (if the user pressed Save - otherwise it's null)
         */
        if (paymentTerm) {
          this.paymentTermService.createPaymentTerm(paymentTerm).subscribe(
            (response) => {
              this.getAllPaymentTerms();
              this.snackbar.open('Creation Successful', 'x', {
                duration: 3000,
                panelClass: 'notif-success',
              });
            },
            (error) => {
              this.snackbar.open('Creation Failed', 'x', {
                duration: 3000,
                panelClass: 'notif-error',
              });
            }
          );
          this.paymentTerms = [];
        }
      });
  }

  updatePaymentTerm(paymentTerm) {
    this.dialog
      .open(PaymentTermCreateUpdateComponent, {
        data: paymentTerm,
        width: '25%',
      })
      .afterClosed()
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe((paymentTerm) => {
        /**
         * PaymentTerm is the updated paymentTerm (if the user pressed Save - otherwise it's null)
         */
        if (paymentTerm) {
          this.paymentTermService
            .updatePaymentTerm(paymentTerm.id, paymentTerm)
            .subscribe(
              (retemplateonse) => {
                this.getAllPaymentTerms();
                this.snackbar.open('Update Successful', 'x', {
                  duration: 3000,
                  panelClass: 'notif-success',
                });
              },
              (error) => {
                this.snackbar.open('Update Failed', 'x', {
                  duration: 3000,
                  panelClass: 'notif-error',
                });
              }
            );
        }
      });
  }

  deletePaymentTerm(paymentTerm) {
    this.paymentTermService
      .deletePaymentTerm(paymentTerm.id)
      .subscribe((response) => {
        this.getAllPaymentTerms();
        this.snackbar.open('Deletion Successful', 'x', {
          duration: 3000,
          panelClass: 'notif-success',
        });
      });
  }

  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  confirmDialog(paymentTerm): void {
    const message = `Are you sure you want to delete this?`;

    const dialogData = {
      icon: 'delete',
      title: 'Delete',
      message: message,
      icolor: 'warn',
    };

    this.dialog
      .open(ConfirmDialogComponent, {
        maxWidth: '400px',
        data: dialogData,
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          this.deletePaymentTerm(paymentTerm);
        }
      });
  }

  ngOnDestroy() {}
}

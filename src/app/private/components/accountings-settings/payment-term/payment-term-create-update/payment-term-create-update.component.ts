import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PaymentTerm } from 'src/app/private/models/payment-term.interface';
import { yesNoDropdown, paymentTypesDd } from '@app/shared/data/dropdown-data';

@Component({
  selector: 'template-payment-term-create-update',
  templateUrl: './payment-term-create-update.component.html',
  styleUrls: ['./payment-term-create-update.component.scss'],
})
export class PaymentTermCreateUpdateComponent implements OnInit {
  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  activeTypes: any = yesNoDropdown || [];
  paymentTypes: any = paymentTypesDd || [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<PaymentTermCreateUpdateComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as PaymentTerm;
    }

    this.form = this.fb.group({
      description: [this.defaults.description || '', [Validators.required]],
      paymentType: [this.defaults.paymentType || null, [Validators.required]],
      dueAfterDays: [this.defaults.dueAfterDays || 0],
      isActive: [this.defaults.isActive || true],
    });
  }

  save() {
    if (this.mode === 'create') {
      this.createItem();
    } else if (this.mode === 'update') {
      this.updateItem();
    }
  }

  createItem() {
    const paymentTerm = this.form.value;
    this.dialogRef.close(paymentTerm);
  }

  updateItem() {
    const paymentTerm = this.form.value;
    paymentTerm.id = this.defaults.id;

    this.dialogRef.close(paymentTerm);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
}

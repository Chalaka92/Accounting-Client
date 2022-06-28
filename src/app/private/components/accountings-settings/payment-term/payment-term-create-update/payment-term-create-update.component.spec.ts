import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTermCreateUpdateComponent } from './payment-term-create-update.component';

describe('PaymentTermCreateUpdateComponent', () => {
  let component: PaymentTermCreateUpdateComponent;
  let fixture: ComponentFixture<PaymentTermCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentTermCreateUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentTermCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

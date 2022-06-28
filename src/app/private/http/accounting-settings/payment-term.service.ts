import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentTerm } from '../../models/payment-term.interface';

@Injectable({
  providedIn: 'root',
})
export class PaymentTermService {
  constructor(private http: HttpClient) {}

  getAllPaymentTerms(): Observable<any> {
    return this.http.get(`${environment.backend}/paymentterms`);
  }

  createPaymentTerm(request: PaymentTerm) {
    return this.http.post(`${environment.backend}/paymentterms`, request);
  }

  updatePaymentTerm(id: any, request: PaymentTerm) {
    return this.http.patch(`${environment.backend}/paymentterms` + id, request);
  }

  deletePaymentTerm(id: any) {
    return this.http.delete(`${environment.backend}/paymentterms` + id);
  }
}

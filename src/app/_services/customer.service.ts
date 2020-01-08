import { Injectable } from "@angular/core";
import { Customer, User } from "@app/_models";
import { environment } from "@environments/environment";
import { HttpClient } from "@angular/common/http";
import { first, map } from "rxjs/operators";
import * as moment from "moment";

@Injectable({
  providedIn: "root"
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http
      .get<Customer[]>(`${environment.apiUrl}/customer`)
      .pipe(first())
      .pipe(
        map(customers =>
          customers.map(customer => ({
            ...customer,
            audit: {
              ...customer.audit,
              createdAt: moment(customer.audit.createdAt),
              updatedAt: moment(customer.audit.updatedAt)
            }
          }))
        )
      );
  }

  getById(id: number) {
    return this.http.get<Customer>(
      `${environment.apiUrl}/customer/getById/${id}`
    );
  }
}

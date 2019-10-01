import { Injectable } from "@angular/core";
import { Customer, User } from "@app/_models";
import { environment } from "@environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Customer[]>(`${environment.apiUrl}/customer`);
  }

  getById(id: number) {
    return this.http.get<Customer>(
      `${environment.apiUrl}/customer/getById/${id}`
    );
  }
}

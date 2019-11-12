import { Injectable } from "@angular/core";
import { Customer } from "@app/_models";
import { CustomerService } from "@app/_services/customer.service";

@Injectable({
  providedIn: "root"
})
export class CustomerManagementService {
  showTopOutlet: boolean = false;
  showLeftOutlet: boolean = true;
  showRightOutlet: boolean = true;

  selectedCustomer: Customer;
  redeemedCoupons: [] = [];

  constructor(public customerService: CustomerService) {}

  disable(customer: Customer) {}

  sendNotification(customer: Customer) {}
}

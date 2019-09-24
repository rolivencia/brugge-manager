import { Component, OnInit } from "@angular/core";
import { CustomerManagementService } from "@app/dashboard/customer-management/customer-management.service";

@Component({
  selector: "app-customer-management",
  templateUrl: "./customer-management.component.html",
  styleUrls: ["./customer-management.component.scss"],
  providers: [CustomerManagementService]
})
export class CustomerManagementComponent implements OnInit {
  constructor(public customerManagementService: CustomerManagementService) {}

  ngOnInit() {}
}

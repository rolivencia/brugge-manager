import { Component, OnInit } from "@angular/core";
import { CustomerManagementService } from "@app/dashboard/customer-management/customer-management.service";

@Component({
  selector: "app-customer-view",
  templateUrl: "./customer-view.component.html",
  styleUrls: [
    "./customer-view.component.scss",
    "../customer-management.component.scss"
  ]
})
export class CustomerViewComponent implements OnInit {
  showAudit: boolean = false;
  showCoupons: boolean = false;

  constructor(public customerManagementService: CustomerManagementService) {}

  ngOnInit() {}

  toggleAudit() {
    this.showAudit = true;
    this.showCoupons = false;
  }

  toggleCoupons() {
    this.showCoupons = true;
    this.showAudit = false;
  }
}

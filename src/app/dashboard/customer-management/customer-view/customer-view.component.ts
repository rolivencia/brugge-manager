import { Component, OnInit } from "@angular/core";
import { CustomerManagementService } from "@app/dashboard/customer-management/customer-management.service";
import { CouponService } from "@app/_services/coupon.service";

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
  showCoupons: boolean = true;

  redeemedCoupons = [];

  columns: any[] = [
    { header: "Título", binding: "title", width: 170 },
    { header: "Canjeado en", binding: "redeemedAt", width: 130 }
  ];

  constructor(
    public couponService: CouponService,
    public customerManagementService: CustomerManagementService
  ) {}

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

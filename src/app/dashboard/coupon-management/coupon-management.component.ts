import { Component, OnInit } from "@angular/core";
import { CouponManagementService } from "@app/dashboard/coupon-management/coupon-management.service";

@Component({
  selector: "app-coupon-management",
  templateUrl: "./coupon-management.component.html",
  styleUrls: ["./coupon-management.component.scss"],
  providers: [CouponManagementService]
})
export class CouponManagementComponent implements OnInit {
  constructor(public couponManagementService: CouponManagementService) {}

  ngOnInit() {}
}

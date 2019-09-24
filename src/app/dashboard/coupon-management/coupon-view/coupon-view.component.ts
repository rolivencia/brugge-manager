import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { CouponManagementService } from "@app/dashboard/coupon-management/coupon-management.service";

@Component({
  selector: "app-coupon-view",
  templateUrl: "./coupon-view.component.html",
  styleUrls: [
    "./coupon-view.component.scss",
    "../coupon-management.component.scss"
  ],
  encapsulation: ViewEncapsulation.None
})
export class CouponViewComponent implements OnInit {
  constructor(public couponManagementService: CouponManagementService) {}

  ngOnInit() {}
}

import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { CouponManagementService } from "@app/dashboard/coupon-management/coupon-management.service";
import { CouponService } from "@app/_services/coupon.service";
import { Coupon } from "@app/_models";
import { CollectionView } from "wijmo/wijmo";

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
  constructor(
    public couponManagementService: CouponManagementService,
    public couponService: CouponService
  ) {}

  ngOnInit() {}

  public removeCoupon(coupon: Coupon) {
    this.couponService.remove(coupon).subscribe(response => {
      console.log(response);
    });

    // TODO: Remove multiple usages
    this.couponService.getAll().subscribe(coupons => {
      this.couponManagementService.coupons = coupons;
      this.couponManagementService.gridCollection = new CollectionView(coupons);
    });
  }
}

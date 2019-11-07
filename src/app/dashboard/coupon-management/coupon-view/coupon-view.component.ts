import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { CouponManagementService } from "@app/dashboard/coupon-management/coupon-management.service";
import { CouponService } from "@app/_services/coupon.service";
import { Coupon } from "@app/_models";
import { CollectionView } from "wijmo/wijmo";
import { concat, zip } from "rxjs";
import { endWith, first, flatMap, skipUntil, take, tap } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";

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
    public couponService: CouponService,
    private toasterService: ToastrService
  ) {}

  ngOnInit() {}

  public removeCoupon(coupon: Coupon) {
    const removeCoupon = this.couponService
      .remove(coupon)
      .pipe(take(1))
      .pipe(
        tap(([response, id]) => {
          if (response && id) {
            this.toasterService.info(
              `Cupón id ${id} dado de baja correctamente`
            );
          } else {
            this.toasterService.error(
              "Error al dar de baja el cupón seleccionado"
            );
          }
        })
      );

    const getCoupons = this.couponService
      .getAll()
      .pipe(take(1))
      .pipe(
        tap(coupons => {
          this.couponManagementService.coupons = coupons;
          this.couponManagementService.gridCollection = new CollectionView(
            coupons
          );
          this.couponManagementService.selectedCoupon = null;
        })
      );

    removeCoupon.pipe(flatMap(() => getCoupons)).subscribe(response => {
      console.log(response);
    });
  }
}

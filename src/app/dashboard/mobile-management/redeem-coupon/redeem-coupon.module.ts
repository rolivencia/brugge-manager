import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RedeemCouponRoutingModule } from "./redeem-coupon-routing.module";
import { RedeemCouponComponent } from "@app/dashboard/mobile-management/redeem-coupon/redeem-coupon.component";

@NgModule({
  declarations: [RedeemCouponComponent],
  imports: [CommonModule, RedeemCouponRoutingModule]
})
export class RedeemCouponModule {}

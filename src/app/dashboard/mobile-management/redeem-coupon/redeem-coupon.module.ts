import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ZXingScannerModule } from "@zxing/ngx-scanner";
import { RedeemCouponRoutingModule } from "./redeem-coupon-routing.module";
import { RedeemCouponComponent } from "@app/dashboard/mobile-management/redeem-coupon/redeem-coupon.component";

@NgModule({
  declarations: [RedeemCouponComponent],
  imports: [CommonModule, RedeemCouponRoutingModule, ZXingScannerModule]
})
export class RedeemCouponModule {}

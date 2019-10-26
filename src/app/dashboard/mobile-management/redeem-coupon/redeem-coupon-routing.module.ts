import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RedeemCouponComponent } from "@app/dashboard/mobile-management/redeem-coupon/redeem-coupon.component";

const routes: Routes = [
  {
    path: "",
    component: RedeemCouponComponent,
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RedeemCouponRoutingModule {}

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MobileManagementComponent } from "@app/dashboard/mobile-management/mobile-management.component";

const routes: Routes = [
  {
    path: "",
    component: MobileManagementComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import(
            "app/dashboard/mobile-management/mobile-dashboard/mobile-dashboard.module"
          ).then(m => m.MobileDashboardModule)
      },
      {
        path: "redeem-coupon",
        loadChildren: () =>
          import(
            "app/dashboard/mobile-management/redeem-coupon/redeem-coupon.module"
          ).then(m => m.RedeemCouponModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileManagementRoutingModule {}

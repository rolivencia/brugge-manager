import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CouponManagementComponent } from "@app/dashboard/coupon-management/coupon-management.component";
import { CouponAddComponent } from "@app/dashboard/coupon-management/coupon-add/coupon-add.component";
import { CouponGridComponent } from "@app/dashboard/coupon-management/coupon-grid/coupon-grid.component";
import { CouponViewComponent } from "@app/dashboard/coupon-management/coupon-view/coupon-view.component";
import { CouponUpdateComponent } from "@app/dashboard/coupon-management/coupon-update/coupon-update.component";

const routes: Routes = [
  {
    path: "",
    component: CouponManagementComponent,
    pathMatch: "full",
    children: [
      { path: "", component: CouponAddComponent, outlet: "top-outlet" },
      { path: "", component: CouponGridComponent, outlet: "left-outlet" },
      { path: "", component: CouponUpdateComponent, outlet: "top-outlet" },
      { path: "", component: CouponViewComponent, outlet: "right-outlet" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponManagementRoutingModule {}

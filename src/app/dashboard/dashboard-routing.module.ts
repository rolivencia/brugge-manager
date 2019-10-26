import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "@app/dashboard/dashboard.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("app/dashboard/routing-panel/routing-panel.module").then(
            m => m.RoutingPanelModule
          )
      },
      {
        path: "coupons",
        loadChildren: () =>
          import(
            "app/dashboard/coupon-management/coupon-management.module"
          ).then(m => m.CouponManagementModule)
      },
      {
        path: "customer",
        loadChildren: () =>
          import(
            "app/dashboard/customer-management/customer-management.module"
          ).then(m => m.CustomerManagementModule)
      },
      {
        path: "mobile",
        loadChildren: () =>
          import(
            "app/dashboard/mobile-management/mobile-management.module"
          ).then(m => m.MobileManagementModule)
      },
      {
        path: "notification",
        loadChildren: () =>
          import(
            "app/dashboard/notification-management/notification-management.module"
          ).then(m => m.NotificationManagementModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}

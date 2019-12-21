import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReportManagementComponent } from "@app/dashboard/report-management/report-management.component";

const routes: Routes = [
  {
    path: "",
    component: ReportManagementComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./report-routing-panel/report-routing-panel.module").then(
            m => m.ReportRoutingPanelModule
          )
      },
      {
        path: "redeemed-coupons",
        loadChildren: () =>
          import(
            "./report-redeemed-coupons/report-redeemed-coupons.module"
          ).then(m => m.ReportRedeemedCouponsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportManagementRoutingModule {}

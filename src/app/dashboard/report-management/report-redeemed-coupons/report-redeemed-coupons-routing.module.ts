import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReportRoutingPanelService } from "@app/dashboard/report-management/report-routing-panel/report-routing-panel.service";
import { ReportRedeemedCouponsComponent } from "@app/dashboard/report-management/report-redeemed-coupons/report-redeemed-coupons.component";

const routes: Routes = [
  {
    path: "",
    component: ReportRedeemedCouponsComponent,
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ReportRoutingPanelService]
})
export class ReportRedeemedCouponsRoutingModule {}

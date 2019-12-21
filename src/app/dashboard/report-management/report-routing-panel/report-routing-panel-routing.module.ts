import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReportRoutingPanelComponent } from "@app/dashboard/report-management/report-routing-panel/report-routing-panel.component";
import { ReportRoutingPanelService } from "@app/dashboard/report-management/report-routing-panel/report-routing-panel.service";

const routes: Routes = [
  {
    path: "",
    component: ReportRoutingPanelComponent,
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ReportRoutingPanelService]
})
export class ReportRoutingPanelRoutingModule {}

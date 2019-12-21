import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReportRoutingPanelComponent } from "./report-routing-panel.component";
import { ReportRoutingPanelRoutingModule } from "@app/dashboard/report-management/report-routing-panel/report-routing-panel-routing.module";

@NgModule({
  declarations: [ReportRoutingPanelComponent],
  imports: [CommonModule, ReportRoutingPanelRoutingModule]
})
export class ReportRoutingPanelModule {}

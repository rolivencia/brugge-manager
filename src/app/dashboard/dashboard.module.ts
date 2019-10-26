import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "@app/dashboard/dashboard.component";
import { RoutingPanelService } from "@app/dashboard/routing-panel/routing-panel.service";

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, DashboardRoutingModule],
  providers: [RoutingPanelService]
})
export class DashboardModule {}

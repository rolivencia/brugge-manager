import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MobileDashboardRoutingModule } from "./mobile-dashboard-routing.module";
import { MobileDashboardComponent } from "./mobile-dashboard.component";

@NgModule({
  declarations: [MobileDashboardComponent],
  imports: [CommonModule, MobileDashboardRoutingModule]
})
export class MobileDashboardModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RoutingPanelRoutingModule } from "./routing-panel-routing.module";
import { RoutingPanelComponent } from "./routing-panel.component";

@NgModule({
  declarations: [RoutingPanelComponent],
  imports: [CommonModule, RoutingPanelRoutingModule]
})
export class RoutingPanelModule {}

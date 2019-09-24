import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RoutingPanelComponent } from "@app/dashboard/routing-panel/routing-panel.component";

const routes: Routes = [
  {
    path: "",
    component: RoutingPanelComponent,
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingPanelRoutingModule {}

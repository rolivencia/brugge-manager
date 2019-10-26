import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MobileDashboardComponent } from "@app/dashboard/mobile-management/mobile-dashboard/mobile-dashboard.component";

const routes: Routes = [
  {
    path: "",
    component: MobileDashboardComponent,
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileDashboardRoutingModule {}

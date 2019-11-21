import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReportManagementComponent } from "@app/dashboard/report-management/report-management.component";

const routes: Routes = [
  {
    path: "",
    component: ReportManagementComponent,
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportManagementRoutingModule {}

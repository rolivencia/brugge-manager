import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CustomerManagementComponent } from "@app/dashboard/customer-management/customer-management.component";
import { CustomerGridComponent } from "@app/dashboard/customer-management/customer-grid/customer-grid.component";
import { CustomerViewComponent } from "@app/dashboard/customer-management/customer-view/customer-view.component";

const routes: Routes = [
  {
    path: "",
    component: CustomerManagementComponent,
    pathMatch: "full",
    children: [
      { path: "", component: CustomerGridComponent, outlet: "left-outlet" },
      { path: "", component: CustomerViewComponent, outlet: "right-outlet" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerManagementRoutingModule {}

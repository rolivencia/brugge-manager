import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotificationManagementComponent } from "@app/dashboard/notification-management/notification-management.component";
import { NotificationDetailsComponent } from "@app/dashboard/notification-management/notification-details/notification-details.component";
import { NotificationGridComponent } from "@app/dashboard/notification-management/notification-grid/notification-grid.component";

const routes: Routes = [
  {
    path: "",
    component: NotificationManagementComponent,
    pathMatch: "full",
    children: [
      { path: "", component: NotificationGridComponent, outlet: "left-outlet" },
      {
        path: "",
        component: NotificationDetailsComponent,
        outlet: "right-outlet"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationManagementRoutingModule {}

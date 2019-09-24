import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NotificationManagementRoutingModule } from "./notification-management-routing.module";
import { NotificationManagementComponent } from "./notification-management.component";
import { NotificationGridComponent } from "./notification-grid/notification-grid.component";
import { NotificationDetailsComponent } from "./notification-details/notification-details.component";

@NgModule({
  declarations: [
    NotificationManagementComponent,
    NotificationGridComponent,
    NotificationDetailsComponent
  ],
  imports: [CommonModule, NotificationManagementRoutingModule]
})
export class NotificationManagementModule {}

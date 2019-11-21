import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NotificationManagementRoutingModule } from "./notification-management-routing.module";
import { NotificationManagementComponent } from "./notification-management.component";
import { NotificationGridComponent } from "./notification-grid/notification-grid.component";
import { NotificationDetailsComponent } from "./notification-details/notification-details.component";
import { WjGridModule } from "wijmo/wijmo.angular2.grid";
import { WjGridFilterModule } from "wijmo/wijmo.angular2.grid.filter";

@NgModule({
  declarations: [
    NotificationManagementComponent,
    NotificationGridComponent,
    NotificationDetailsComponent
  ],
  imports: [
    CommonModule,
    NotificationManagementRoutingModule,
    WjGridFilterModule,
    WjGridModule
  ]
})
export class NotificationManagementModule {}

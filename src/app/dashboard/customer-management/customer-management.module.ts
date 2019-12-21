import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CustomerManagementRoutingModule } from "./customer-management-routing.module";
import { CustomerManagementComponent } from "./customer-management.component";
import { CustomerGridComponent } from "./customer-grid/customer-grid.component";
import { CustomerViewComponent } from "./customer-view/customer-view.component";
import { CustomerManagementService } from "@app/dashboard/customer-management/customer-management.service";
import { WjGridModule } from "wijmo/wijmo.angular2.grid";
import { WjGridFilterModule } from "wijmo/wijmo.angular2.grid.filter";
import { LayoutService } from "@app/_services/layout.service";

@NgModule({
  declarations: [
    CustomerManagementComponent,
    CustomerGridComponent,
    CustomerViewComponent
  ],
  imports: [
    CommonModule,
    CustomerManagementRoutingModule,
    WjGridFilterModule,
    WjGridModule
  ],
  providers: [CustomerManagementService, LayoutService]
})
export class CustomerManagementModule {}

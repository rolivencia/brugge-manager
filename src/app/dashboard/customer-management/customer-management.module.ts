import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CustomerManagementRoutingModule } from "./customer-management-routing.module";
import { CustomerManagementComponent } from "./customer-management.component";
import { CustomerGridComponent } from "./customer-grid/customer-grid.component";
import { CustomerViewComponent } from "./customer-view/customer-view.component";
import { CustomerManagementService } from "@app/dashboard/customer-management/customer-management.service";

@NgModule({
  declarations: [
    CustomerManagementComponent,
    CustomerGridComponent,
    CustomerViewComponent
  ],
  imports: [CommonModule, CustomerManagementRoutingModule],
  providers: [CustomerManagementService]
})
export class CustomerManagementModule {}

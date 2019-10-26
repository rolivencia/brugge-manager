import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MobileManagementRoutingModule } from "./mobile-management-routing.module";
import { MobileManagementComponent } from "./mobile-management.component";

@NgModule({
  declarations: [MobileManagementComponent],
  imports: [CommonModule, MobileManagementRoutingModule]
})
export class MobileManagementModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReportManagementRoutingModule } from "./report-management-routing.module";
import { ReportManagementComponent } from "./report-management.component";
import { ReportManagementService } from "@app/dashboard/report-management/report-management.service";

@NgModule({
  declarations: [ReportManagementComponent],
  imports: [CommonModule, ReportManagementRoutingModule],
  providers: [ReportManagementService]
})
export class ReportManagementModule {}

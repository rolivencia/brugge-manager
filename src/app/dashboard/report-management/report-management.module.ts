import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReportManagementRoutingModule } from "./report-management-routing.module";
import { ReportManagementComponent } from "./report-management.component";
import { WjGridModule } from "wijmo/wijmo.angular2.grid";
import { WjGridFilterModule } from "wijmo/wijmo.angular2.grid.filter";

@NgModule({
  declarations: [ReportManagementComponent],
  imports: [
    CommonModule,
    ReportManagementRoutingModule,
    WjGridFilterModule,
    WjGridModule
  ]
})
export class ReportManagementModule {}

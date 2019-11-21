import { Component, OnInit } from "@angular/core";
import { ReportManagementService } from "@app/dashboard/report-management/report-management.service";

@Component({
  selector: "app-report-management",
  templateUrl: "./report-management.component.html",
  styleUrls: ["./report-management.component.scss"]
})
export class ReportManagementComponent implements OnInit {
  columns = [];

  constructor(public reportManagementService: ReportManagementService) {}

  ngOnInit() {}

  getReportDetails(selectedItem: any) {}
}

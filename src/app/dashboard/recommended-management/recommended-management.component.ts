import { Component, OnInit } from "@angular/core";
import { RecommendedManagementService } from "@app/dashboard/recommended-management/recommended-management.service";

@Component({
  selector: "app-recommended-management",
  templateUrl: "./recommended-management.component.html",
  styleUrls: ["./recommended-management.component.scss"]
})
export class RecommendedManagementComponent implements OnInit {
  constructor(
    public recommendedManagementService: RecommendedManagementService
  ) {}

  ngOnInit() {}
}

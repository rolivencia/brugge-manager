import { Component, OnInit } from "@angular/core";
import { RecommendedManagementService } from "@app/dashboard/recommended-management/recommended-management.service";

@Component({
  selector: "app-recommended-view",
  templateUrl: "./recommended-view.component.html",
  styleUrls: ["./recommended-view.component.scss"]
})
export class RecommendedViewComponent implements OnInit {
  constructor(
    public recommendedManagementService: RecommendedManagementService
  ) {}

  ngOnInit() {}

  remove(selected: any) {}
}

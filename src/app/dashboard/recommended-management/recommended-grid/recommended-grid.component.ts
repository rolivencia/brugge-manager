import { Component, OnInit } from "@angular/core";
import { RecommendedManagementService } from "@app/dashboard/recommended-management/recommended-management.service";
import { CollectionView } from "wijmo/wijmo";
import { RecommendedService } from "@app/_services/recommended.service";

@Component({
  selector: "app-recommended-grid",
  templateUrl: "./recommended-grid.component.html",
  styleUrls: ["./recommended-grid.component.scss"]
})
export class RecommendedGridComponent implements OnInit {
  showDisabled: boolean = false;
  showDeleted: boolean = false;

  columns: any[] = [
    { header: "ID", binding: "id", width: 50, id: "id" },
    { header: "Título", binding: "title", width: "*", id: "title" },
    {
      header: "Descripción",
      binding: "description",
      width: "*",
      id: "description"
    }
  ];

  constructor(
    public recommendedManagementService: RecommendedManagementService,
    public recommendedService: RecommendedService
  ) {}

  ngOnInit() {
    this.getGridData();
  }

  getGridData() {
    this.recommendedService.get().subscribe(coupons => {
      this.recommendedManagementService.recommendations = coupons;
      this.recommendedManagementService.gridCollection = new CollectionView(
        coupons
      );
      this.recommendedManagementService.gridCollection.currentItem = null;
    });
  }

  getRecommendedDetails(currentItem) {
    this.recommendedManagementService.selectedRecommended = currentItem;
  }
}

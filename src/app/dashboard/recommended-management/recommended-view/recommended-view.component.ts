import { Component, OnInit } from "@angular/core";
import { RecommendedManagementService } from "@app/dashboard/recommended-management/recommended-management.service";
import { Coupon } from "@app/_models";
import { flatMap, take, tap } from "rxjs/operators";
import { CollectionView } from "wijmo/wijmo";
import { Recommended } from "@app/_models/recommended";
import { RecommendedService } from "@app/_services/recommended.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-recommended-view",
  templateUrl: "./recommended-view.component.html",
  styleUrls: ["./recommended-view.component.scss"]
})
export class RecommendedViewComponent implements OnInit {
  constructor(
    public recommendedService: RecommendedService,
    public recommendedManagementService: RecommendedManagementService,
    public toasterService: ToastrService
  ) {}

  ngOnInit() {}

  public remove(recommendation: Recommended) {
    const removeRecommendation = this.recommendedService
      .remove(recommendation)
      .pipe(take(1))
      .pipe(
        tap(([response, id]) => {
          if (response && id) {
            this.toasterService.info(
              `Recomendado id ${id} dado de baja correctamente`
            );
          } else {
            this.toasterService.error(
              "Error al dar de baja el recomendado seleccionado"
            );
          }
        })
      );

    const getRecommendations = this.recommendedService
      .get()
      .pipe(take(1))
      .pipe(
        tap(recommendations => {
          this.recommendedManagementService.recommendations = recommendations;
          this.recommendedManagementService.gridCollection = new CollectionView(
            recommendations
          );
          this.recommendedManagementService.gridCollection.currentItem = null;
        })
      );

    removeRecommendation
      .pipe(flatMap(() => getRecommendations))
      .subscribe(response => {
        console.log(response);
      });
  }
}

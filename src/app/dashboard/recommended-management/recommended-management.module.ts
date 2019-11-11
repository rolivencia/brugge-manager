import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RecommendedManagementRoutingModule } from "./recommended-management-routing.module";
import { RecommendedViewComponent } from "@app/dashboard/recommended-management/recommended-view/recommended-view.component";
import { RecommendedAddComponent } from "@app/dashboard/recommended-management/recommended-add/recommended-add.component";
import { RecommendedManagementComponent } from "@app/dashboard/recommended-management/recommended-management.component";
import { RecommendedGridComponent } from "@app/dashboard/recommended-management/recommended-grid/recommended-grid.component";
import { RecommendedManagementService } from "@app/dashboard/recommended-management/recommended-management.service";

@NgModule({
  declarations: [
    RecommendedAddComponent,
    RecommendedGridComponent,
    RecommendedManagementComponent,
    RecommendedViewComponent
  ],
  imports: [CommonModule, RecommendedManagementRoutingModule],
  providers: [RecommendedManagementService]
})
export class RecommendedManagementModule {}

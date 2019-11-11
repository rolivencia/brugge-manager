import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecommendedManagementComponent } from "@app/dashboard/recommended-management/recommended-management.component";
import { RecommendedAddComponent } from "@app/dashboard/recommended-management/recommended-add/recommended-add.component";
import { RecommendedGridComponent } from "@app/dashboard/recommended-management/recommended-grid/recommended-grid.component";
import { RecommendedViewComponent } from "@app/dashboard/recommended-management/recommended-view/recommended-view.component";

const routes: Routes = [
  {
    path: "",
    component: RecommendedManagementComponent,
    pathMatch: "full",
    children: [
      { path: "", component: RecommendedAddComponent, outlet: "top-outlet" },
      { path: "", component: RecommendedGridComponent, outlet: "left-outlet" },
      // { path: "", component: RecommendedUpdateComponent, outlet: "top-outlet" },
      { path: "", component: RecommendedViewComponent, outlet: "right-outlet" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecommendedManagementRoutingModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RecommendedManagementRoutingModule } from "./recommended-management-routing.module";
import { RecommendedViewComponent } from "@app/dashboard/recommended-management/recommended-view/recommended-view.component";
import { RecommendedAddComponent } from "@app/dashboard/recommended-management/recommended-add/recommended-add.component";
import { RecommendedManagementComponent } from "@app/dashboard/recommended-management/recommended-management.component";
import { RecommendedGridComponent } from "@app/dashboard/recommended-management/recommended-grid/recommended-grid.component";
import { RecommendedManagementService } from "@app/dashboard/recommended-management/recommended-management.service";
import { WjGridFilterModule } from "wijmo/wijmo.angular2.grid.filter";
import { WjGridModule } from "wijmo/wijmo.angular2.grid";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    RecommendedAddComponent,
    RecommendedGridComponent,
    RecommendedManagementComponent,
    RecommendedViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RecommendedManagementRoutingModule,
    WjGridFilterModule,
    WjGridModule
  ],
  providers: [RecommendedManagementService]
})
export class RecommendedManagementModule {}

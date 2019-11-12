import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CouponManagementRoutingModule } from "./coupon-management-routing.module";
import { CouponManagementComponent } from "./coupon-management.component";
import { CouponAddComponent } from "./coupon-add/coupon-add.component";
import { CouponUpdateComponent } from "./coupon-update/coupon-update.component";
import { CouponViewComponent } from "./coupon-view/coupon-view.component";
import { CouponGridComponent } from "./coupon-grid/coupon-grid.component";
import { CouponManagementService } from "@app/dashboard/coupon-management/coupon-management.service";
import { WjGridModule } from "wijmo/wijmo.angular2.grid";
import { WjGridFilterModule } from "wijmo/wijmo.angular2.grid.filter";
import { QRCodeModule } from "angularx-qrcode";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { WjInputModule } from "wijmo/wijmo.angular2.input";

@NgModule({
  declarations: [
    CouponManagementComponent,
    CouponAddComponent,
    CouponUpdateComponent,
    CouponViewComponent,
    CouponGridComponent
  ],
  imports: [
    CommonModule,
    CouponManagementRoutingModule,
    FormsModule,
    QRCodeModule,
    ReactiveFormsModule,
    WjGridModule,
    WjGridFilterModule,
    WjInputModule
  ],
  providers: [CouponManagementService]
})
export class CouponManagementModule {}

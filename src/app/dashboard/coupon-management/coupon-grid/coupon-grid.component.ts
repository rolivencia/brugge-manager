import { Component, OnInit } from "@angular/core";
import { CollectionView } from "wijmo/wijmo";
import { CouponManagementService } from "@app/dashboard/coupon-management/coupon-management.service";

@Component({
  selector: "app-coupon-grid",
  templateUrl: "./coupon-grid.component.html",
  styleUrls: [
    "./coupon-grid.component.scss",
    "../coupon-management.component.scss"
  ]
})
export class CouponGridComponent implements OnInit {

  columns: any[] = [
    { header: "ID", binding: "id", width: 50 },
    { header: "Título", binding: "title", width: "*" },
    { header: "Comienza", binding: "startsAt", width: 140 },
    { header: "Termina", binding: "endsAt", width: 140 },
    { header: "Código", binding: "code", width: "*" }
  ];

  gridCollection: CollectionView;

  constructor(public couponManagementService: CouponManagementService) {}

  ngOnInit() {
    this.getGridData();
  }

  getGridData() {
    const couponData = this.couponManagementService.getCoupons();
    this.gridCollection = new CollectionView(couponData);
  }

  getCouponDetails(currentItem) {
    this.couponManagementService.selectedCoupon = this.couponManagementService.getCouponById(currentItem.id);
  }
}

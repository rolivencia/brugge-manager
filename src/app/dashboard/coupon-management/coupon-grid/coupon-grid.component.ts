import { Component, OnInit } from "@angular/core";
import { CollectionView } from "wijmo/wijmo";
import { CouponManagementService } from "@app/dashboard/coupon-management/coupon-management.service";
import { CouponService } from "@app/_services/coupon.service";

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
    { header: "ID", binding: "id", width: 50, id: "id" },
    { header: "Título", binding: "title", width: "*", id: "title" },
    // { header: "Comienza", binding: "startsAt", width: 140, id: "startsAt" },
    { header: "Termina", binding: "endsAt", width: 180, id: "endsAt" },
    { header: "Código", binding: "code", width: "*", id: "code" }
  ];

  gridCollection: CollectionView;

  constructor(
    public couponManagementService: CouponManagementService,
    private couponService: CouponService
  ) {}

  ngOnInit() {
    this.getGridData();
  }

  getGridData() {
    this.couponService.getAll().subscribe(coupons => {
      this.couponManagementService.coupons = coupons;
      this.gridCollection = new CollectionView(coupons);
    });
  }

  getCouponDetails(currentItem) {
    this.couponManagementService.selectedCoupon = this.couponManagementService.getCouponById(
      currentItem.id
    );
  }
}

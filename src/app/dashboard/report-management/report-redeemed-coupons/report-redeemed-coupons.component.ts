import { Component, OnInit } from "@angular/core";
import { ReportRoutingPanelService } from "@app/dashboard/report-management/report-routing-panel/report-routing-panel.service";
import { CollectionView } from "wijmo/wijmo";
import { CouponService } from "@app/_services/coupon.service";
import { Moment } from "moment";
import { ReportRedeemedCouponsService } from "@app/dashboard/report-management/report-redeemed-coupons/report-redeemed-coupons.service";
import * as moment from "moment";

@Component({
  selector: "app-report-redeemed-coupons",
  templateUrl: "./report-redeemed-coupons.component.html",
  styleUrls: ["./report-redeemed-coupons.component.scss"]
})
export class ReportRedeemedCouponsComponent implements OnInit {
  columns = [
    { header: "Cupón", binding: "coupon.title", width: "*", id: "coupon" },
    {
      header: "Tipo",
      binding: "coupon.type.description",
      width: 140,
      id: "type"
    },
    {
      header: "Cliente",
      binding: "customer.fullName",
      width: 250,
      id: "customer"
    },
    {
      header: "Fecha de Canje",
      binding: "createdAt",
      width: 250,
      id: "createdAt"
    }
  ];

  dateFrom: Moment = moment();
  dateTo: Moment = moment();

  constructor(
    public couponService: CouponService,
    public reportRedeemedCouponsService: ReportRedeemedCouponsService,
    public reportRoutingPanelService: ReportRoutingPanelService
  ) {}

  ngOnInit() {
    this.getGridData();
  }

  getGridData() {
    this.couponService
      .getRedeemedInterval(this.dateFrom, this.dateTo)
      .subscribe(redeemed => {
        console.log(redeemed);
        this.reportRedeemedCouponsService.redeemed = redeemed;
        this.reportRedeemedCouponsService.gridCollection = new CollectionView(
          redeemed
        );
        this.reportRedeemedCouponsService.gridCollection.currentItem = null;
      });
  }
}

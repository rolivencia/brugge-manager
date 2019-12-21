import * as moment from "moment";
import { Component, OnInit } from "@angular/core";
import { CollectionView } from "wijmo/wijmo";
import { CouponService } from "@app/_services/coupon.service";
import { ReportRedeemedCouponsService } from "@app/dashboard/report-management/report-redeemed-coupons/report-redeemed-coupons.service";
import { ReportRoutingPanelService } from "@app/dashboard/report-management/report-routing-panel/report-routing-panel.service";
import { first } from "rxjs/operators";
import { LayoutService } from "@app/_services/layout.service";

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
      header: "Fecha y Hora de Canje",
      binding: "createdAt",
      width: 250,
      id: "createdAt"
    }
  ];

  // Sólo usados para almacenar valores de los date input.
  dateFrom: Date = new Date();
  dateTo: Date = new Date();

  // Variable semáforo, para evitar múltiples llamadas para traer reporte de canjes.
  loadingGrid: boolean = false;

  constructor(
    public couponService: CouponService,
    public layoutService: LayoutService,
    public reportRedeemedCouponsService: ReportRedeemedCouponsService,
    public reportRoutingPanelService: ReportRoutingPanelService
  ) {}

  ngOnInit() {
    this.getGridData();
  }

  getGridData() {
    if (!this.loadingGrid) {
      this.loadingGrid = true;
      this.couponService
        .getRedeemedInterval(moment(this.dateFrom), moment(this.dateTo))
        .pipe(first())
        .subscribe(redeemed => {
          console.log(redeemed);
          this.loadingGrid = false;
          this.reportRedeemedCouponsService.redeemed = redeemed;
          this.reportRedeemedCouponsService.gridCollection = new CollectionView(
            redeemed
          );
          this.reportRedeemedCouponsService.gridCollection.currentItem = null;
        });
    }
  }
}

import * as moment from "moment";
import { Component, OnInit, ViewChild } from "@angular/core";
import { CollectionView, SortDescription } from "wijmo/wijmo";
import { CouponService } from "@app/_services/coupon.service";
import { ReportRedeemedCouponsService } from "@app/dashboard/report-management/report-redeemed-coupons/report-redeemed-coupons.service";
import { ReportRoutingPanelService } from "@app/dashboard/report-management/report-routing-panel/report-routing-panel.service";
import { first } from "rxjs/operators";
import { LayoutService } from "@app/_services/layout.service";
import { WjFlexGrid } from "wijmo/wijmo.angular2.grid";
import * as wjcGridXlsx from "wijmo/wijmo.grid.xlsx";
import * as JSZip from "jszip";

@Component({
  selector: "app-report-redeemed-coupons",
  templateUrl: "./report-redeemed-coupons.component.html",
  styleUrls: ["./report-redeemed-coupons.component.scss"]
})
export class ReportRedeemedCouponsComponent implements OnInit {
  @ViewChild("redeemedCouponsReportGrid", { static: false })
  redeemedCouponsReportGrid: WjFlexGrid;

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

          const sortByDateTime = new SortDescription("createdAt", true);
          this.reportRedeemedCouponsService.gridCollection.sortDescriptions.push(
            sortByDateTime
          );
          this.reportRedeemedCouponsService.gridCollection.currentItem = null;
        });
    }
  }

  exportToXls() {
    const dateFrom = moment(this.dateFrom).format("YYYY-MM-DD");
    const dateTo = moment(this.dateTo).format("YYYY-MM-DD");
    const compareDates = moment(this.dateFrom).isSame(this.dateTo);
    const exportName = compareDates
      ? `Canjes de cupones ${dateFrom}`
      : `Canjes de cupones ${dateFrom} - ${dateTo}`;

    wjcGridXlsx.FlexGridXlsxConverter.save(
      this.redeemedCouponsReportGrid,
      { includeColumnHeaders: true, includeCellStyles: false },
      exportName
    );
  }
}

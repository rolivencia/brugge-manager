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

@Component({
  selector: "app-report-redeemed-coupons",
  templateUrl: "./report-redeemed-coupons.component.html",
  styleUrls: ["./report-redeemed-coupons.component.scss"]
})
export class ReportRedeemedCouponsComponent implements OnInit {
  @ViewChild("redeemedCouponsReportGrid", { static: false })
  redeemedCouponsReportGrid: WjFlexGrid;
  @ViewChild("groupedRedeemedCouponsGrid", { static: false })
  groupedRedeemedCouponsGrid: WjFlexGrid;

  columns = [
    { header: "Cupón", binding: "coupon.title", width: "*", id: "coupon" },
    {
      header: "Tipo",
      binding: "coupon.type.description",
      width: 140,
      visible: true,
      id: "type"
    },
    {
      header: "Cliente",
      binding: "customer.fullName",
      width: 250,
      visible: true,
      id: "customer"
    },
    {
      header: "Jornada",
      binding: "workday",
      width: 0,
      visible: false,
      id: "workday"
    },
    {
      header: "Fecha",
      binding: "date",
      width: 100,
      visible: true,
      id: "date"
    },
    {
      header: "Hora",
      binding: "time",
      width: 80,
      visible: true,
      id: "time"
    }
  ];

  groupedColumns = [
    { header: "Cupón", binding: "title", width: "*", id: "title" },
    {
      header: "Descripción",
      binding: "description",
      width: 500,
      visible: true,
      id: "description"
    },
    {
      header: "Canje diario",
      binding: "dailyCoupon",
      width: 120,
      visible: true,
      id: "dailyCoupon"
    },
    {
      header: "Tipo",
      binding: "type.description",
      width: 120,
      visible: true,
      id: "type"
    },
    {
      header: "Nro. Canjes",
      binding: "count",
      width: 120,
      id: "count"
    }
  ];

  groupedRedemptions = new CollectionView();

  // Sólo usados para almacenar valores de los date input.
  dateFrom: Date = moment()
    .subtract(1, "day")
    .toDate();
  dateTo: Date = moment()
    .subtract(1, "day")
    .toDate();

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
          this.loadingGrid = false;
          this.reportRedeemedCouponsService.redeemed = redeemed;
          this.groupedRedemptions = new CollectionView(
            this.groupByCouponId(redeemed)
          );
          this.reportRedeemedCouponsService.gridCollection = new CollectionView(
            redeemed,
            { groupDescriptions: ["workday"] }
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

  groupByCouponId(redeemed: any[]): any[] {
    // Obtengo el set de cupones activos dentro del conjunto de las redenciones
    const parsed = [];
    const coupons = [];

    // Separo en un conjunto los cupones existentes, sin repetir
    for (const redemption of redeemed) {
      if (!parsed.includes(redemption.coupon.id)) {
        coupons.push({ ...redemption.coupon, redemptions: [] });
        parsed.push(redemption.coupon.id);
      }
    }

    // Navego la lista de redenciones para asignar redenciones a cada cupón agrupadamente
    for (const redemption of redeemed) {
      for (const coupon of coupons) {
        if (coupon.id === redemption.coupon.id) {
          coupon.redemptions.push(redemption.coupon);
        }
      }
    }

    return coupons.map(coupon => ({
      ...coupon,
      dailyCoupon: coupon.dailyCoupon ? "Sí" : "No",
      count: coupon.redemptions.length
    }));
  }
}

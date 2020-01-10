import * as moment from "moment";
import * as wjcGridXlsx from "wijmo/wijmo.grid.xlsx";
import { CollectionView, SortDescription } from "wijmo/wijmo";
import { Component, OnInit, ViewChild } from "@angular/core";
import { CouponService } from "@app/_services/coupon.service";
import { Customer } from "@app/_models";
import { CustomerManagementService } from "@app/dashboard/customer-management/customer-management.service";
import { CustomerService } from "@app/_services/customer.service";
import { first, flatMap, tap } from "rxjs/operators";
import { LayoutService } from "@app/_services/layout.service";
import { WjFlexGrid } from "wijmo/wijmo.angular2.grid";

@Component({
  selector: "app-customer-grid",
  templateUrl: "./customer-grid.component.html",
  styleUrls: [
    "./customer-grid.component.scss",
    "../customer-management.component.scss"
  ]
})
export class CustomerGridComponent implements OnInit {
  public customersCollection: CollectionView = new CollectionView();
  @ViewChild("customerGrid", { static: false })
  customerGrid: WjFlexGrid;

  columns: any[] = [
    { header: "Nombre", binding: "firstName", width: 160, id: "firstName" },
    { header: "Apellido", binding: "lastName", width: 160, id: "firstName" },
    { header: "Teléfono", binding: "email", width: 130, id: "email" },
    {
      header: "Fecha de Alta",
      binding: "audit.createdAt",
      width: "*",
      id: "createdAt"
    }
  ];

  constructor(
    private couponService: CouponService,
    private customerService: CustomerService,
    private customerManagementService: CustomerManagementService,
    public layoutService: LayoutService
  ) {}

  ngOnInit() {
    this.getGridData();
  }

  getGridData() {
    const customersO = this.customerService.getAll();

    customersO.subscribe(customersData => {
      this.customersCollection = new CollectionView(
        customersData.map(customer => ({
          ...customer,
          audit: {
            ...customer.audit,
            createdAt: moment(customer.audit.createdAt).format(
              "YYYY/MM/DD - HH:mm"
            )
          }
        }))
      );
      const sortByDateTime = new SortDescription("audit.createdAt", false);
      this.customersCollection.sortDescriptions.push(sortByDateTime);
      this.customersCollection.currentItem = null;
    });
  }

  getCustomerDetails(currentItem) {
    const customerO = this.customerService
      .getById(currentItem.id)
      .pipe(first())
      .pipe(
        tap(customerData => {
          this.customerManagementService.selectedCustomer = new Customer(
            customerData
          );
        })
      );

    const redeemedCouponsO = this.couponService
      .getRedeemed(currentItem.id)
      .pipe(first())
      .pipe(
        tap(redeemedCoupons => {
          this.customerManagementService.redeemedCoupons = redeemedCoupons.map(
            redemption => ({
              title: redemption.coupon.title,
              redeemedAt: moment(redemption.createdAt).format(
                "YYYY/MM/DD - HH:mm"
              )
            })
          );
        })
      );

    customerO.pipe(flatMap(() => redeemedCouponsO)).subscribe(response => {
      console.log(response);
    });
  }

  exportToXls() {
    wjcGridXlsx.FlexGridXlsxConverter.save(
      this.customerGrid,
      { includeColumnHeaders: true, includeCellStyles: false },
      "BRUGGE - Listado de clientes registrados"
    );
  }
}

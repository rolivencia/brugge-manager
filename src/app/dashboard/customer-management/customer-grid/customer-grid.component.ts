import * as moment from "moment";
import { CollectionView } from "wijmo/wijmo";
import { Component, OnInit } from "@angular/core";
import { CouponService } from "@app/_services/coupon.service";
import { Customer } from "@app/_models";
import { CustomerManagementService } from "@app/dashboard/customer-management/customer-management.service";
import { CustomerService } from "@app/_services/customer.service";
import { first, flatMap, tap } from "rxjs/operators";

@Component({
  selector: "app-customer-grid",
  templateUrl: "./customer-grid.component.html",
  styleUrls: [
    "./customer-grid.component.scss",
    "../customer-management.component.scss"
  ]
})
export class CustomerGridComponent implements OnInit {
  public customersCollection: CollectionView;

  columns: any[] = [
    { header: "Nombre", binding: "firstName", width: 160 },
    { header: "Apellido", binding: "lastName", width: 160 },
    { header: "Teléfono", binding: "email", width: "*" }
  ];

  constructor(
    private couponService: CouponService,
    private customerService: CustomerService,
    private customerManagementService: CustomerManagementService
  ) {}

  ngOnInit() {
    this.getGridData();
  }

  getGridData() {
    this.customerService
      .getAll()
      .pipe(first())
      .subscribe(customersData => {
        this.customersCollection = new CollectionView(customersData);
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
                "DD/MM/YYYY - HH:mm"
              )
            })
          );
        })
      );

    customerO.pipe(flatMap(() => redeemedCouponsO)).subscribe(response => {
      console.log(response);
    });
  }

  /**
   * Ajusta la altura de la grid en base al tamaño del layout de fondo, sin contar el headerbar
   */
  adjustGridHeight() {
    const layoutContainer: HTMLElement = document.getElementById(
      "inner-container"
    );
    const headerContainerElement: HTMLElement = document.getElementById(
      "grid-container-header"
    );
    const gridElement: HTMLElement = document.getElementById("customer-grid");
    const padding = 20; // in pixels

    gridElement.style.height =
      layoutContainer.offsetHeight -
      2 * padding -
      headerContainerElement.offsetHeight +
      "px";
  }
}

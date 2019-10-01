import { Component, OnInit } from "@angular/core";
import { CustomerService } from "@app/_services/customer.service";
import { CollectionView } from "wijmo/wijmo";
import { CustomerManagementService } from "@app/dashboard/customer-management/customer-management.service";
import { first } from "rxjs/operators";
import { Customer } from "@app/_models";

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
    { header: "Nombre", binding: "firstName", width: 130 },
    { header: "Apellido", binding: "lastName", width: 130 },
    { header: "Email", binding: "email", width: "*" },
    { header: "Firebase ID", binding: "uidFirebase", width: 170 }
  ];

  constructor(
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
    this.customerService
      .getById(currentItem.id)
      .pipe(first())
      .subscribe(customerData => {
        this.customerManagementService.selectedCustomer = new Customer(
          customerData
        );
      });
  }
}

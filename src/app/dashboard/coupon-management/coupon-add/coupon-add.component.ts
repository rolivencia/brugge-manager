import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { CouponManagementService } from "@app/dashboard/coupon-management/coupon-management.service";
import { AuthenticationService, UserService } from "@app/_services";
import * as wjcCore from "wijmo/wijmo";

@Component({
  selector: "app-coupon-add",
  templateUrl: "./coupon-add.component.html",
  styleUrls: [
    "./coupon-add.component.scss",
    "../coupon-management.component.scss"
  ],
  encapsulation: ViewEncapsulation.None
})
export class CouponAddComponent implements OnInit {

  currentUser;
  qrCode: string = "";

  constructor(public couponManagementService: CouponManagementService, public authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = `${x.firstName} ${x.lastName} (${x.userName})`)
    );
  }

  ngOnInit() {
    this.authenticationService
      .getKeys("wijmo")
      .subscribe(
        Key => wjcCore.setLicenseKey(Key)
      );
    this.qrCode = this.couponManagementService.generateQrCode();
  }
}

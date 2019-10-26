import { Component, OnInit, ViewChild } from "@angular/core";
import { ZXingScannerComponent } from "@zxing/ngx-scanner";

@Component({
  selector: "app-redeem-coupon",
  templateUrl: "./redeem-coupon.component.html",
  styleUrls: ["./redeem-coupon.component.scss"]
})
export class RedeemCouponComponent implements OnInit {
  @ViewChild("scanner", { static: false }) scanner: ZXingScannerComponent;

  constructor() {}

  ngOnInit() {
    console.log(this.scanner);
    this.loadScanner();
  }

  loadScanner() {
    if (this.scanner && this.scanner.hasDevices) {
      console.log("I have devices!");
    }
  }
}

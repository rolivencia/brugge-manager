import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { ZXingScannerComponent } from "@zxing/ngx-scanner";
import { Coupon, Customer } from "@app/_models";

@Component({
  selector: "app-redeem-coupon",
  templateUrl: "./redeem-coupon.component.html",
  styleUrls: ["./redeem-coupon.component.scss"]
})
export class RedeemCouponComponent implements OnInit, AfterViewInit {
  @ViewChild("scanner", { static: false }) scanner: ZXingScannerComponent;

  scannedCode: QrObject = null;
  customer: Customer;
  coupon: Coupon;

  alreadyRedeemed: boolean = false;
  alreadyExpired: boolean = false;
  notValid: boolean = false;

  couponStatus: any;

  constructor() {}

  ngOnInit() {
    console.log(this.scanner);
  }

  ngAfterViewInit() {
    this.loadScanner();
  }

  loadScanner() {
    if (this.scanner && this.scanner.hasDevices) {
    }
  }

  scanSuccessHandler(event) {
    this.scannedCode = JSON.parse(event);
    if (typeof this.scannedCode !== "object") {
      alert("Código QR no válido para esta operación");
      this.notValid = true;
    } else {
      this.customer = this.scannedCode.customer;
      this.coupon = this.scannedCode.coupon;
    }
  }

  redeemCoupon() {}

  cleanScannedCode() {
    this.scannedCode = null;
    this.customer = null;
    this.coupon = null;

    this.alreadyRedeemed = false;
    this.alreadyExpired = false;
    this.notValid = false;
  }
}

export class QrObject {
  public customer: Customer;
  public coupon: Coupon;
}

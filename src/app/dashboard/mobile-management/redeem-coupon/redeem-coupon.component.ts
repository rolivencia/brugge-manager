import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { ZXingScannerComponent } from "@zxing/ngx-scanner";

@Component({
  selector: "app-redeem-coupon",
  templateUrl: "./redeem-coupon.component.html",
  styleUrls: ["./redeem-coupon.component.scss"]
})
export class RedeemCouponComponent implements OnInit, AfterViewInit {
  @ViewChild("scanner", { static: false }) scanner: ZXingScannerComponent;

  scannedCode: string;

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
    this.scannedCode = event;
  }
}

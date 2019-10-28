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

  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;

  hasDevices: boolean;
  hasPermission: boolean;
  tryHarder = true;

  scannedCode: QrObject = null;
  customer: Customer;
  coupon: Coupon;

  alreadyRedeemed: boolean = false;
  alreadyExpired: boolean = false;
  notValid: boolean = false;

  couponStatusRetrieved: any = false;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.scanner.askForPermission();
  }

  onScanSuccess(event) {
    this.notValid = !this.isValidJson(event);

    if (!this.notValid) {
      const code = JSON.parse(event);
      this.customer = code.customer;
      this.coupon = code.coupon;

      if (!this.customer || !this.coupon) {
        this.notValid = true;
      }
    } else {
      this.couponStatusRetrieved = true;
      this.scannedCode = event;
    }
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    alert(devices.toString());
    this.hasDevices = Boolean(devices && devices.length);
  }

  onDeviceSelectChange(selected: string) {
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || null;
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  redeemCoupon() {}

  cleanScannedCode() {
    this.scannedCode = null;
    this.customer = null;
    this.coupon = null;

    this.couponStatusRetrieved = false;
    this.alreadyRedeemed = false;
    this.alreadyExpired = false;
    this.notValid = false;
  }

  isValidJson(text) {
    return /^[\],:{}\s]*$/.test(
      text
        .replace(/\\["\\\/bfnrtu]/g, "@")
        .replace(
          /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
          "]"
        )
        .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
    );
  }
}

export class QrObject {
  public customer: Customer;
  public coupon: Coupon;
}

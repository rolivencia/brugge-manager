import { Component, OnInit, ViewChild } from "@angular/core";
import { ZXingScannerComponent } from "@zxing/ngx-scanner";
import { Coupon, Customer } from "@app/_models";
import { GlobalService } from "@app/_services/global.service";
import { CouponService } from "@app/_services/coupon.service";
import { CustomerService } from "@app/_services/customer.service";
import { forkJoin, Observable, zip } from "rxjs";

@Component({
  selector: "app-redeem-coupon",
  templateUrl: "./redeem-coupon.component.html",
  styleUrls: ["./redeem-coupon.component.scss"]
})
export class RedeemCouponComponent implements OnInit {
  @ViewChild("scanner", { static: false }) scanner: ZXingScannerComponent;

  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;

  hasDevices: boolean;
  hasPermission: boolean;
  tryHarder = false;

  scannedCode: QrObject = null;
  customer: Customer;
  coupon: Coupon;

  alreadyRedeemed: boolean = false;
  alreadyExpired: boolean = false;
  notValid: boolean = false;

  couponStatusRetrieved: any = false;

  optionsVisible = false;

  constructor(
    public couponService: CouponService,
    public customerService: CustomerService,
    public globalService: GlobalService
  ) {}

  ngOnInit() {}

  onScanSuccess(event) {
    this.notValid = !this.globalService.isValidJson(event);

    if (!this.notValid) {
      const code = JSON.parse(event);
      this.customer = code.customer;
      this.coupon = code.coupon;

      if (!this.customer || !this.coupon) {
        this.notValid = true;
      }
    } else {
      this.couponStatusRetrieved = true;
      const codeData = this.globalService.parseCode(event);
      const subscription = this.couponService.getCouponStatus(
        codeData.idCoupon,
        codeData.idCoupon
      );
    }
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
    if (this.availableDevices.length) {
      this.currentDevice = this.availableDevices[0];
    }
  }

  onDeviceSelectChange(selected: string) {
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || null;
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  askForPermissions() {
    this.scanner.askForPermission();
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

  toggleOptions() {
    this.optionsVisible = !this.optionsVisible;
  }
}

export class QrObject {
  public idCustomer: Customer;
  public idCoupon: Coupon;
}

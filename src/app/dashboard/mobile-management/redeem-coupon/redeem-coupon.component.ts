import { Component, OnInit, ViewChild } from "@angular/core";
import { ZXingScannerComponent } from "@zxing/ngx-scanner";
import { Coupon, Customer } from "@app/_models";
import { GlobalService } from "@app/_services/global.service";
import { CouponService } from "@app/_services/coupon.service";
import { CustomerService } from "@app/_services/customer.service";

@Component({
  selector: "app-redeem-coupon",
  templateUrl: "./redeem-coupon.component.html",
  styleUrls: ["./redeem-coupon.component.scss"]
})
export class RedeemCouponComponent implements OnInit {
  @ViewChild("scanner", { static: false }) scanner: ZXingScannerComponent;

  readMode: string = "qr";

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
  couponStatus: any = null;

  optionsVisible = false;

  constructor(
    public couponService: CouponService,
    public customerService: CustomerService,
    public globalService: GlobalService
  ) {}

  ngOnInit() {}

  onScanSuccess(event) {
    alert("Scanned!: " + event);
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
      alert(
        JSON.stringify({
          coupon: codeData.idCoupon,
          customer: codeData.idCustomer
        })
      );

      const subscription = this.couponService
        .getCouponStatus(codeData.idCoupon, codeData.idCustomer)
        .subscribe(response => {
          console.log(response);
        });
    }
  }

  onScanTest() {
    const codeData = { idCoupon: 14, idCustomer: 7 };
    const subscription = this.couponService
      .getCouponStatus(codeData.idCoupon, codeData.idCustomer)
      .subscribe(response => {
        this.couponStatusRetrieved = true;
        this.coupon = response["coupon"];
        this.customer = response["customer"];
        this.couponStatus = response["status"];

        switch (this.couponStatus.status) {
          case "redeemed":
            this.alreadyExpired = false;
            this.alreadyRedeemed = true;
            break;
          case "expired":
            this.alreadyExpired = true;
            this.alreadyRedeemed = false;
            break;
          case "can-redeem":
            this.alreadyExpired = false;
            this.alreadyRedeemed = false;
            this.notValid = false;
            break;
          default:
            this.alreadyExpired = false;
            this.alreadyRedeemed = false;
            this.notValid = true;
            break;
        }
      });
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

  redeemCoupon() {
    this.couponService.redeem().subscribe(response => {
      console.log(response);
    });
  }

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

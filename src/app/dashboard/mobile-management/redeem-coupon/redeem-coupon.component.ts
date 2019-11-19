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
  debugMode: boolean = false;

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
  redeemingInProcess: boolean = false;
  redemptionStatus = { status: "", message: "" };

  scannerIsActive: boolean = false;

  constructor(
    public couponService: CouponService,
    public customerService: CustomerService,
    public globalService: GlobalService
  ) {}

  ngOnInit() {}

  beginScanning() {
    this.scannerIsActive = true;
  }

  onScanSuccess(event) {
    this.cleanScannedCode();
    if (this.debugMode) {
      alert("Is valid?: " + this.globalService.isValidJson(event));
    }

    this.notValid = !this.globalService.isValidJson(event);

    // In case it is a valid JSON object
    if (!this.notValid) {
      const codeData = this.globalService.parseCode(event);

      if (this.debugMode) {
        alert(codeData);
      }

      if (codeData.idCoupon && codeData.idCustomer) {
        if (this.debugMode) {
          alert("Passed!");
        }

        const subscription = this.couponService
          .getCouponStatus(codeData.idCoupon, codeData.idCustomer)
          .subscribe(response => {
            this.couponStatusRetrieved = true;
            this.coupon = response["coupon"];
            this.customer = response["customer"];
            this.couponStatus = response["status"];
            this.pickStatusMessage(this.couponStatus);

            if (this.debugMode) {
              alert(
                JSON.stringify({
                  expired: this.alreadyExpired,
                  redeemed: this.alreadyRedeemed,
                  valid: this.notValid
                })
              );
            }

            // TODO: Arreglar y hacer programático. Mover a alertService.
            if (
              this.couponStatus.status === "error" ||
              this.couponStatus.status === "expired" ||
              this.couponStatus.status === "redeemed" ||
              this.notValid === true
            ) {
              document.getElementById("main-container").style.backgroundColor =
                "red";
            }

            this.scannerIsActive = false;
          });
      } else {
        this.notValid = true;
        this.alreadyExpired = false;
        this.alreadyRedeemed = false;
      }
    } else {
      this.notValid = true;
      this.alreadyExpired = false;
      this.alreadyRedeemed = false;
    }
  }

  pickStatusMessage(couponStatus) {
    switch (this.couponStatus.status) {
      case "redeemed":
        this.alreadyExpired = false;
        this.alreadyRedeemed = true;
        this.notValid = false;
        break;
      case "expired":
        this.alreadyExpired = true;
        this.alreadyRedeemed = false;
        this.notValid = false;
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
  }

  onScanTest() {
    this.cleanScannedCode();
    const codeData = { idCoupon: 7, idCustomer: 7 };
    const subscription = this.couponService
      .getCouponStatus(codeData.idCoupon, codeData.idCustomer)
      .subscribe(response => {
        this.couponStatusRetrieved = true;
        this.coupon = response["coupon"];
        this.customer = response["customer"];
        this.couponStatus = response["status"];

        this.pickStatusMessage(this.couponStatus);
        if (
          this.couponStatus.status === "error" ||
          this.couponStatus.status === "expired"
        ) {
          document.getElementById("main-container").style.backgroundColor =
            "red";
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

  redeemCoupon(idCoupon: number, idCustomer: number) {
    this.redeemingInProcess = true;
    this.couponService.redeem(idCoupon, idCustomer).subscribe(response => {
      this.redeemingInProcess = false;

      this.redemptionStatus = {
        message: response.message,
        status: response.status
      };

      // TODO: Arreglar y hacer programático. Mover a alertService.
      if (this.redemptionStatus.status === "error") {
        document.getElementById("main-container").style.backgroundColor = "red";
      } else if (this.redemptionStatus.status === "success") {
        document.getElementById("main-container").style.backgroundColor =
          "green";
      }
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
    // TODO: Arreglar y hacer programático. Mover a alertService.
    document.getElementById("main-container").style.backgroundColor = "#7b6655";

    this.redemptionStatus = { status: "", message: "" };
  }

  toggleOptions() {
    this.optionsVisible = !this.optionsVisible;
  }
}

export class QrObject {
  public idCustomer: Customer;
  public idCoupon: Coupon;
}

import { Component, OnInit, ViewChild } from "@angular/core";
import { ZXingScannerComponent } from "@zxing/ngx-scanner";
import { GlobalService } from "@app/_services/global.service";
import { CouponService } from "@app/_services/coupon.service";
import { RedeemCouponService } from "@app/dashboard/mobile-management/redeem-coupon/redeem-coupon.service";

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

  optionsVisible = false;

  scannerIsActive: boolean = false;

  constructor(
    public couponService: CouponService,
    public globalService: GlobalService,
    public redeemCouponService: RedeemCouponService
  ) {}

  ngOnInit() {}

  beginScanning() {
    this.scannerIsActive = true;
  }

  onScanSuccess(event) {
    this.redeemCouponService.cleanScannedCode();

    this.redeemCouponService.notValid = !this.globalService.isValidJson(event);

    // In case the read code is not a valid JSON object, return
    if (this.redeemCouponService.notValid) {
      this.redeemCouponService.setInvalidStatus();
      return;
    }

    // Assign the read code. If invalid, return
    const codeData = this.globalService.parseCode(event);
    if (!codeData.idCoupon || !codeData.idCustomer) {
      this.redeemCouponService.setInvalidStatus();
      return;
    }

    this.checkCouponStatus(codeData);
  }

  onScanTest() {
    this.redeemCouponService.cleanScannedCode();
    const codeData = { idCoupon: 7, idCustomer: 7 };
    const subscription = this.couponService
      .getCouponStatus(codeData.idCoupon, codeData.idCustomer)
      .subscribe(response => {
        this.redeemCouponService.couponStatusRetrieved = true;
        this.redeemCouponService.coupon = response["coupon"];
        this.redeemCouponService.customer = response["customer"];
        this.redeemCouponService.couponStatus = response["status"];

        this.redeemCouponService.pickStatusMessage(
          this.redeemCouponService.couponStatus
        );
        if (
          this.redeemCouponService.invalidStatuses.includes(
            this.redeemCouponService.couponStatus.status
          )
        ) {
          document.getElementById("main-container").style.backgroundColor =
            "red";
        }
      });
  }

  checkCouponStatus(codeData) {
    this.couponService
      .getCouponStatus(codeData.idCoupon, codeData.idCustomer)
      .subscribe(response => {
        this.redeemCouponService.couponStatusRetrieved = true;
        this.redeemCouponService.coupon = response["coupon"];
        this.redeemCouponService.customer = response["customer"];
        this.redeemCouponService.couponStatus = response["status"];
        this.redeemCouponService.pickStatusMessage(
          this.redeemCouponService.couponStatus
        );

        this.scannerIsActive = false;

        // TODO: Arreglar y hacer programático. Mover a alertService.
        if (
          this.redeemCouponService.invalidStatuses.includes(
            this.redeemCouponService.couponStatus.status
          ) ||
          this.redeemCouponService.notValid === true
        ) {
          document.getElementById("main-container").style.backgroundColor =
            "red";
          return;
        }

        this.redeemCoupon(codeData.idCoupon, codeData.idCustomer);
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
    this.redeemCouponService.redeemingInProcess = true;
    this.couponService.redeem(idCoupon, idCustomer).subscribe(response => {
      this.redeemCouponService.redeemingInProcess = false;

      this.redeemCouponService.redemptionStatus = {
        message: response.message,
        status: response.status
      };

      // TODO: Arreglar y hacer programático. Mover a alertService.
      if (this.redeemCouponService.redemptionStatus.status === "error") {
        document.getElementById("main-container").style.backgroundColor = "red";
      } else if (
        this.redeemCouponService.redemptionStatus.status === "success"
      ) {
        document.getElementById("main-container").style.backgroundColor =
          "green";
      }
    });
  }

  onEnterWithKeyboard() {}

  toggleOptions() {
    this.optionsVisible = !this.optionsVisible;
  }
}

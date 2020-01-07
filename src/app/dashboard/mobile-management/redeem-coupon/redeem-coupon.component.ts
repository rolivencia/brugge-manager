import { Component, OnInit, ViewChild } from "@angular/core";
import { ZXingScannerComponent } from "@zxing/ngx-scanner";
import { GlobalService } from "@app/_services/global.service";
import { CouponService } from "@app/_services/coupon.service";
import { RedeemCouponService } from "@app/dashboard/mobile-management/redeem-coupon/redeem-coupon.service";
import { first } from "rxjs/operators";

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
  enterCodeVisible = false;

  scannerIsActive: boolean = false;

  successAlertVisible: boolean = false;
  errorAlertVisible: boolean = false;

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
      this.redeemCouponService.retrieveStatus();
      return;
    }

    // Assign the read code. If invalid, return
    const codeData = this.globalService.parseCode(event);
    if (!codeData.idCoupon || !codeData.idCustomer) {
      this.redeemCouponService.setInvalidStatus();
      this.redeemCouponService.retrieveStatus();
      return;
    }

    this.checkCouponStatus(codeData);
  }

  onScanTest() {
    this.redeemCouponService.cleanScannedCode();
    const codeData = { idCoupon: 44, idCustomer: 7 };
    this.couponService
      .getCouponStatus(codeData.idCoupon, codeData.idCustomer)
      .pipe(first())
      .subscribe(response => {
        this.redeemCouponService.couponStatusRetrieved = true;
        this.redeemCouponService.coupon = response["coupon"];
        this.redeemCouponService.customer = response["customer"];
        this.redeemCouponService.couponStatus = response["status"];

        this.redeemCouponService.pickStatusMessage(
          this.redeemCouponService.couponStatus
        );

        if (this.redeemCouponService.canRedeem()) {
          this.redeemCoupon(codeData.idCoupon, codeData.idCustomer);
        } else {
          this.redeemCouponService.retrieveStatus(
            this.redeemCouponService.couponStatus
          );
        }
      });
  }

  checkCouponStatus(codeData) {
    this.scannerIsActive = false;
    this.couponService
      .getCouponStatus(codeData.idCoupon, codeData.idCustomer)
      .pipe(first())
      .subscribe(response => {
        this.redeemCouponService.couponStatusRetrieved = true;
        this.redeemCouponService.coupon = response["coupon"];
        this.redeemCouponService.customer = response["customer"];
        this.redeemCouponService.couponStatus = response["status"];

        this.redeemCouponService.pickStatusMessage(
          this.redeemCouponService.couponStatus
        );

        if (this.redeemCouponService.canRedeem()) {
          this.redeemCoupon(codeData.idCoupon, codeData.idCustomer);
        } else {
          this.redeemCouponService.retrieveStatus(
            this.redeemCouponService.couponStatus
          );
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
    this.redeemCouponService.redeemingInProcess = true;
    this.couponService.redeem(idCoupon, idCustomer).subscribe(response => {
      this.redeemCouponService.redeemingInProcess = false;

      this.redeemCouponService.redemptionStatus = {
        message: response.message,
        status: response.status
      };

      this.redeemCouponService.retrieveStatus(
        this.redeemCouponService.redemptionStatus
      );
    });
  }

  onEnterWithKeyboard() {
    this.enterCodeVisible = !this.enterCodeVisible;
  }

  toggleOptions() {
    this.optionsVisible = !this.optionsVisible;
  }
}

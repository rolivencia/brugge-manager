import { Injectable } from "@angular/core";
import { Coupon, Customer } from "@app/_models";

@Injectable({
  providedIn: "root"
})
export class RedeemCouponService {
  public invalidStatuses = [
    "error",
    "expired",
    "redeemed",
    "redeemed-other-daily"
  ];
  public customer: Customer;
  public coupon: Coupon;

  // Coupon possible statuses
  public couponStatus: any = null;
  public alreadyRedeemed: boolean = false;
  public alreadyExpired: boolean = false;
  public notValid: boolean = false;
  public otherDailyRedeemed: boolean = false;

  public couponStatusRetrieved: any = false;

  // Code reader status
  public redeemingInProcess: boolean = false;
  public redemptionStatus = { status: "", message: "" };

  constructor() {}

  pickStatusMessage(couponStatus) {
    switch (couponStatus.status) {
      case "redeemed":
        this.setRedeemedStatus();
        break;
      case "expired":
        this.setExpiredStatus();
        break;
      case "can-redeem":
        this.setRedeemableStatus();
        break;
      case "redeemed-other-daily":
        this.setOtherDailyRedeemedStatus();
        break;
      case "error":
      default:
        this.setInvalidStatus();
        break;
    }
  }

  setRedeemedStatus(showAlert?) {
    this.alreadyExpired = false;
    this.alreadyRedeemed = true;
    this.notValid = false;
    this.otherDailyRedeemed = false;
  }

  setExpiredStatus(showAlert?) {
    this.alreadyExpired = true;
    this.alreadyRedeemed = false;
    this.notValid = false;
    this.otherDailyRedeemed = false;
  }

  setRedeemableStatus(showAlert?) {
    this.alreadyExpired = false;
    this.alreadyRedeemed = false;
    this.notValid = false;
    this.otherDailyRedeemed = false;
  }

  setOtherDailyRedeemedStatus(showAlert?) {
    this.alreadyExpired = false;
    this.alreadyRedeemed = false;
    this.notValid = false;
    this.otherDailyRedeemed = true;
  }

  setInvalidStatus(showAlert?) {
    this.alreadyExpired = false;
    this.alreadyRedeemed = false;
    this.notValid = true;
    this.otherDailyRedeemed = false;
  }

  canRedeem(): boolean {
    return (
      !this.alreadyExpired &&
      !this.alreadyRedeemed &&
      !this.notValid &&
      !this.otherDailyRedeemed
    );
  }

  cleanScannedCode() {
    this.customer = null;
    this.coupon = null;

    this.couponStatusRetrieved = false;
    this.alreadyRedeemed = false;
    this.alreadyExpired = false;
    this.notValid = false;
    this.otherDailyRedeemed = false;
    // TODO: Arreglar y hacer programático. Mover a alertService.
    document.getElementById("main-container").style.backgroundColor = "#7b6655";

    this.redemptionStatus = { status: "", message: "" };
  }

  retrieveStatus(redemptionStatus?) {
    let canRedeem = false;
    if (
      (redemptionStatus &&
        this.invalidStatuses.includes(redemptionStatus.status)) ||
      this.notValid === true
    ) {
      document.getElementById("alert-error").style.visibility = "initial";
    } else if (redemptionStatus.status === "success") {
      document.getElementById("alert-success").style.visibility = "initial";

      canRedeem = true;
    }

    setTimeout(function() {
      document.getElementById("alert-error").style.visibility = "hidden";
      document.getElementById("alert-success").style.visibility = "hidden";
    }, 5000);

    return canRedeem;
  }
}

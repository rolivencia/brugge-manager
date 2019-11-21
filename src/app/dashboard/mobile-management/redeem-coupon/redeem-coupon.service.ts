import { Injectable } from "@angular/core";
import { Coupon, Customer } from "@app/_models";

@Injectable({
  providedIn: "root"
})
export class RedeemCouponService {
  public invalidStatuses = ["error", "expired", "redeemed"];
  public customer: Customer;
  public coupon: Coupon;

  // Coupon possible statuses
  public couponStatus: any = null;
  public alreadyRedeemed: boolean = false;
  public alreadyExpired: boolean = false;
  public notValid: boolean = false;

  public couponStatusRetrieved: any = false;

  // Code reader status
  public redeemingInProcess: boolean = false;
  public redemptionStatus = { status: "", message: "" };

  constructor() {}

  pickStatusMessage(couponStatus) {
    switch (couponStatus) {
      case "redeemed":
        this.setRedeemedStatus();
        break;
      case "expired":
        this.setExpiredStatus();
        break;
      case "can-redeem":
        this.setRedeemableStatus();
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
  }

  setExpiredStatus(showAlert?) {
    this.alreadyExpired = true;
    this.alreadyRedeemed = false;
    this.notValid = false;
  }

  setRedeemableStatus(showAlert?) {
    this.alreadyExpired = false;
    this.alreadyRedeemed = false;
    this.notValid = false;
  }

  setInvalidStatus(showAlert?) {
    this.alreadyExpired = false;
    this.alreadyRedeemed = false;
    this.notValid = true;
  }

  cleanScannedCode() {
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

  retrieveStatus(redemptionStatus) {
    let canRedeem = false;
    if (
      this.invalidStatuses.includes(redemptionStatus.status) ||
      this.notValid === true
    ) {
      document.getElementById("main-container").style.backgroundColor = "red";
    } else if (redemptionStatus.status === "success") {
      document.getElementById("main-container").style.backgroundColor = "green";
      canRedeem = true;
    }
    return canRedeem;
  }
}

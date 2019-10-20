import { Injectable } from "@angular/core";
import { Coupon } from "@app/_models";
import { ActivatedRoute, Router } from "@angular/router";
import { CouponService } from "@app/_services/coupon.service";

@Injectable({
  providedIn: "root"
})
export class CouponManagementService {
  showTopOutlet: boolean = false;
  showLeftOutlet: boolean = true;
  showRightOutlet: boolean = true;

  selectedCoupon: Coupon = null;
  newCoupon: Coupon = null;

  private _coupons: Coupon[] = [];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public couponService: CouponService
  ) {}

  get coupons(): Coupon[] {
    return this._coupons;
  }

  set coupons(value: Coupon[]) {
    this._coupons = value;
  }

  public toggleAdd() {
    this.showTopOutlet = true;
    this.showLeftOutlet = false;
    this.showRightOutlet = false;

    // this.router.navigate(['/dashboard/coupons/add']);
  }

  public add() {}

  public showGrid() {
    this.showTopOutlet = false;
    this.showLeftOutlet = true;
    this.showRightOutlet = true;
  }

  public getCouponById(id: number): Coupon {
    return this._coupons.filter(coupon => coupon.id === id).pop();
  }

  //TODO: Implement method - It should clone the object passed as parameter and then serve it for update
  public update(coupon: Coupon): Coupon {
    return coupon;
  }

  public delete(coupon: Coupon): boolean {
    return true;
  }

  //TODO: Implement method - It should check if QR code already exists before assigning
  public generateQrCode(): string {
    return "BRGG-RTSQ-240919";
  }
}

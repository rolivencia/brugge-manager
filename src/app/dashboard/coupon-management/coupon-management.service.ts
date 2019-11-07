import { Injectable } from "@angular/core";
import { Coupon } from "@app/_models";
import { ActivatedRoute, Router } from "@angular/router";
import { CouponService } from "@app/_services/coupon.service";
import { CollectionView } from "wijmo/wijmo";
import * as _ from "lodash";

@Injectable({
  providedIn: "root"
})
export class CouponManagementService {
  showTopOutlet: boolean = false;
  showLeftOutlet: boolean = true;
  showRightOutlet: boolean = true;

  gridCollection: CollectionView;

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
    this.selectedCoupon = null;

    // this.router.navigate(['/dashboard/coupons/add']);
  }

  public add() {
    this.couponService.create();
  }

  public showGrid() {
    this.showTopOutlet = false;
    this.showLeftOutlet = true;
    this.showRightOutlet = true;
  }

  public getCouponById(id: number): Coupon {
    return this._coupons.filter(coupon => coupon.id === id).pop();
  }

  //TODO: Implement method - It should clone the object passed as parameter and then serve it for update
  public update(coupon: Coupon) {
    this.selectedCoupon = _.cloneDeep(coupon);
    this.showTopOutlet = true;
    this.showLeftOutlet = false;
    this.showRightOutlet = false;
  }

  public delete(coupon: Coupon): boolean {
    return true;
  }

  //TODO: Implement method - It should check if QR code already exists before assigning
  public generateQrCode(): string {
    return "BRGG-RTSQ-240919";
  }
}

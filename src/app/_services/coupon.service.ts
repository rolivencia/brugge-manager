import { Injectable } from "@angular/core";
import { Coupon } from "@app/_models";

@Injectable({
  providedIn: "root"
})
export class CouponService {
  constructor() {}

  public generateCode = length => {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  public create = (coupon: Coupon): boolean => {
    return false;
  };

  public getAll = (): Coupon[] => {
    return [];
  };

  public getById = (idCoupon: number): Coupon => {
    return null;
  };

  public getByCode = (code: string): Coupon => {
    return null;
  };

  public update = (coupon: Coupon): Coupon => {
    return null;
  };

  public delete = (coupon: Coupon): boolean => {
    return false;
  };
}

import { Injectable } from "@angular/core";
import { Coupon } from "@app/_models";
import { environment } from "@environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { first, map } from "rxjs/operators";
import * as moment from "moment";

@Injectable({
  providedIn: "root"
})
export class CouponService {
  constructor(private http: HttpClient) {}

  public generateCode = length => {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    const codeDate = moment().format("YYYYMMDD");
    return `BRGG-${result}-${codeDate}`;
  };

  public create = (coupon?: Coupon): boolean => {
    const code = this.generateCode(4);
    return false;
  };

  public getAll = (): Observable<Coupon[]> => {
    return this.http
      .get<Coupon[]>(`${environment.apiUrl}/coupon`)
      .pipe(first())
      .pipe(
        map(coupons =>
          coupons.map(coupon => ({
            ...coupon,
            audit: {
              ...coupon.audit,
              createdAt: moment(coupon.audit.createdAt),
              updatedAt: moment(coupon.audit.updatedAt)
            },
            startsAt: moment(coupon.startsAt),
            endsAt: moment(coupon.endsAt)
          }))
        )
      );
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

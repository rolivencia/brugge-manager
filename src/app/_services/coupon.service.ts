import { Injectable } from "@angular/core";
import { Coupon, User } from "@app/_models";
import { environment } from "@environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

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
    return result;
  };

  public create = (coupon: Coupon): boolean => {
    return false;
  };

  public getAll = (): Observable<Coupon[]> => {
    return this.http.get<Coupon[]>(`${environment.apiUrl}/coupon`);
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

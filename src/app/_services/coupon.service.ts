import { Injectable } from "@angular/core";
import { Coupon } from "@app/_models";
import { environment } from "@environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { first, map } from "rxjs/operators";
import * as moment from "moment";
import { Moment } from "moment";

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

  public create = (coupon?: Coupon): Observable<any> => {
    const savedObject = {
      title: coupon.title,
      description: coupon.description,
      startsAt: coupon.startsAt.toISOString(),
      endsAt: coupon.endsAt.toISOString(),
      idType: coupon.type.id,
      idUser: coupon.user.id,
      code: coupon.code,
      imageUrl: coupon.imageUrl,
      dailyCoupon: coupon.dailyCoupon
    };

    return this.http.post<any>(`${environment.apiUrl}/coupon/create`, {
      ...savedObject
    });
  };

  public getAll = (
    expired?: boolean,
    deleted?: boolean
  ): Observable<Coupon[]> => {
    return this.http
      .get<Coupon[]>(`${environment.apiUrl}/coupon/all/${expired}/${deleted}`)
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

  public getById = (idCoupon: number): Observable<Coupon> => {
    return this.http
      .get<Coupon>(`${environment.apiUrl}/coupon/${idCoupon}`)
      .pipe(first())
      .pipe(
        map(coupon => ({
          ...coupon,
          audit: {
            ...coupon.audit,
            createdAt: moment(coupon.audit.createdAt),
            updatedAt: moment(coupon.audit.updatedAt)
          },
          startsAt: moment(coupon.startsAt),
          endsAt: moment(coupon.endsAt)
        }))
      );
  };

  public getCouponStatus = (
    idCoupon: number,
    idCustomer: number
  ): Observable<{ Coupon; Customer }> => {
    return this.http
      .get<{ Coupon; Customer }>(
        `${environment.apiUrl}/coupon/status/${idCoupon}/${idCustomer}`
      )
      .pipe(first());
  };

  public getByCode = (code: string): Coupon => {
    return null;
  };

  public redeem = (idCoupon: number, idCustomer: number): Observable<any> => {
    return this.http.post<any>(`${environment.apiUrl}/coupon/redeem`, {
      idCoupon: idCoupon,
      idCustomer: idCustomer
    });
  };

  public update = (coupon: Coupon): Observable<any> => {
    const updatedCoupon = {
      id: coupon.id,
      title: coupon.title,
      description: coupon.description,
      startsAt: coupon.startsAt.toISOString(),
      endsAt: coupon.endsAt.toISOString(),
      idType: coupon.type.id,
      idUser: coupon.user.id,
      code: coupon.code,
      imageUrl: coupon.imageUrl,
      dailyCoupon: coupon.dailyCoupon
    };

    return this.http.put(`${environment.apiUrl}/coupon/update/`, {
      ...updatedCoupon
    });
  };

  public remove = (coupon: Coupon): Observable<any> => {
    return this.http.delete<any>(
      `${environment.apiUrl}/coupon/remove/` + coupon.id
    );
  };

  public uploadImage = (fileData): Observable<any> => {
    const formData = new FormData();
    formData.append("uploaded-image", fileData);

    return this.http.post<File>(`${environment.apiUrl}/upload`, formData);
  };

  /**
   * Retrieves last 5 redeemed coupons, sorted starting from the latest, for a given customer
   * @param idCustomer - ID of a given customer
   */
  public getRedeemed = (idCustomer: number) => {
    return this.http
      .get<any>(
        `${environment.apiUrl}/coupon/getRedeemed/${idCustomer}/${3}/${0}`
      )
      .pipe(first());
  };

  public getRedeemedInterval = (dateFrom: Moment, dateTo: Moment) => {
    const dateFromISO = dateFrom.format("YYYY-MM-DD");
    const dateToISO = dateTo ? dateTo.format("YYYY-MM-DD") : null;
    return this.http
      .get<any>(
        `${environment.apiUrl}/coupon/getRedeemedByDate/${dateFromISO}/${dateToISO}`
      )
      .pipe(first())
      .pipe(
        map(redemptions =>
          redemptions.map(redemption => ({
            ...redemption,
            createdAt: moment(redemption.createdAt).format("YYYY/MM/DD"),
            date: moment(redemption.createdAt).format("YYYY/MM/DD"),
            time: moment(redemption.createdAt).format("HH:mm"),
            workday: this.getWorkday(redemption.createdAt)
          }))
        )
      );
  };

  /**
   * Devuelve la jornada de trabajo, en formato fecha del día, para un date en formato ISOstring pasado como parámetro
   * @param date - Formato ISOstring
   */
  private getWorkday(date: string): string {
    const duplicate = moment(date);

    const lowerLimit = moment(date).set({
      hour: 12,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    const upperLimit = moment(date)
      .add(1, "day")
      .set({ hour: 11, minute: 59, second: 59, millisecond: 999 });

    // La fecha corresponde a antes del mediodía del día dado. Corresponde a la jornada anterior.
    if (duplicate.isBefore(lowerLimit)) {
      return moment(duplicate)
        .subtract(1, "day")
        .format("YYYY/MM/DD");
    } else if (
      duplicate.isSameOrAfter(lowerLimit) &&
      duplicate.isSameOrBefore(upperLimit)
    ) {
      return moment(duplicate).format("YYYY/MM/DD");
    }
  }
}

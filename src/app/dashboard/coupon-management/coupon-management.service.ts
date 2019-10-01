import { Injectable } from "@angular/core";
import { Coupon } from "@app/_models";
import { ActivatedRoute, Router } from "@angular/router";
import { Moment } from "moment";
import * as moment from "moment";
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

  couponList: Coupon[] = [
    {
      id: 1,
      title: "¡Pinta gratis!",
      startsAt: moment("09-26-2019 19:00"),
      endsAt: moment("10-04-2019 23:55"),
      code: "BRGG-HGZT-240919",
      description: "Canjeá este cupón por una pinta",
      type: {
        id: 1,
        description: "Canje por única vez",
        audit: {
          deleted: false,
          enabled: true,
          createdAt: moment(),
          updatedAt: moment()
        }
      },
      imageUrl: "assets/img/logo.jpg",
      audit: {
        deleted: false,
        enabled: true,
        createdAt: moment(),
        updatedAt: moment()
      },
      user: {
        id: 1,
        firstName: "Ramiro",
        lastName: "Olivencia",
        userName: "rolivencia"
      }
    },
    {
      id: 2,
      title: "Pizza + Pinta",
      startsAt: moment("09-27-2019 21:00"),
      endsAt: moment("10-01-2019 23:55"),
      code: "BRGG-APFM-270919",
      description: "Canjeá este cupón por una pinta y una pizza con descuento.",
      type: {
        id: 2,
        description: "Canje por única vez",
        audit: {
          deleted: false,
          enabled: true,
          createdAt: moment(),
          updatedAt: moment()
        }
      },
      imageUrl: "assets/img/logo.jpg",
      audit: {
        deleted: false,
        enabled: true,
        createdAt: moment(),
        updatedAt: moment()
      },
      user: {
        id: 2,
        firstName: "Nicolás",
        lastName: "Salomón",
        userName: "nsalomon"
      }
    },
    {
      id: 3,
      title: "Pintas para Compartir",
      startsAt: moment("09-30-2019 21:00"),
      endsAt: moment("10-07-2019 23:55"),
      code: "BRGG-JJSG-270919",
      description: "Dos por uno en pintas",
      type: {
        id: 2,
        description: "Canje por única vez",
        audit: {
          deleted: false,
          enabled: true,
          createdAt: moment(),
          updatedAt: moment()
        }
      },
      imageUrl: "assets/img/logo.jpg",
      audit: {
        deleted: false,
        enabled: true,
        createdAt: moment(),
        updatedAt: moment()
      },
      user: {
        id: 2,
        firstName: "Nicolás",
        lastName: "Salomón",
        userName: "nsalomon"
      }
    }
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public couponService: CouponService
  ) {}

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

  public getCoupons(): any[] {
    return [
      {
        id: 1,
        title: "¡Pinta gratis!",
        startsAt: "26/9/2019 19:00",
        endsAt: "4/10/2019 23:55",
        code: "BRGG-HGZT-240919"
      },
      {
        id: 2,
        title: "Pizza + Pinta",
        startsAt: "27/9/2019 21:00",
        endsAt: "1/10/2019 23:55",
        code: "BRGG-APFM-270919"
      },
      {
        id: 3,
        title: "Pintas para Compartir",
        startsAt: "30/9/2019 21:00",
        endsAt: "7/10/2019 23:55",
        code: "BRGG-JJSG-270919"
      }
    ];
  }

  public getCouponById(id: number): Coupon {
    return this.couponList.filter(coupon => coupon.id === id).pop();
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

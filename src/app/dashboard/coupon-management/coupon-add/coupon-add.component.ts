import {
  AfterViewInit,
  Component,
  OnInit,
  ViewEncapsulation
} from "@angular/core";
import { CouponManagementService } from "@app/dashboard/coupon-management/coupon-management.service";
import { AuthenticationService } from "@app/_services";
import * as wjcCore from "wijmo/wijmo";
import { Coupon, CouponType, User } from "@app/_models";
import * as moment from "moment";
import { CouponService } from "@app/_services/coupon.service";

@Component({
  selector: "app-coupon-add",
  templateUrl: "./coupon-add.component.html",
  styleUrls: [
    "./coupon-add.component.scss",
    "../coupon-management.component.scss"
  ],
  encapsulation: ViewEncapsulation.None
})
export class CouponAddComponent implements OnInit, AfterViewInit {
  currentUser: User;
  userInfo: string;
  coupon: Coupon;

  // TODO: Mover a consulta de base de datos
  couponTypes: CouponType[] = [
    {
      id: 1,
      description: "Única Vez"
    },
    {
      id: 2,
      description: "Múltiples Veces en Distintos Días"
    }
  ];

  private _startingDate: Date;
  private _endingDate: Date;

  constructor(
    public couponManagementService: CouponManagementService,
    private couponService: CouponService,
    public authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => {
      this.userInfo = `${x.firstName} ${x.lastName} (${x.userName})`;
      this.currentUser = x;
    });
  }

  ngOnInit() {
    this.authenticationService
      .getKeys("wijmo")
      .subscribe(Key => wjcCore.setLicenseKey(Key));
    this.load();
  }

  ngAfterViewInit() {}

  public load() {
    this.coupon = new Coupon();
    this.startingDate = moment().toDate();
    this.endingDate = moment()
      .add(7, "days")
      .toDate();
    this.coupon.code = this.couponService.generateCode(4);
    this.coupon.user = this.currentUser;
    this.coupon.title = "";
    this.coupon.description = "";
    this.coupon.imageUrl = "";
  }

  public generateCode() {
    this.coupon.code = this.couponService.generateCode(4);
  }

  public save() {
    this.couponService
      .create(this.coupon)
      .subscribe(response => console.log(response));
  }

  get startingDate(): Date {
    return this._startingDate;
  }

  set startingDate(value: Date) {
    this._startingDate = value;
    this.coupon.startsAt = moment(value);
  }

  get endingDate(): Date {
    return this._endingDate;
  }

  set endingDate(value: Date) {
    this._endingDate = value;
    this.coupon.endsAt = moment(value);
  }
}

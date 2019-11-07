import {
  AfterViewInit,
  Component,
  OnInit,
  ViewEncapsulation
} from "@angular/core";
import { CouponManagementService } from "@app/dashboard/coupon-management/coupon-management.service";
import { AuthenticationService } from "@app/_services";
import { Coupon, CouponType, User } from "@app/_models";
import { CouponService } from "@app/_services/coupon.service";
import { ToastrService } from "ngx-toastr";
import * as _ from "lodash";
import * as moment from "moment";
import * as wjcCore from "wijmo/wijmo";
import { take, tap } from "rxjs/operators";
import { CollectionView } from "wijmo/wijmo";

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
  disableInputs: boolean = false;
  edit: boolean = false;

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
    public authenticationService: AuthenticationService,
    public couponManagementService: CouponManagementService,
    private couponService: CouponService,
    private toastr: ToastrService
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
    if (this.couponManagementService.selectedCoupon) {
      this.coupon = _.cloneDeep(this.couponManagementService.selectedCoupon);
      this.startingDate = this.coupon.startsAt.toDate();
      this.endingDate = this.coupon.endsAt.toDate();
      this.edit = true;
    } else {
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
      this.disableInputs = false;
    }
  }

  public generateCode() {
    this.coupon.code = this.couponService.generateCode(4);
  }

  public save() {
    if (this.edit) {
      this.couponService.update(this.coupon).subscribe(([response, id]) => {
        this.disableInputs = true;
        this.toastr.info(`Cupón id ${id} actualizado correctamente`, "¡Éxito!");
      });
    } else {
      this.couponService.create(this.coupon).subscribe(response => {
        this.disableInputs = true;
        this.toastr.success(
          `Cupón id ${response.id} agregado correctamente`,
          "¡Éxito!"
        );
      });
    }
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

  goBack() {
    this.couponService
      .getAll()
      .pipe(take(1))
      .subscribe(coupons => {
        this.couponManagementService.coupons = coupons;
        this.couponManagementService.gridCollection = new CollectionView(
          coupons
        );
        this.couponManagementService.selectedCoupon = null;
        this.couponManagementService.showGrid();
      });
  }
}

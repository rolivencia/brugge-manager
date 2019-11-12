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
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

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

  submitted: boolean = false;
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  imageUploaded: boolean = false;
  imageUploading: boolean = false;

  // TODO: Grab this data from database
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

  couponForm: FormGroup;

  private _startingDate: Date;
  private _endingDate: Date;

  constructor(
    public authenticationService: AuthenticationService,
    public couponManagementService: CouponManagementService,
    private couponService: CouponService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.authenticationService.currentUser.subscribe(x => {
      this.userInfo = `${x.firstName} ${x.lastName} (${x.userName})`;
      this.currentUser = x;
    });
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

  get formControl() {
    return this.couponForm.controls;
  }

  public ngOnInit() {
    this.authenticationService
      .getKeys("wijmo")
      .subscribe(Key => wjcCore.setLicenseKey(Key));
    this.load();
  }

  public ngAfterViewInit() {}

  public load() {
    if (this.couponManagementService.selectedCoupon) {
      this.coupon = _.cloneDeep(this.couponManagementService.selectedCoupon);
      this.startingDate = this.coupon.startsAt.toDate();
      this.endingDate = this.coupon.endsAt.toDate();
      this.edit = true;

      this.couponForm = this.formBuilder.group({
        id: [this.coupon.id],
        title: [this.coupon.title, Validators.required],
        startingDate: [this.startingDate, Validators.required],
        endingDate: [this.endingDate, Validators.required],
        description: [this.coupon.description, Validators.required],
        type: [this.coupon.type, Validators.required],
        code: [this.coupon.code, Validators.required],
        imageUrl: [this.coupon.imageUrl, Validators.required],
        user: [this.coupon.user, Validators.required]
      });

      this.previewUrl = this.coupon.imageUrl;
      this.imageUploaded = true;
      this.imageUploading = false;
    } else {
      this.coupon = new Coupon();
      this.coupon.type = {
        id: 1,
        description: "Única Vez"
      };

      this.startingDate = moment().toDate();
      this.endingDate = moment()
        .add(7, "days")
        .toDate();
      this.coupon.code = this.couponService.generateCode(4);
      this.coupon.user = this.currentUser;
      this.coupon.title = "";
      this.coupon.description = "";
      this.coupon.imageUrl = "";

      this.couponForm = this.formBuilder.group({
        id: [null],
        title: ["", Validators.required],
        startingDate: [this.startingDate, Validators.required],
        endingDate: [this.endingDate, Validators.required],
        description: ["", Validators.required],
        type: [this.coupon.type, Validators.required],
        code: [this.coupon.code, Validators.required],
        imageUrl: [this.coupon.imageUrl, Validators.required],
        user: [this.coupon.user, Validators.required]
      });

      this.disableInputs = false;
    }
  }

  public generateCode() {
    this.coupon.code = this.couponService.generateCode(4);
  }

  public save() {
    this.submitted = true;

    if (this.couponForm.invalid) {
      this.toastr.error(
        `Falta llenar campos para poder guardar este cupón`,
        "¡Oops!"
      );
      return;
    }

    // Assign back to coupon object the reactive form controls
    this.coupon.title = this.couponForm.controls["title"].value;
    this.coupon.description = this.couponForm.controls["description"].value;
    this.coupon.startsAt = moment(
      this.couponForm.controls["startingDate"].value
    );
    this.coupon.endsAt = moment(this.couponForm.controls["endingDate"].value);
    this.coupon.type = this.couponForm.controls["type"].value;
    this.coupon.code = this.couponForm.controls["code"].value;
    this.coupon.imageUrl = this.couponForm.controls["imageUrl"].value;
    this.coupon.user = this.couponForm.controls["user"].value;

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

  public goBack() {
    this.couponService
      .getAll()
      .pipe(take(1))
      .subscribe(coupons => {
        this.couponManagementService.coupons = coupons;
        this.couponManagementService.gridCollection = new CollectionView(
          coupons
        );
        this.couponManagementService.gridCollection.currentItem = null;
        this.couponManagementService.selectedCoupon = null;
        this.couponManagementService.showGrid();
      });
  }

  public fileProgress(fileInput: any) {
    this.imageUploaded = false;
    this.imageUploading = false;
    this.fileData = <File>fileInput.target.files[0];
    this.previewImage();
  }

  public previewImage() {
    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = _event => {
      this.previewUrl = reader.result;
    };
  }

  public onUploadImage() {
    this.imageUploading = true;
    this.couponService.uploadImage(this.fileData).subscribe(res => {
      this.previewUrl = res.path;
      this.couponForm.controls["imageUrl"].setValue(res.path);
      this.imageUploaded = true;
      this.imageUploading = false;
    });
  }

  public onImageUrlChange(event) {
    this.previewUrl = event;
  }
}

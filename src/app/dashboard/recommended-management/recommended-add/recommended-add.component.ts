import { Component, OnInit } from "@angular/core";
import { RecommendedManagementService } from "@app/dashboard/recommended-management/recommended-management.service";
import { CollectionView } from "wijmo/wijmo";
import { RecommendedService } from "@app/_services/recommended.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "@app/_models";
import { Recommended } from "@app/_models/recommended";
import { ToastrService } from "ngx-toastr";
import { AuthenticationService } from "@app/_services";
import * as _ from "lodash";

@Component({
  selector: "app-recommended-add",
  templateUrl: "./recommended-add.component.html",
  styleUrls: ["./recommended-add.component.scss"]
})
export class RecommendedAddComponent implements OnInit {
  currentUser: User;
  userInfo: string;
  recommendation: Recommended;
  disableInputs: boolean = false;
  public edit: boolean = false;

  submitted: boolean = false;
  fileData: File = null;
  previewUrl: any = null;
  imageUploaded: boolean = false;
  imageUploading: boolean = false;

  recommendationForm: FormGroup;

  constructor(
    public authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    public recommendedManagementService: RecommendedManagementService,
    public recommendedService: RecommendedService,
    private toastr: ToastrService
  ) {
    this.authenticationService.currentUser.subscribe(x => {
      this.userInfo = `${x.firstName} ${x.lastName} (${x.userName})`;
      this.currentUser = x;
    });
  }

  get formControl() {
    return this.recommendationForm.controls;
  }

  ngOnInit() {
    this.load();
  }

  add() {}

  load() {
    if (this.recommendedManagementService.selectedRecommended) {
      this.recommendation = _.cloneDeep(
        this.recommendedManagementService.selectedRecommended
      );
      this.edit = true;

      this.recommendationForm = this.formBuilder.group({
        id: [this.recommendation.id],
        title: [this.recommendation.title, Validators.required],
        description: [this.recommendation.description, Validators.required],
        imageUrl: [this.recommendation.imageUrl, Validators.required]
      });

      this.previewUrl = this.recommendation.imageUrl;
      this.imageUploaded = true;
      this.imageUploading = false;
    } else {
      this.recommendation = new Recommended();
      this.recommendation.title = "";
      this.recommendation.description = "";
      this.recommendation.imageUrl = "";
      this.recommendationForm = this.formBuilder.group({
        id: [null],
        title: ["", Validators.required],
        description: ["", Validators.required],
        imageUrl: ["", Validators.required]
      });
      this.disableInputs = false;
    }
  }

  save() {
    this.submitted = true;

    if (this.recommendationForm.invalid) {
      if (this.recommendationForm.invalid) {
        this.toastr.error(
          `Falta llenar campos para poder guardar este cupón`,
          "¡Oops!"
        );
        return;
      }
    }

    // Assign back to recommendation object the reactive form controls
    this.recommendation.title = this.recommendationForm.controls["title"].value;
    this.recommendation.description = this.recommendationForm.controls[
      "description"
    ].value;
    this.recommendation.imageUrl = this.recommendationForm.controls[
      "imageUrl"
    ].value;

    if (this.edit) {
      this.recommendedService
        .update(this.recommendation)
        .subscribe(([response, id]) => {
          this.disableInputs = true;
          this.toastr.info(
            `Recomendado id ${id} actualizado correctamente`,
            "¡Éxito!"
          );
        });
    } else {
      this.recommendedService
        .create(this.recommendation)
        .subscribe(recommendation => {
          this.disableInputs = true;
          this.toastr.success(
            `Recomendado id ${recommendation.id} agregado correctamente`,
            "¡Éxito!"
          );
        });
    }
  }

  public goBack() {
    this.recommendedManagementService.showGrid();
    this.recommendedService
      .get(
        this.recommendedManagementService.showDisabled,
        this.recommendedManagementService.showDeleted
      )
      .subscribe(recommendations => {
        this.recommendedManagementService.recommendations = recommendations;
        this.recommendedManagementService.gridCollection = new CollectionView(
          recommendations
        );
        this.recommendedManagementService.gridCollection.currentItem = null;
      });
  }

  fileProgress(fileInput: any) {
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
    this.recommendedService.uploadImage(this.fileData).subscribe(res => {
      this.previewUrl = res.path;
      this.recommendationForm.controls["imageUrl"].setValue(res.path);
      this.imageUploaded = true;
      this.imageUploading = false;
    });
  }

  public onImageUrlChange(event) {
    this.previewUrl = event;
  }
}

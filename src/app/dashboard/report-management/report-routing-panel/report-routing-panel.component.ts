import { Component } from "@angular/core";
import { ReportRoutingPanelService } from "@app/dashboard/report-management/report-routing-panel/report-routing-panel.service";
import { AuthenticationService } from "@app/_services";
import { User } from "@app/_models";
import { Subscription } from "rxjs";

@Component({
  selector: "app-report-routing-panel",
  templateUrl: "./report-routing-panel.component.html",
  styleUrls: ["./report-routing-panel.component.scss"]
})
export class ReportRoutingPanelComponent {
  currentUser: User;
  currentUserSubscription: Subscription;

  constructor(
    public authenticationService: AuthenticationService,
    public reportRoutingPanelService: ReportRoutingPanelService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
      user => {
        this.currentUser = user;
      }
    );
  }
}

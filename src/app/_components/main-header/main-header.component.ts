import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "@app/_services";
import { User } from "@app/_models";

@Component({
  selector: "app-main-header",
  templateUrl: "./main-header.component.html",
  styleUrls: ["./main-header.component.scss"]
})
export class MainHeaderComponent implements OnInit {
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }

  ngOnInit() {}

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }

  get nombreDeBienvenida() {
    return `${this.currentUser.avatar} ${this.currentUser.firstName}`;
  }
}

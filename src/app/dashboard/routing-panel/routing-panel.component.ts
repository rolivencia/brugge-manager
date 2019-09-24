import { Component, OnInit } from "@angular/core";
import { User } from "@app/_models";
import { Subscription } from "rxjs";
import {
  AlertService,
  AuthenticationService,
  UserService
} from "@app/_services";
import { Router } from "@angular/router";
import { first } from "rxjs/operators";

@Component({
  selector: "app-routing-panel",
  templateUrl: "./routing-panel.component.html",
  styleUrls: ["./routing-panel.component.scss"]
})
export class RoutingPanelComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  constructor(
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private userService: UserService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
      user => {
        this.currentUser = user;
      }
    );
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  deleteUser(id: number) {
    this.userService
      .delete(id)
      .pipe(first())
      .subscribe(() => {
        this.loadAllUsers();
      });
  }

  private loadAllUsers() {
    this.userService
      .getAll()
      .pipe(first())
      .subscribe(users => {
        this.users = users;
      });
  }

  goTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  notImplemented(route: string) {
    this.alertService.error("Módulo no implementado.", true);
  }
}

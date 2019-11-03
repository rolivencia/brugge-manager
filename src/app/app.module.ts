import { AlertComponent } from "./_components";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { ErrorInterceptor, JwtInterceptor } from "./_helpers";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { LoginComponent } from "./login";
import { NgModule } from "@angular/core";
import { routing } from "./app.routing";
import { MainHeaderComponent } from "./_components/main-header/main-header.component";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    routing,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: "toast-top-right",
      preventDuplicates: true
    })
  ],
  declarations: [
    AlertComponent,
    AppComponent,
    LoginComponent,
    MainHeaderComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

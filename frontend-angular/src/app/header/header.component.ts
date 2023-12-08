import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit {
  isLoading = false;
  isAuth = false;
  private authStatusSub: Subscription = new Subscription();

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.isAuth = this.authService.getIsAuth();
    console.log(this.isAuth)
  }

  logout(){
    this.authService.logout();
  }
}

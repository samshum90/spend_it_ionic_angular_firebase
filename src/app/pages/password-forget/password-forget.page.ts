import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "../../shared/authentication-service";

@Component({
  selector: 'app-password-forget',
  templateUrl: './password-forget.page.html',
  styleUrls: ['./password-forget.page.scss'],
})
export class PasswordForgetPage implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) { }

  ngOnInit() {
  }
  resetPassword(email) {
    this.authService.PasswordRecover(email.value)
      .then((res) => {
        if (this.authService.isEmailVerified) {
          this.router.navigate(['']);
        } else {
          window.alert('Email is not verified')
          return false;
        }
      }).catch((error) => {
        window.alert(error.message)
      })
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from "../../services/auth/authentication-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  constructor(
    public loadingCtrl: LoadingController,
    public authService: AuthenticationService,
    public router: Router
  ) { }

  ngOnInit() { }

  async logIn(email, password) {
    const loading = await this.loadingCtrl.create();
    this.authService.SignIn(email.value, password.value)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.user));
        loading.dismiss().then(() => {
          this.router.navigateByUrl('tabs/home');
        })
      }).catch((error) => {
        window.alert(error.message)
      })
  }

}

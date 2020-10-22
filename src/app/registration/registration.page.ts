import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/data/firestore.service';
import { Router } from "@angular/router";
import { AuthenticationService } from "../shared/authentication-service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})

export class RegistrationPage implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    private firestoreService: FirestoreService,
  ) { }

  ngOnInit() { }

  signUp(email, password) {
    this.authService.RegisterUser(email.value, password.value)
      .then((res) => {
        console.log(res)
        this.firestoreService.createCategories(res.user.uid)
        this.authService.SendVerificationMail()
        this.router.navigate(['verify-email']);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

}

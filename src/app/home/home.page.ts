import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService } from '../services/data/firestore.service';
import { Spend } from '../shared/models/spend.interface';
import { AuthenticationService } from "../shared/authentication-service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public spendList: Observable<Spend[]>;
  public authService: AuthenticationService
  constructor(
    private firestoreService: FirestoreService
  ) { }

  ngOnInit() {
    this.spendList = this.firestoreService.getSpendList();
  }

}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../services/data/firestore.service';
import { Spend } from '../../shared/models/spend.interface';
import { AuthenticationService } from "../../shared/authentication-service";

import { AlertController, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { SpendUpdateComponent } from '../../components/spend-update/spend-update.component';

@Component({
  selector: 'app-expenditure',
  templateUrl: './expenditure.page.html',
  styleUrls: ['./expenditure.page.scss'],
})
export class ExpenditurePage implements OnInit {
  public spendList: Observable<Spend[]>;
  constructor(
    private firestoreService: FirestoreService,
    private alertController: AlertController,
    private router: Router,
    private modalController: ModalController,
    public authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.spendList = this.firestoreService.getSpendList();
  }

  async deleteSpend(spendId: string, spendName: string): Promise<void> {
    const alert = await this.alertController.create({
      message: `Are you sure you want to delete ${spendName}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: blah => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Okay',
          handler: () => {
            this.firestoreService.deleteSpend(spendId).then(() => {
              this.router.navigateByUrl('');
            });
          },
        },
      ],
    });

    await alert.present();
  }

  async updateSpend(spend: Spend) {
    const modal = await this.modalController.create({
      component: SpendUpdateComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        "spend": spend
      }
    });
    return await modal.present();
  }

}

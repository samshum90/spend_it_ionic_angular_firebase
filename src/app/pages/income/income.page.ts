import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../services/data/firestore.service';
import { Income } from '../../shared/models/income.interface';
import { AuthenticationService } from "../../shared/authentication-service";

import { AlertController, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { IncomeUpdateComponent } from '../../components/income-update/income-update.component';


@Component({
  selector: 'app-income',
  templateUrl: './income.page.html',
  styleUrls: ['./income.page.scss'],
})
export class IncomePage implements OnInit {
  public incomeList: Observable<Income[]>;
  constructor(
    private firestoreService: FirestoreService,
    private alertController: AlertController,
    private router: Router,
    private modalController: ModalController,
    public authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.incomeList = this.firestoreService.getIncomeList();
  }

  async deleteIncome(incomeId: string, incomeName: string): Promise<void> {
    const alert = await this.alertController.create({
      message: `Are you sure you want to delete ${incomeName}?`,
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
            this.firestoreService.deleteIncome(incomeId).then(() => {
              this.router.navigateByUrl('');
            });
          },
        },
      ],
    });

    await alert.present();
  }

  async updateIncome(income: Income) {
    const modal = await this.modalController.create({
      component: IncomeUpdateComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        "income": income
      }
    });
    return await modal.present();
  }

}

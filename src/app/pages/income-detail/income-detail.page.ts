import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Income } from '../../shared/models/income.interface';
import { FirestoreService } from '../../services/data/firestore.service';
import { AlertController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { IncomeUpdateComponent } from '../../components/income-update/income-update.component'


@Component({
  selector: 'app-income-detail',
  templateUrl: './income-detail.page.html',
  styleUrls: ['./income-detail.page.scss'],
})
export class IncomeDetailPage implements OnInit {
  public income: Income;
  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private router: Router,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    const incomeId: string = this.route.snapshot.paramMap.get('id');
    this.firestoreService.getIncomeDetail(incomeId).subscribe(income => {
      this.income = income;
    });
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
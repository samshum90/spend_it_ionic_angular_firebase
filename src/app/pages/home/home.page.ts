import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { combineLatest } from "rxjs";
import { FirestoreService } from '../../services/data/firestore.service';
import { Spend } from '../../shared/models/spend.interface';
import { AuthenticationService } from "../../shared/authentication-service";

import { AlertController, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { SpendUpdateComponent } from '../../components/spend-update/spend-update.component';
import { IncomeUpdateComponent } from '../../components/income-update/income-update.component';
import { Income } from 'src/app/shared/models/income.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public itemList: any[];
  constructor(
    private firestoreService: FirestoreService,
    private alertController: AlertController,
    private router: Router,
    private modalController: ModalController,
    public authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.createItemList()
  }

  async createItemList() {
    const list = []
    const spend = this.firestoreService.getSpendList();
    const income = this.firestoreService.getIncomeList();
    combineLatest(spend, income)
      .subscribe((res: any) => this.itemList = res.flat())
  }

  async deleteSpend(spendId: string, name: string): Promise<void> {
    const alert = await this.alertController.create({
      message: `Are you sure you want to delete ${name}?`,
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

  condition(item: string) {
    if (item === "Income") {
      return true;
    }
    return false;
  }

}

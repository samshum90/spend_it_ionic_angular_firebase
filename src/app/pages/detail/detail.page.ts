import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Spend } from '../../shared/models/spend.interface';
import { FirestoreService } from '../../services/data/firestore.service';
import { AlertController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { UpdateSpendComponent } from '../../components/update-spend/update-spend.component'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  public spend: Spend;
  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private router: Router,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    const spendId: string = this.route.snapshot.paramMap.get('id');
    this.firestoreService.getSpendDetail(spendId).subscribe(spend => {
      this.spend = spend;
    });
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

  async updateSpend(spendId: string, spend: Spend) {
    const modal = await this.modalController.create({
      component: UpdateSpendComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        "spend": spend
      }
    });
    return await modal.present();
  }

}

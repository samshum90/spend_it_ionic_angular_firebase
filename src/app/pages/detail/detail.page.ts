import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Spend } from '../../shared/models/spend.interface';
import { FirestoreService } from '../../services/data/firestore.service';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

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
    private router: Router
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

}

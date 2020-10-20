import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../../services/data/firestore.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  public createSpendForm: FormGroup;
  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private firestoreService: FirestoreService,
    formBuilder: FormBuilder,
    private router: Router
  ) {
    this.createSpendForm = formBuilder.group({
      dateCreated: ['', Validators.required],
      spendName: ['', Validators.required],
      spendDescription: [''],
      category: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }

  async createSpend() {
    const loading = await this.loadingCtrl.create();

    const dateCreated = this.createSpendForm.value.dateCreated;
    const spendName = this.createSpendForm.value.spendName;
    const spendDescription = this.createSpendForm.value.spendDescription;
    const category = this.createSpendForm.value.category;
    const amount = this.createSpendForm.value.amount;

    this.firestoreService
      .createSpend(
        dateCreated,
        spendName,
        spendDescription,
        category,
        amount)
      .then(
        () => {
          loading.dismiss().then(() => {
            this.router.navigateByUrl('');
          });
        },
        error => {
          loading.dismiss().then(() => {
            console.error(error);
          });
        }
      );

    return await loading.present();
  }


  ngOnInit() {
  }

}

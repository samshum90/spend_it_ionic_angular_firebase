import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../../services/data/firestore.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-income-create',
  templateUrl: './income-create.page.html',
  styleUrls: ['./income-create.page.scss'],
})
export class IncomeCreatePage implements OnInit {
  public createIncomeForm: FormGroup;
  public categoriesList: any[];
  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private firestoreService: FirestoreService,
    formBuilder: FormBuilder,
    private router: Router
  ) {
    this.createIncomeForm = formBuilder.group({
      dateCreated: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
      amount: ['', Validators.required],
      type: ['', Validators.required],

    });
  }

  ngOnInit() {
    this.updateDate()
    this.firestoreService.getCategoriesList()
  }

  async createIncome() {
    const loading = await this.loadingCtrl.create();

    const dateCreated = this.createIncomeForm.value.dateCreated;
    const name = this.createIncomeForm.value.name;
    const description = this.createIncomeForm.value.description;
    const amount = this.createIncomeForm.value.amount;
    const type = this.createIncomeForm.value.type;

    this.firestoreService
      .createIncome(
        dateCreated,
        name,
        description,
        amount,
        type)
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

  updateDate() {
    let today = new Date().toISOString().substr(0, 10);
    this.createIncomeForm.patchValue({
      dateCreated: today,
      name: '',
      description: '',
      category: '',
      amount: '.00',
      type: 'Income'
    })
  }

}

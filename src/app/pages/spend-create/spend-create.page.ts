import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../../services/data/firestore.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-spend-create',
  templateUrl: './spend-create.page.html',
  styleUrls: ['./spend-create.page.scss'],
})
export class SpendCreatePage implements OnInit {
  public createSpendForm: FormGroup;
  public categoriesList: any[];
  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private firestoreService: FirestoreService,
    formBuilder: FormBuilder,
    private router: Router
  ) {
    // this.categoriesList = ["Food", "Take Away", "Personal", "Entertainment", "Service", "Other"]
    this.firestoreService.getCategoriesList().pipe(
      map((res: any) => res.categories)
    ).subscribe(res => {
      this.categoriesList = res;
    })
    this.createSpendForm = formBuilder.group({
      dateCreated: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
      category: ['', Validators.required],
      amount: ['', Validators.required],
      type: ['', Validators.required],

    });
  }

  ngOnInit() {
    this.updateDate()
    this.firestoreService.getCategoriesList()
  }

  async createSpend() {
    const loading = await this.loadingCtrl.create();

    const dateCreated = this.createSpendForm.value.dateCreated;
    const name = this.createSpendForm.value.name;
    const description = this.createSpendForm.value.description;
    const category = this.createSpendForm.value.category;
    const amount = this.createSpendForm.value.amount;
    const type = this.createSpendForm.value.type;

    this.firestoreService
      .createSpend(
        dateCreated,
        name,
        description,
        category,
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
    this.createSpendForm.patchValue({
      dateCreated: today,
      name: '',
      description: '',
      category: '',
      amount: '.00',
      type: 'Expenditure'
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../../services/data/firestore.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
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
    this.firestoreService.getCategoriesList()
      .map(res => {
        // do some calculations here if you want to
        return res.map(eachlLabel => eachlLabel + " Hello World")
      })
      .subscribe(res => {
        console.log(res)//should give you the array of percentage. 
        this.categoriesList = res;
        console.log(this.categoriesList)
      })

    //   .subscribe(res => {
    //   console.log(res)
    //   res = res.map(x => )
    //   this.categoriesList = res
    //   console.log(this.categoriesList)
    // })
    // .subscribe(categories => this.categoriesList = categories)
    this.createSpendForm = formBuilder.group({
      dateCreated: ['', Validators.required],
      spendName: ['', Validators.required],
      spendDescription: [''],
      category: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.updateDate()
    this.firestoreService.getCategoriesList()
  }

  getCategoryList() {
    return this.firestoreService.getCategoriesList()
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

  updateDate() {
    let today = new Date().toISOString().substr(0, 10);
    this.createSpendForm.patchValue({
      dateCreated: today,
      spendName: '',
      spendDescription: '',
      category: '',
      amount: '',
    })
  }
}

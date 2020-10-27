import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';
import { FirestoreService } from '../../services/data/firestore.service';
import { map } from 'rxjs/operators';

import { CategoryCreateComponent } from "../../components/category-create/category-create.component";

@Component({
  selector: 'app-budget',
  templateUrl: './budget.page.html',
  styleUrls: ['./budget.page.scss'],
})
export class BudgetPage implements OnInit {
  public categoriesList: any[];
  public budgetForm: FormGroup;
  constructor(
    private alertController: AlertController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private firestoreService: FirestoreService,
    private formBuilder: FormBuilder,
    private router: Router,
    private modalController: ModalController,
  ) {
    this.budgetForm = formBuilder.group({});
    this.firestoreService.getCategoriesList().pipe(
      map((res: any) => res.categories)
    ).subscribe(res => {
      this.categoriesList = res,
        this.createForm(res)

    })
  }

  ngOnInit() {
  }

  createForm(res) {
    res.map(x => {
      this.budgetForm.addControl(`${x}`, this.formBuilder.control(x))
    })
  }

  async createBudget() {
    let today = new Date().toISOString().substr(0, 10);
    const loading = await this.loadingCtrl.create();
    const budget = this.budgetForm.value;
    this.firestoreService
      .createBudget(
        budget,
        today
      )
      .then(
        () => {
          loading.dismiss().then(() => {
            this.router.navigateByUrl('tabs/dashboard');
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

  async createCategory() {
    const modal = await this.modalController.create({
      component: CategoryCreateComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        "categories": this.categoriesList
      }
    });
    return await modal.present();
  }

  async deleteCategory(index: number, name: string) {
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
            let categories = this.categoriesList
            categories.splice(index, 1)
            this.firestoreService.updateCategories(
              categories
            ), this.budgetForm.removeControl(name)
          },
        },
      ],
    });

    await alert.present();
  }

}

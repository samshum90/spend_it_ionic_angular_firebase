import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';
import { FirestoreService } from '../../services/data/firestore.service';
import { map } from 'rxjs/operators';
import { AuthenticationService } from "../../services/auth/authentication-service";

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
    public authService: AuthenticationService
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
      this.budgetForm.addControl(`${x}`, new FormControl('0.00'))
    })
  }

  async createBudget() {
    let today = new Date().toISOString().substr(0, 10);
    const loading = await this.loadingCtrl.create();
    const budget =
      // Object.keys(this.budgetForm.value).reduce((arr, key) => arr.concat(this.budgetForm.value[key]), []);
      Object.keys(this.budgetForm.value).reduce((arr, key) => {
        const subObj = { "name": key, "amount": this.budgetForm.value[key].toFixed(2) };
        return arr.concat(subObj)
      }, []);
    // const budget = [];
    // for (let i in this.budgetForm.value) {
    //   budget.push(
    //     Object.assign(this.budgetForm.value[i], { name: i }));
    // };
    console.log(budget, this.budgetForm)
    this.firestoreService
      .createBudget(
        budget,
        today
      )
      .then(
        () => {
          this.budgetForm.reset();
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

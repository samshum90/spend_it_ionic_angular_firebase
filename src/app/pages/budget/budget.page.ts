import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../../services/data/firestore.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.page.html',
  styleUrls: ['./budget.page.scss'],
})
export class BudgetPage implements OnInit {
  public categoriesList: any[];
  public budgetForm: FormGroup;
  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private firestoreService: FirestoreService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.budgetForm = formBuilder.group({});
    this.firestoreService.getCategoriesList().pipe(
      map((res: any) => res.categories)
    ).subscribe(res => {
      this.categoriesList = res,

        res.map((x, i) => {
          console.log(x),
            this.budgetForm.addControl(`${x}`, this.formBuilder.control(x))
        })

    })

  }

  ngOnInit() {
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

}

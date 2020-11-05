import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../../services/data/firestore.service';
import { AuthenticationService } from "../../services/auth/authentication-service";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  public selectedRadioGroup: any;
  public createForm: FormGroup;
  public categoriesList: any[];
  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private firestoreService: FirestoreService,
    public authService: AuthenticationService,
    formBuilder: FormBuilder,
    private router: Router
  ) {
    this.firestoreService.getCategoriesList().pipe(
      map((res: any) => res.categories)
    ).subscribe(res => {
      this.categoriesList = res;
    })
    this.createForm = formBuilder.group({
      dateCreated: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
      category: [''],
      amount: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.updateDate()
    this.firestoreService.getCategoriesList()
    this.selectedRadioGroup = "Expenditure"
  }

  async submitIncome() {
    const loading = await this.loadingCtrl.create();

    const dateCreated = this.createForm.value.dateCreated;
    const name = this.createForm.value.name;
    const description = this.createForm.value.description;
    const category = this.createForm.value.category;
    const amount = this.createForm.value.amount;
    const type = `${this.selectedRadioGroup}`;

    if (this.selectedRadioGroup = "Income") {
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
    } else {
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
              this.updateDate();
              this.router.navigateByUrl('');
            });
          },
          error => {
            loading.dismiss().then(() => {
              console.error(error);
            });
          }
        );
    }


    return await loading.present();
  }

  async submitExpenditure() {
    const loading = await this.loadingCtrl.create();

    const dateCreated = this.createForm.value.dateCreated;
    const name = this.createForm.value.name;
    const description = this.createForm.value.description;
    const category = this.createForm.value.category;
    const amount = this.createForm.value.amount;
    const type = this.createForm.value.type;

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
            this.updateDate();
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
    this.createForm.patchValue({
      dateCreated: today,
      name: '',
      description: '',
      category: '',
      amount: '.00',
      type: `${this.selectedRadioGroup}`
    })
  }

  radioGroupChange(event) {
    this.selectedRadioGroup = event.detail.value;
  }

}

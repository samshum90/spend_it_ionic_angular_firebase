import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from '../../services/data/firestore.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

import { Spend } from '../../shared/models/spend.interface'

@Component({
  selector: 'app-spend-update',
  templateUrl: './spend-update.component.html',
  styleUrls: ['./spend-update.component.scss'],
})
export class SpendUpdateComponent implements OnInit {
  @Input() spend: Spend;
  public editSpendForm: FormGroup;
  public categoriesList: any[];
  constructor(
    public loadingCtrl: LoadingController,
    private firestoreService: FirestoreService,
    private modalCtrl: ModalController,
    formBuilder: FormBuilder,
  ) {
    this.firestoreService.getCategoriesList().pipe(
      map((
        res: any) => res.categories)
    ).subscribe(res => {
      this.categoriesList = res,
        this.updateValues()
    })
    this.editSpendForm = formBuilder.group({
      dateCreated: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
      category: ['', Validators.required],
      amount: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  ngOnInit() { this.updateValues() }

  updateValues() {
    this.editSpendForm.setValue({
      dateCreated: this.spend.dateCreated,
      name: this.spend.name,
      description: this.spend.description,
      category: this.spend.category,
      amount: this.spend.amount,
      type: this.spend.type,
    })
  }

  async updateSpend() {
    const loading = await this.loadingCtrl.create();
    const dateCreated = this.editSpendForm.value.dateCreated;
    const name = this.editSpendForm.value.name;
    const description = this.editSpendForm.value.description;
    const category = this.editSpendForm.value.category;
    const amount = this.editSpendForm.value.amount;
    const type = this.editSpendForm.value.type;
    this.firestoreService.updateSpend(
      this.spend.id,
      dateCreated,
      name,
      description,
      category,
      amount,
      type
    ).then(() => {
      loading.dismiss().then(() => {
        this.modalCtrl.dismiss();
      });
    },
      error => {
        loading.dismiss().then(() => {
          console.error(error);
        });
      }
    );
  }

  CloseModal() {
    this.modalCtrl.dismiss()
  }
}

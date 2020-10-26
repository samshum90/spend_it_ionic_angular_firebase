import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from '../../services/data/firestore.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Income } from '../../shared/models/income.interface'

@Component({
  selector: 'app-income-update',
  templateUrl: './income-update.component.html',
  styleUrls: ['./income-update.component.scss'],
})
export class IncomeUpdateComponent implements OnInit {
  @Input() income: Income;
  public editIncomeForm: FormGroup;
  constructor(
    public loadingCtrl: LoadingController,
    private firestoreService: FirestoreService,
    private modalCtrl: ModalController,
    formBuilder: FormBuilder,
  ) {
    this.editIncomeForm = formBuilder.group({
      dateCreated: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
      amount: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  ngOnInit() { this.updateValues() }

  updateValues() {
    this.editIncomeForm.setValue({
      dateCreated: this.income.dateCreated,
      name: this.income.name,
      description: this.income.description,
      amount: this.income.amount,
      type: this.income.type,
    })
  }

  async updateIncome() {
    const loading = await this.loadingCtrl.create();
    const dateCreated = this.editIncomeForm.value.dateCreated;
    const name = this.editIncomeForm.value.name;
    const description = this.editIncomeForm.value.description;
    const amount = this.editIncomeForm.value.amount;
    const type = this.editIncomeForm.value.type;
    this.firestoreService.updateIncome(
      this.income.id,
      dateCreated,
      name,
      description,
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

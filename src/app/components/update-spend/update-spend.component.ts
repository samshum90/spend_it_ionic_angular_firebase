import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from '../../services/data/firestore.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Spend } from '../../shared/models/spend.interface'

@Component({
  selector: 'app-update-spend',
  templateUrl: './update-spend.component.html',
  styleUrls: ['./update-spend.component.scss'],
})
export class UpdateSpendComponent implements OnInit {
  @Input() spend: Spend;
  public editSpendForm: FormGroup;
  constructor(
    public loadingCtrl: LoadingController,
    private firestoreService: FirestoreService,
    private modalCtrl: ModalController,
    formBuilder: FormBuilder,
  ) {
    this.editSpendForm = formBuilder.group({
      dateCreated: ['', Validators.required],
      spendName: ['', Validators.required],
      spendDescription: [''],
      category: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }

  ngOnInit() { this.updateValues() }

  updateValues() {
    this.editSpendForm.setValue({
      dateCreated: this.spend.dateCreated,
      spendName: this.spend.spendName,
      spendDescription: this.spend.spendDescription,
      category: this.spend.category,
      amount: this.spend.amount,
    })
  }

  async updateSpend() {
    const loading = await this.loadingCtrl.create();
    const dateCreated = this.editSpendForm.value.dateCreated;
    const spendName = this.editSpendForm.value.spendName;
    const spendDescription = this.editSpendForm.value.spendDescription;
    const category = this.editSpendForm.value.category;
    const amount = this.editSpendForm.value.amount;
    this.firestoreService.updateSpend(
      this.spend.id,
      dateCreated,
      spendName,
      spendDescription,
      category,
      amount
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

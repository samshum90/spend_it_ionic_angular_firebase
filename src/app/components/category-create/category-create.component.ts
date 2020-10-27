import { Component, OnInit, Input } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { FirestoreService } from '../../services/data/firestore.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss'],
})
export class CategoryCreateComponent implements OnInit {
  @Input() categories: any[];
  constructor(
    public loadingCtrl: LoadingController,
    private firestoreService: FirestoreService,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() { }

  async updateCategory(category) {
    const loading = await this.loadingCtrl.create();
    const categories = [
      ...this.categories,
      category.value
    ]
    this.firestoreService.updateCategories(
      categories
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
    console.log(categories)

  }

  CloseModal() {
    this.modalCtrl.dismiss()
  }

}

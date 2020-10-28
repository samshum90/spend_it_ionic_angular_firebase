import { Component, OnInit, ViewChild } from '@angular/core';
import { IonReorderGroup } from '@ionic/angular';
import { ItemReorderEventDetail } from '@ionic/core';
import { AuthenticationService } from "../../shared/authentication-service";
import { FirestoreService } from '../../services/data/firestore.service';
import { map, reduce } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { Spend } from '../../shared/models/spend.interface';
import { Income } from '../../shared/models/income.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {
  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;
  items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public monthSelected: string = new Date().toISOString();
  public spendList: Observable<Spend[]>;
  public incomeList: Observable<Income[]>;
  public categoriesList: Observable<any[]>;
  public budgetList: Observable<any[]>;
  public totalIncome: number;
  constructor(
    public authService: AuthenticationService,
    private firestoreService: FirestoreService,
  ) {
    this.firestoreService.getCategoriesList().pipe(
      map((res: any) => res.categories)
    ).subscribe(res =>
      this.categoriesList = res,
    );
    this.firestoreService.getIncomeList().pipe(
      map((income: Income[]) => income.map((income: Income) => income.amount).reduce((total, price) => total + price, 0))
      // map((income: Income[]) => income.map((income: Income) => income.amount)),
      // reduce<number[], number>((total, amount) => total + amount, 0)
    ).subscribe(total => this.totalIncome = total);
    this.spendList = this.firestoreService.getSpendList();
    this.incomeList = this.firestoreService.getIncomeList();
    this.budgetList = this.firestoreService.getBudgetList();
  }

  ngOnInit() {
  }

  doReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    console.log('Before complete', this.items);
    this.items = ev.detail.complete(this.items);
    console.log('After complete', this.items);
  }

  toggleReorderGroup() {
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
  }

  test() {
    console.log(this.incomeList)
    console.log(this.totalIncome)
  }

}
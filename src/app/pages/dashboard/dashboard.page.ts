import { Component, OnInit, ViewChild } from '@angular/core';
import { IonReorderGroup } from '@ionic/angular';
import { ItemReorderEventDetail } from '@ionic/core';
import { AuthenticationService } from "../../services/auth/authentication-service";
import { FirestoreService } from '../../services/data/firestore.service';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { Spend } from '../../shared/models/spend.interface';
import { Income } from '../../shared/models/income.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {
  public dateSelected: string = new Date().toISOString();
  public spendList: Spend[];
  public incomeList: Income[];
  public categoriesList: any[];
  public budgetList: any[];
  public totalIncome: number;
  public expenditureTotals: any[];
  public totalExpenditure: number;
  public selectedBudget: any[];
  constructor(
    public authService: AuthenticationService,
    private firestoreService: FirestoreService,
  ) {
    this.firestoreService.getCategoriesList().pipe(
      map((res: any) => res.categories)
    ).subscribe((res: any[]) =>
      this.categoriesList = res,
    );
    this.firestoreService.getSpendList().subscribe((res: any[]) => {
      this.spendList = res, this.populateExpenditureTotal()
    });
    this.firestoreService.getBudgetList().subscribe((res: any[]) => {
      this.budgetList = res, this.populateLatestBudget()
    })

    this.firestoreService.getIncomeList().subscribe((res: any[]) => {
      this.incomeList = res, this.populateIncomeTotal()
    });
  }

  ngOnInit() {

  }
  populateIncomeTotal() {
    this.totalIncome = this.incomeList.filter(income => income.dateCreated.substr(0, 7) === this.dateSelected.substr(0, 7))
      .map((income: Income) => income.amount)
      .reduce((total, price) => total + price, 0)
  }

  populateExpenditureTotal() {
    const output = []
    const selectedSpends = this.spendList.filter(income => income.dateCreated.substr(0, 7) === this.dateSelected.substr(0, 7))
    for (let i = 0; i < this.categoriesList.length; i++) {
      const total = selectedSpends.filter(spend => spend.category === this.categoriesList[i])
        .map(spend => spend.amount).reduce((total, amount) => total + amount, 0)
      const name = this.categoriesList[i]
      const object = {
        name,
        total
      }
      output.push(object)
    }
    this.expenditureTotals = output

    this.totalExpenditure = output.map(spend => spend.total).reduce((total, amount) => total + amount, 0)
  }

  populateLatestBudget() {
    const selectedMonthBudgets = this.budgetList.filter(budget => budget.dateCreated.substr(0, 7) === this.dateSelected.substr(0, 7))
    if (selectedMonthBudgets.length === 0 && this.budgetList.length === 0) {
      const zeroBudget = []
      for (let i = 0; i < this.categoriesList.length; i++) {
        const name = this.categoriesList[i]
        const object = {
          name,
          "amount": 0
        }
        zeroBudget.push(object)
      }
      const total = { "name": "Total", "amount": 0 }
      zeroBudget.push(total)
      this.selectedBudget = zeroBudget
    } else if (selectedMonthBudgets.length === 0 && this.budgetList.length > 0) {
      this.selectedBudget = this.budgetList[this.budgetList.length - 1].budget
    } else {
      this.selectedBudget = selectedMonthBudgets[selectedMonthBudgets.length - 1].budget
    }
  }

  handleDateChange() {
    this.populateIncomeTotal();
    this.populateExpenditureTotal();
    this.populateLatestBudget();
  }

  colorCondition(name: string) {
    if (name === "Total") {
      return false;
    }
    return true;
  }
}
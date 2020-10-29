import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Chart } from "chart.js";
import { AuthenticationService } from "../../shared/authentication-service";
import { FirestoreService } from '../../services/data/firestore.service';
import { map } from 'rxjs/operators';

import { Spend } from '../../shared/models/spend.interface';
import { Income } from '../../shared/models/income.interface';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.page.html',
  styleUrls: ['./charts.page.scss'],
})
export class ChartsPage implements OnInit {
  @ViewChild('barCanvas', { static: true }) private barCanvas: ElementRef;
  public dateSelected: string = new Date().toISOString();
  barChart: Chart;
  public categoriesList: any[];
  public spendList: Spend[];
  public budgetList: any[];
  public incomeList: Income[];
  public expenditureTotals: any[];
  public budgetTotals: any[];
  public expenditureLabels: any[];
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
    this.firestoreService.getBudgetList().subscribe((res: any[]) => {
      this.budgetList = res, this.populateLatestBudget()
    })

    this.firestoreService.getIncomeList().subscribe((res: any[]) => {
      this.incomeList = res
    });
    this.firestoreService.getSpendList().subscribe((res: any[]) => {
      this.spendList = res, this.populateExpenditureChart()
    });
  }

  ngOnInit() {

  }

  handleDateChange() {
    this.populateLatestBudget()
    this.populateExpenditureChart()
  }

  barChartMethod() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: this.expenditureLabels,
        datasets: [
          {
            label: "Expenditure(£)",
            data: this.expenditureTotals,
            backgroundColor: "#3dc2ff",
            borderColor: "#3880ff",
            borderWidth: 1
          },
          {
            label: "Budget (£)",
            data: this.budgetTotals,
            backgroundColor: "#42d77d",
            borderColor: "#2dd36f",
            borderWidth: 1
          },
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }

  populateExpenditureChart() {
    const labels = [];
    const expenditure = [];
    const budget = [];
    const selectedSpends = this.spendList.filter(income => income.dateCreated.substr(0, 7) === this.dateSelected.substr(0, 7))
    for (let i = 0; i < this.categoriesList.length; i++) {
      const total = selectedSpends.filter(spend => spend.category === this.categoriesList[i])
        .map(spend => spend.amount).reduce((total, amount) => total + amount, 0)
      const name = this.categoriesList[i]
      const amount = this.selectedBudget.find(category => category.name === this.categoriesList[i])
      console.log(total, name, amount)
      expenditure.push(total)
      labels.push(name)
      function budgetAmount(amount) {
        if (!amount) {
          return null;
        }
        return amount.amount;
      }
      budget.push(budgetAmount(amount))
      console.log(
        labels,
        expenditure,
        budget
      )

    }
    this.expenditureTotals = expenditure;
    this.budgetTotals = budget;
    this.expenditureLabels = labels;
    this.barChartMethod()
    console.log(
      this.expenditureTotals,
      this.budgetTotals,
      this.expenditureLabels
    )
  }

  populateLatestBudget() {
    const selectedMonthBudgets = this.budgetList.filter(budget => budget.dateCreated.substr(0, 7) === this.dateSelected.substr(0, 7))
    if (selectedMonthBudgets.length === 0) {
      this.selectedBudget = this.budgetList[this.budgetList.length - 1].budget
    } else {
      this.selectedBudget = selectedMonthBudgets[selectedMonthBudgets.length - 1].budget
    }
  }
}

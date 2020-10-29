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
  @ViewChild("doughnutCanvas", { static: true }) private doughnutCanvas: ElementRef;
  @ViewChild("lineCanvas", { static: true }) private lineCanvas: ElementRef;
  public dateSelected: string = new Date().toISOString();
  barChart: Chart;
  doughnutChart: Chart;
  lineChart: Chart;
  public categoriesList: any[];
  public spendList: Spend[];
  public budgetList: any[];
  public incomeList: Income[];
  public totalIncome: number;
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
      this.incomeList = res, this.populateIncomeTotal()
    });
    this.firestoreService.getSpendList().subscribe((res: any[]) => {
      this.spendList = res, this.populateExpenditureChart()
    });
  }

  ngOnInit() {
    this.lineChartMethod()
  }

  handleDateChange() {
    this.populateLatestBudget();
    this.populateExpenditureChart();
    this.populateIncomeTotal();
    this.barChart.update();
    this.doughnutChart.update();
  }

  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: "line",
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "My First dataset",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],
            spanGaps: false
          }
        ]
      }
    });
  }


  chartMethod() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: this.expenditureLabels,
        datasets: [
          {
            label: "Expenditure(£)",
            data: this.expenditureTotals,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
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

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: this.expenditureLabels,
        datasets: [
          {
            label: "% of your Expenditures",
            data: this.expenditureTotals,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56"]
          }
        ]
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
      expenditure.push(total)
      labels.push(name)
      function budgetAmount(amount) {
        if (!amount) {
          return null;
        }
        return amount.amount;
      }
      budget.push(budgetAmount(amount))
    }
    this.expenditureTotals = expenditure;
    this.budgetTotals = budget;
    this.expenditureLabels = labels;

    this.chartMethod()
  }

  addTotals() {
    if (this.expenditureLabels.length === this.categoriesList.length) {
      const expenditureCompleteTotal = this.expenditureTotals.reduce((total, amount) => total + amount, 0)
      const budgetCompleteTotal = this.budgetTotals.reduce((total, amount) => total + amount, 0)
      this.barChart.data.datasets[0].data.unshift(expenditureCompleteTotal);
      this.barChart.data.datasets[1].data.unshift(budgetCompleteTotal);
      this.barChart.data.labels.unshift("Total");
      this.barChart.data.datasets.push({
        label: 'Income',
        backgroundColor: '#ff0000',
        data: [this.totalIncome]
      });
    }
    this.barChart.update();
  }

  removeTotals() {
    this.barChart.data.datasets[0].data.shift();
    this.barChart.data.datasets[1].data.shift();
    this.barChart.data.labels.shift();
    this.barChart.data.datasets.pop();

    this.barChart.update();
  }

  populateIncomeTotal() {
    this.totalIncome = this.incomeList.filter(income => income.dateCreated.substr(0, 7) === this.dateSelected.substr(0, 7))
      .map((income: Income) => income.amount)
      .reduce((total, price) => total + price, 0)
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

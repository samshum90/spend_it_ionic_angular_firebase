import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Chart } from "chart.js";
import { AuthenticationService } from "../../services/auth/authentication-service";
import { FirestoreService } from '../../services/data/firestore.service';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

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
  public yearlyBudgetTotals: any[];
  public yearlyExpenditureTotals: any[];
  public yearlyIncomeTotals: any[];
  public yearlyLabels: any[];
  public lineChartBudgetTotals: any[];
  public lineChartExpenditureTotals: any[];
  public lineChartIncomeTotals: any[];
  public lineChartLabels: any[];

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
      this.spendList = res,
        this.populateExpenditureChart(),
        this.populateYearlyChart()
    });
  }

  ngOnInit() {
    this.chartMethod();
    this.lineChartMethod();
  }

  handleDateChange() {
    this.populateExpenditureChart();
    this.populateIncomeTotal();
  }

  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: "line",
      data: {
        labels: this.lineChartLabels,
        datasets: [
          {
            label: "Expenditure",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(255, 99, 132, 0.7)",
            borderColor: "rgba(255, 99, 132, 0.7)",
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
            data: this.lineChartExpenditureTotals,
            spanGaps: false
          },
          {
            label: "Income",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(34, 136, 51, 0.7)",
            borderColor: "rgba(34, 136, 51, 0.7)",
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
            data: this.lineChartIncomeTotals,
            spanGaps: false
          },
          {
            label: "Budget",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(238, 119, 52, 0.7)",
            borderColor: "rgba(238, 119, 52, 0.7)",
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
            data: this.lineChartBudgetTotals,
            spanGaps: false
          },
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
              "rgba(255, 99, 132, 0.7)",
              "rgba(54, 162, 235, 0.7)",
              "rgba(255, 206, 86, 0.7)",
              "rgba(75, 192, 192, 0.7)",
              "rgba(153, 102, 255, 0.7)",
              "rgba(255, 159, 64, 0.7)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1
          },
          {
            label: "Budget (£)",
            data: this.budgetTotals,
            backgroundColor: "rgba(238, 119, 52, 0.7)",
            borderColor: "rgba(238, 119, 52, 1)",
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
              "rgba(255, 99, 132, 0.8)",
              "rgba(54, 162, 235, 0.8)",
              "rgba(255, 206, 86, 0.8)",
              "rgba(75, 192, 192, 0.8)",
              "rgba(153, 102, 255, 0.8)",
              "rgba(255, 159, 64, 0.8)",
            ],
            hoverBackgroundColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ]
          }
        ]
      }
    });
  }
  populateYearlyChart() {
    this.populateLatestBudget();
    const labels = [];
    const expenditure = [];
    const budget = [];
    const income = [];

    for (let i = 0; i < 12; i++) {
      if (!!this.spendList) {
        const monthlyExpenditure = this.spendList.filter(spend => moment(spend.dateCreated.substr(0, 7)).format("YYYY-MM") === moment(this.dateSelected.substr(0, 7)).subtract(i, "month").format("YYYY-MM"))
          .map(spend => spend.amount).reduce((total, amount) => total + amount, 0);
        expenditure.unshift(monthlyExpenditure);
      }
      const label = moment(this.dateSelected.substr(0, 7)).subtract(i, "month").format("MMM-YYYY");
      labels.unshift(label);
      if (!!this.incomeList) {
        const monthlyIncome = this.incomeList.filter(income => moment(income.dateCreated.substr(0, 7)).format("YYYY-MM") === moment(this.dateSelected.substr(0, 7)).subtract(i, "month").format("YYYY-MM"))
          .map(income => income.amount).reduce((total, amount) => total + amount, 0);
        income.unshift(monthlyIncome);
      }
      const monthlyBudget = this.budgetList.filter(budget => moment(budget.dateCreated.substr(0, 7)).format("YYYY-MM") === moment(this.dateSelected.substr(0, 7)).subtract(i, "month").format("YYYY-MM"));
      function findNullBudget(monthlyBudget) {
        if (monthlyBudget.length === 0) {
          return 0;
        }
        return monthlyBudget[monthlyBudget.length - 1].budget.map(category => parseInt(category.amount)).reduce((total, amount) => total + amount, 0);
      }
      budget.unshift(findNullBudget(monthlyBudget));
    }
    this.yearlyLabels = labels;
    this.yearlyExpenditureTotals = expenditure;
    this.yearlyIncomeTotals = income;
    this.yearlyBudgetTotals = budget;

    this.lineChartLabels = labels.slice(6, 13);
    this.lineChartExpenditureTotals = expenditure.slice(6, 13);
    this.lineChartIncomeTotals = income.slice(6, 13);
    this.lineChartBudgetTotals = budget.slice(6, 13);

    this.lineChart.data.datasets[0].data = this.lineChartExpenditureTotals;
    this.lineChart.data.datasets[1].data = this.lineChartIncomeTotals;
    this.lineChart.data.datasets[2].data = this.lineChartBudgetTotals;
    this.lineChart.data.labels = this.lineChartLabels;
    this.lineChart.update();

  }


  addMonth() {
    if (this.lineChart.data.datasets[2].data.length < 12) {
      const monthlyExpenditure = this.yearlyExpenditureTotals[11 - this.lineChartExpenditureTotals.length]
      const monthlyIncome = this.yearlyIncomeTotals[11 - this.lineChartIncomeTotals.length]
      const monthlyBudget = this.yearlyBudgetTotals[11 - this.lineChartBudgetTotals.length]
      const monthlyLabel = this.yearlyLabels[11 - this.lineChartLabels.length]

      this.lineChart.data.datasets[0].data.unshift(monthlyExpenditure);
      this.lineChart.data.datasets[1].data.unshift(monthlyIncome);
      this.lineChart.data.datasets[2].data.unshift(monthlyBudget);
      this.lineChart.data.labels.unshift(monthlyLabel);
      this.lineChart.update();
    }
  }

  removeMonth() {
    this.lineChart.data.datasets[0].data.shift();
    this.lineChart.data.datasets[1].data.shift();
    this.lineChart.data.datasets[2].data.shift();
    this.lineChart.data.labels.shift();
    this.lineChart.update();
  }

  populateExpenditureChart() {
    this.populateLatestBudget();
    const labels = [];
    const expenditure = [];
    const budget = [];
    if (!!this.spendList) {
      var selectedSpends = this.spendList.filter(spend => spend.dateCreated.substr(0, 7) === this.dateSelected.substr(0, 7))
    }
    for (let i = 0; i < this.categoriesList.length; i++) {
      if (!!selectedSpends) {
        const total = selectedSpends.filter(spend => spend.category === this.categoriesList[i])
          .map(spend => spend.amount).reduce((total, amount) => total + amount, 0)
        expenditure.push(total)
      }
      const name = this.categoriesList[i]
      labels.push(name)

      const monthlyBudget = this.selectedBudget.find(category => category.name === this.categoriesList[i])
      function budgetAmount(monthlyBudget) {
        if (!monthlyBudget) {
          return null;
        }
        return monthlyBudget.amount;
      }
      budget.push(budgetAmount(monthlyBudget))
    }
    this.expenditureTotals = expenditure;
    this.budgetTotals = budget;
    this.expenditureLabels = labels;

    this.barChart.data.datasets[0].data = this.expenditureTotals
    this.barChart.data.datasets[1].data = this.budgetTotals
    this.barChart.data.labels = this.expenditureLabels
    this.barChart.update()

    this.doughnutChart.data.datasets[0].data = this.expenditureTotals
    this.doughnutChart.data.labels = this.expenditureLabels
    this.doughnutChart.update()
  }

  addTotals() {
    if (this.expenditureLabels.length === this.categoriesList.length) {
      const expenditureCompleteTotal = this.expenditureTotals.reduce((total, amount) => total + amount, 0)
      const budgetCompleteTotal = this.budgetTotals.reduce((total, amount) => total + parseInt(amount), 0)
      this.barChart.data.datasets[0].data.unshift(expenditureCompleteTotal);
      this.barChart.data.datasets[1].data.unshift(budgetCompleteTotal);
      this.barChart.data.labels.unshift("Total");
      this.barChart.data.datasets.push({
        label: 'Income',
        backgroundColor: "rgba(34, 136, 51, 0.7)",
        borderColor: "rgba(34, 136, 51, 1)",
        data: [this.totalIncome]
      });
      this.barChart.update();
    }
  }

  removeTotals() {
    if (this.barChart.data.datasets.length === 3) {
      this.barChart.data.datasets[0].data.shift();
      this.barChart.data.datasets[1].data.shift();
      this.barChart.data.labels.shift();
      this.barChart.data.datasets.pop();
      this.barChart.update();
    }
  }

  populateIncomeTotal() {
    this.totalIncome = this.incomeList.filter(income => income.dateCreated.substr(0, 7) === this.dateSelected.substr(0, 7))
      .map((income: Income) => income.amount)
      .reduce((total, price) => total + price, 0)
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

  doRefresh(event) {
    setTimeout(() => {
      this.populateExpenditureChart();
      this.populateIncomeTotal();
      this.populateYearlyChart();
      event.target.complete();
    }, 2000);
  }
}

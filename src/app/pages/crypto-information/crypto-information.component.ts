import { Component, inject, ViewChild } from '@angular/core';
import { CryptoService } from '../../services/crypto.service';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CryptoDataById } from '../../types/CryptoDataById';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { NgChartsModule } from 'ng2-charts';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-crypto-information',
  standalone: true,
  imports: [CurrencyPipe, NgChartsModule, MatButtonModule],
  templateUrl: './crypto-information.component.html',
  styleUrl: './crypto-information.component.scss',
})
export class CryptoInformationComponent {
  cryptoData: any;
  cryptoId!: string;
  days: number = 1;
  lineChartType: ChartType = 'line';

  cryptoService = inject(CryptoService);
  activatedRoute = inject(ActivatedRoute);

  @ViewChild(BaseChartDirective) myLineChart!: BaseChartDirective;

  // Line Chart Data Configuration
  lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Price Trends',
        backgroundColor: '#3f51b5',
        borderColor: '#3f51b5',
        pointBackgroundColor: '#3f51b5',
        pointHoverBackgroundColor: '#3f51b5',
        pointHoverBorderColor: '#3f51b5',
      },
    ],
    labels: [],
  };

  // Line Chart Options
  lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 0,
      },
    },
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price (United States Dollar)',
        },
        grid: {
          display: true,
        },
      },
    },
  };

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.cryptoId = data['id'];
    });
    this.getCryptoData();
    this.getGraphData(this.days);
  }

  getCryptoData() {
    this.cryptoService
      .getCryptoInfoById(this.cryptoId)
      .subscribe((response) => {
        this.cryptoData = response;
        // console.log(this.cryptoData);
      });
  }

  // Graph
  getGraphData(days: number) {
    this.days = days;
    this.cryptoService
      .getGrpahicalCryptoData(this.cryptoId, this.days)
      .subscribe((response) => {
        setTimeout(() => {
          this.myLineChart.chart?.update();
        }, 200);
        // Return numerical price from array - price data from response
        this.lineChartData.datasets[0].data = response.prices.map(
          (value: any) => {
            return value[1];
          }
        );
        // Return date from array - price data from response
        this.lineChartData.labels = response.prices.map((value: any) => {
          let date = new Date(value[0]);
          let time =
            date.getHours() > 12
              ? `${date.getHours() - 12}: ${date.getMinutes()} PM`
              : `${date.getHours()}: ${date.getMinutes()} AM`;
          return this.days === 1 ? time : date.toLocaleDateString();
        });
        // console.log(response);
      });
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ApexStroke,
} from 'ng-apexcharts';
import { NgApexchartsModule } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
};

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule, CanvasJSAngularChartsModule, NgApexchartsModule],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'], // Use correct casing
})
export class TestComponent {
  public chartOptions: ChartOptions;

  constructor() {
    this.chartOptions = {
      series: [75],
      chart: {
        height: 350,
        type: 'radialBar',
        toolbar: {
          show: true,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: '70%',
            background: '#fff',
            dropShadow: {
              enabled: true,
              top: 3,
              blur: 4,
              opacity: 0.24,
            },
          },
          track: {
            background: '#fff',
            strokeWidth: '67%',
            margin: 0,
            dropShadow: {
              enabled: true,
              top: -3,
              blur: 4,
              opacity: 0.35,
            },
          },
          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              color: '#888',
              fontSize: '17px',
            },
            value: {
              formatter: function (val: number) {
                return `${Math.round(val)}%`;
              },
              color: '#111',
              fontSize: '36px',
            },
          },
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          gradientToColors: ['#ABE5A1'],
          opacityFrom: 1,
          opacityTo: 1,
        },
      },
      stroke: {
        lineCap: 'round',
      },
      labels: ['Percent'],
    };
  }
}

import {
  Component,
  Input,
  AfterViewInit,
  OnChanges
} from '@angular/core';

import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-priority-chart',
  standalone: true,
  imports: [],
  templateUrl: './priority-chart.html',
  styleUrl: './priority-chart.css'
})
export class PriorityChart implements AfterViewInit, OnChanges {

  @Input() high = 0;
  @Input() medium = 0;
  @Input() low = 0;

  chart!: Chart;

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnChanges(): void {

    if (this.chart) {

      this.chart.data.datasets[0].data = [
        this.high,
        this.medium,
        this.low
      ];

      this.chart.update();

    }

  }

  createChart() {

    this.chart = new Chart('priorityChart', {

      type: 'bar',

      data: {

        labels: [
          'High',
          'Medium',
          'Low'
        ],

        datasets: [

          {
            label: 'Tasks',

            data: [
              this.high,
              this.medium,
              this.low
            ],

            backgroundColor: [
              '#EF4444',
              '#F59E0B',
              '#22C55E'
            ],

            borderRadius: 8

          }

        ]

      },

      options: {

        responsive: true,

        plugins: {

          legend: {
            display: false
          }

        },

        scales: {

          y: {

            beginAtZero: true,
            ticks: {
              precision: 0
            }

          }

        }

      }

    });

  }

}
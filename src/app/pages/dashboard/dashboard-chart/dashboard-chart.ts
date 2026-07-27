import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-chart',
  standalone: true,
  templateUrl: './dashboard-chart.html',
  styleUrl: './dashboard-chart.css'
})
export class DashboardChart implements AfterViewInit, OnChanges {

  @Input() completed = 0;
  @Input() pending = 0;
  @Input() inProgress = 0;

  chart!: Chart;

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart) {
      this.chart.data.datasets[0].data = [
        this.completed,
        this.pending,
        this.inProgress
      ];
      this.chart.update();
    }
  }

  createChart() {

    this.chart = new Chart('statusChart', {

      type: 'doughnut',

      data: {
        labels: ['Completed', 'Pending', 'In Progress'],
        datasets: [{
          data: [
            this.completed,
            this.pending,
            this.inProgress
          ],
          backgroundColor: [
            '#22C55E',
            '#F59E0B',
            '#3B82F6'
          ]
        }]
      },

      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }

    });

  }

}
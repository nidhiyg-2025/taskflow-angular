import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardChart } from '../dashboard/dashboard-chart/dashboard-chart';
import { PriorityChart } from '../dashboard/priority-chart/priority-chart';

interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'In Progress' | 'Completed';
  dueDate: string;
}

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    CommonModule,
    DashboardChart,
    PriorityChart
  ],
  templateUrl: './analytics.html',
  styleUrl: './analytics.css'
})
export class Analytics implements OnInit {

  totalTasks = 0;
  completedTasks = 0;
  pendingTasks = 0;
  inProgressTasks = 0;

  highPriority = 0;
  mediumPriority = 0;
  lowPriority = 0;

  ngOnInit(): void {
    this.loadAnalytics();
  }

  getCurrentUser(): any {

    const user = localStorage.getItem('currentUser');

    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  getTaskStorageKey(): string {

    const user = this.getCurrentUser();

    if (!user) {
      return 'tasks_guest';
    }

    return `tasks_${user.id}`;
  }

  loadAnalytics() {

    const storageKey = this.getTaskStorageKey();

    const saved = localStorage.getItem(storageKey);

    if (!saved) {

      this.totalTasks = 0;
      this.completedTasks = 0;
      this.pendingTasks = 0;
      this.inProgressTasks = 0;

      this.highPriority = 0;
      this.mediumPriority = 0;
      this.lowPriority = 0;

      return;
    }

    const tasks: Task[] = JSON.parse(saved);

    this.totalTasks = tasks.length;

    this.completedTasks =
      tasks.filter(t => t.status === 'Completed').length;

    this.pendingTasks =
      tasks.filter(t => t.status === 'Pending').length;

    this.inProgressTasks =
      tasks.filter(t => t.status === 'In Progress').length;

    this.highPriority =
      tasks.filter(t => t.priority === 'High').length;

    this.mediumPriority =
      tasks.filter(t => t.priority === 'Medium').length;

    this.lowPriority =
      tasks.filter(t => t.priority === 'Low').length;
  }

}
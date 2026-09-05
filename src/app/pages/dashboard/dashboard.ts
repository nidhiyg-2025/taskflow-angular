import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'In Progress' | 'Completed';
  dueDate: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  userName = '';
  totalTasks = 0;
  completedTasks = 0;
  pendingTasks = 0;
  inProgressTasks = 0;

  highPriority = 0;
  mediumPriority = 0;
  lowPriority = 0;

  progressPercentage = 0;

  recentTasks: Task[] = [];
  upcomingTasks: Task[] = [];

  ngOnInit(): void {
  const user = this.getCurrentUser();

  if (user) {
    this.userName = user.fullName;
  }

  this.loadDashboard();
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

  loadDashboard(): void {

    const storageKey = this.getTaskStorageKey();

    const savedTasks = localStorage.getItem(storageKey);

    const tasks: Task[] = savedTasks
      ? JSON.parse(savedTasks)
      : [];

    this.totalTasks = tasks.length;

    this.completedTasks =
      tasks.filter(t => t.status === 'Completed').length;

    this.pendingTasks =
      tasks.filter(t => t.status === 'Pending').length;

    this.inProgressTasks =
      tasks.filter(t => t.status === 'In Progress').length;

    this.recentTasks =
      [...tasks]
        .reverse()
        .slice(0, 5);

    this.upcomingTasks =
      [...tasks]
        .sort(
          (a, b) =>
            new Date(a.dueDate).getTime() -
            new Date(b.dueDate).getTime()
        )
        .slice(0, 5);

    this.progressPercentage =
      this.totalTasks > 0
        ? Math.round(
            (this.completedTasks / this.totalTasks) * 100
          )
        : 0;

    this.highPriority =
      tasks.filter(t => t.priority === 'High').length;

    this.mediumPriority =
      tasks.filter(t => t.priority === 'Medium').length;

    this.lowPriority =
      tasks.filter(t => t.priority === 'Low').length;
  }
}
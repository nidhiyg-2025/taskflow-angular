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

  // Dashboard Statistics
  totalTasks = 0;
  completedTasks = 0;
  pendingTasks = 0;
  inProgressTasks = 0;

  // Priority Summary
  highPriority = 0;
  mediumPriority = 0;
  lowPriority = 0;

  // Progress
  progressPercentage = 0;

  // Task Lists
  recentTasks: Task[] = [];
  upcomingTasks: Task[] = [];

 

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {

    const savedTasks = localStorage.getItem('tasks');

    if (!savedTasks) {
      return;
    }

    const tasks: Task[] = JSON.parse(savedTasks);

    // Statistics
    this.totalTasks = tasks.length;
    this.completedTasks = tasks.filter(t => t.status === 'Completed').length;
    this.pendingTasks = tasks.filter(t => t.status === 'Pending').length;
    this.inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;

    // Recent Tasks
    this.recentTasks = [...tasks]
      .reverse()
      .slice(0, 5);

    // Upcoming Deadlines
    this.upcomingTasks = [...tasks]
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
      .slice(0, 5);

    // Progress
    this.progressPercentage = this.totalTasks > 0
      ? Math.round((this.completedTasks / this.totalTasks) * 100)
      : 0;

    // Priority Summary
    this.highPriority = tasks.filter(t => t.priority === 'High').length;
    this.mediumPriority = tasks.filter(t => t.priority === 'Medium').length;
    this.lowPriority = tasks.filter(t => t.priority === 'Low').length;
  }

  

}
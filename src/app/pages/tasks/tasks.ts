import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Task {
  id: number;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'In Progress' | 'Completed';
  dueDate: string;
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class Tasks {

  tasks: Task[] = [
    {
      id: 1,
      title: 'Design Authentication Screen',
      priority: 'High',
      status: 'Completed',
      dueDate: '28 Jul 2026'
    },
    {
      id: 2,
      title: 'Build Dashboard Layout',
      priority: 'Medium',
      status: 'In Progress',
      dueDate: '30 Jul 2026'
    },
    {
      id: 3,
      title: 'Develop Analytics Module',
      priority: 'Low',
      status: 'Pending',
      dueDate: '02 Aug 2026'
    }
  ];

}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'In Progress' | 'Completed';
  dueDate: string;
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class Tasks {

  searchText = '';
  selectedStatus = '';
  selectedPriority = '';

  tasks: Task[] = [];
  filteredTasks: Task[] = [];

  showModal = false;
  isEditMode = false;
  editingTaskId = 0;

  newTask: Task = {
    id: 0,
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Pending',
    dueDate: ''
  };

  constructor() {
    this.loadTasks();
  }

  loadTasks() {

    const savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {

      this.tasks = JSON.parse(savedTasks);

    } else {

      this.tasks = [
        {
          id: 1,
          title: 'Design Authentication Screen',
          description: 'Create premium login UI',
          priority: 'High',
          status: 'Completed',
          dueDate: '2026-07-28'
        },
        {
          id: 2,
          title: 'Build Dashboard Layout',
          description: 'Design dashboard cards and charts',
          priority: 'Medium',
          status: 'In Progress',
          dueDate: '2026-07-30'
        },
        {
          id: 3,
          title: 'Develop Analytics Module',
          description: 'Implement analytics graphs',
          priority: 'Low',
          status: 'Pending',
          dueDate: '2026-08-02'
        }
      ];

      this.saveToLocalStorage();

    }

    this.filterTasks();

  }

  saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  searchTasks() {
    this.filterTasks();
  }

  filterTasks() {

    const search = this.searchText.toLowerCase();

    this.filteredTasks = this.tasks.filter(task => {

      const matchesSearch =
        task.title.toLowerCase().includes(search) ||
        task.description.toLowerCase().includes(search) ||
        task.priority.toLowerCase().includes(search) ||
        task.status.toLowerCase().includes(search);

      const matchesStatus =
        this.selectedStatus === '' ||
        task.status === this.selectedStatus;

      const matchesPriority =
        this.selectedPriority === '' ||
        task.priority === this.selectedPriority;

      return matchesSearch && matchesStatus && matchesPriority;

    });

  }

  openModal() {

    this.isEditMode = false;
    this.editingTaskId = 0;

    this.newTask = {
      id: 0,
      title: '',
      description: '',
      priority: 'Medium',
      status: 'Pending',
      dueDate: ''
    };

    this.showModal = true;

  }

  closeModal() {

    this.showModal = false;

    this.isEditMode = false;
    this.editingTaskId = 0;

    this.newTask = {
      id: 0,
      title: '',
      description: '',
      priority: 'Medium',
      status: 'Pending',
      dueDate: ''
    };

  }

  saveTask() {

    if (this.isEditMode) {

      const index = this.tasks.findIndex(
        task => task.id === this.editingTaskId
      );

      if (index !== -1) {

        this.tasks[index] = {
          ...this.newTask,
          id: this.editingTaskId
        };

      }

    } else {

      this.tasks.unshift({
        ...this.newTask,
        id: Date.now()
      });

    }

    this.saveToLocalStorage();
    this.filterTasks();
    this.closeModal();

  }

  editTask(task: Task) {

    this.isEditMode = true;
    this.editingTaskId = task.id;

    this.newTask = { ...task };

    this.showModal = true;

  }

  deleteTask(id: number) {

    if (confirm('Are you sure you want to delete this task?')) {

      this.tasks = this.tasks.filter(task => task.id !== id);

      this.saveToLocalStorage();

      this.filterTasks();

    }

  }

}
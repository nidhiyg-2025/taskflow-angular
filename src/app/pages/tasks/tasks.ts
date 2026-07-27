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

filteredTasks: Task[] = [];
selectedStatus = '';
selectedPriority = '';
isEditMode = false;
editingTaskId = 0;
  tasks: Task[] = [
    {
      id: 1,
      title: 'Design Authentication Screen',
      description: 'Create premium login UI',
      priority: 'High',
      status: 'Completed',
      dueDate: '28 Jul 2026'
    },
    {
      id: 2,
      title: 'Build Dashboard Layout',
      description: 'Design dashboard cards and charts',
      priority: 'Medium',
      status: 'In Progress',
      dueDate: '30 Jul 2026'
    },
    {
      id: 3,
      title: 'Develop Analytics Module',
      description: 'Implement analytics graphs',
      priority: 'Low',
      status: 'Pending',
      dueDate: '02 Aug 2026'
    }
  ];

constructor() {

  const savedTasks = localStorage.getItem('tasks');

  if (savedTasks) {
    this.tasks = JSON.parse(savedTasks);
  }

  this.filteredTasks = [...this.tasks];
}

saveToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(this.tasks));
}

searchTasks() {
  this.filterTasks();
}

  showModal = false;

  newTask: Task = {
    id: 0,
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Pending',
    dueDate: ''
  };

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

  editTask(task: Task) {

  this.isEditMode = true;
  this.editingTaskId = task.id;

  this.newTask = {
    ...task
  };

  this.showModal = true;
}

deleteTask(id: number) {

  const confirmDelete = confirm('Are you sure you want to delete this task?');

  if (confirmDelete) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
  this.filterTasks();
  this.saveToLocalStorage();
this.filterTasks();

}

filterTasks() {

  this.filteredTasks = this.tasks.filter(task => {

    const matchesSearch =
      task.title.toLowerCase().includes(this.searchText.toLowerCase());

    const matchesStatus =
      this.selectedStatus === '' ||
      task.status === this.selectedStatus;

    const matchesPriority =
      this.selectedPriority === '' ||
      task.priority === this.selectedPriority;

    return matchesSearch && matchesStatus && matchesPriority;

  });

}

  saveTask() {

  if (this.isEditMode) {

    const index = this.tasks.findIndex(t => t.id === this.editingTaskId);

    if (index !== -1) {
      this.tasks[index] = {
        ...this.newTask,
        id: this.editingTaskId
      };
    }

  } else {

    const task: Task = {
      ...this.newTask,
      id: this.tasks.length + 1
    };

    this.tasks.unshift(task);
  }

  this.newTask = {
    id: 0,
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Pending',
    dueDate: ''
  };

  this.isEditMode = false;
  this.editingTaskId = 0;

  this.closeModal();
this.filterTasks();
this.saveToLocalStorage();
this.filterTasks();
}


}
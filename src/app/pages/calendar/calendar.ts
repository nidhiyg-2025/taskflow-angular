import { Component, OnInit } from '@angular/core';
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
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css'
})
export class Calendar implements OnInit {

  selectedTask: Task | null = null;

showTaskDetails = false;

  tasks: Task[] = [];

today = new Date();

  currentDate = new Date();

  currentMonth = '';
  currentYear = 0;

  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  calendarDays: (number | null)[] = [];
  selectedDate: number | null = null;

showTaskForm = false;

newTask = {
  title: '',
  description: '',
  priority: 'Medium' as 'High' | 'Medium' | 'Low',
  status: 'Pending' as 'Pending' | 'In Progress' | 'Completed',
  dueDate: ''
};

editMode = false;

editTask: Task = {
  id: 0,
  title: '',
  description: '',
  priority: 'Medium',
  status: 'Pending',
  dueDate: ''
};

startEditTask(){

  if(this.selectedTask){

    this.editTask = {
      ...this.selectedTask
    };

    this.editMode = true;

  }

}

updateTask(){

 const index =
 this.tasks.findIndex(
   t => t.id === this.editTask.id
 );


 if(index !== -1){

   this.tasks[index] =
   this.editTask;


   localStorage.setItem(
     'tasks',
     JSON.stringify(this.tasks)
   );

 }


 this.editMode = false;

 this.showTaskDetails = false;

}

selectDate(day:number | null){

  if(!day) return;


  this.selectedDate = day;


  const month =
    this.currentDate.getMonth() + 1;


  const year =
    this.currentDate.getFullYear();


  this.newTask.dueDate =
    `${year}-${month.toString().padStart(2,'0')}-${day.toString().padStart(2,'0')}`;


  this.showTaskForm = true;

}

openTask(task: Task){

  this.selectedTask = task;

  this.showTaskDetails = true;

}

deleteTask(id:number){

  this.tasks =
  this.tasks.filter(
    task => task.id !== id
  );


  localStorage.setItem(
    'tasks',
    JSON.stringify(this.tasks)
  );


  this.showTaskDetails = false;

}

saveTask(){

 if(!this.newTask.title.trim()){
   return;
 }


 const task = {

   id: Date.now(),

   ...this.newTask

 };


 this.tasks.push(task);


 localStorage.setItem(
   'tasks',
   JSON.stringify(this.tasks)
 );


 this.showTaskForm = false;


 this.newTask = {

 title:'',
 description:'',
 priority:'Medium',
 status:'Pending',
 dueDate:''

 };


}

  ngOnInit(): void {
     this.loadTasks();
    this.generateCalendar();
  }

  loadTasks() {

  const saved = localStorage.getItem('tasks');

  if (saved) {
    this.tasks = JSON.parse(saved);
  }

}

isToday(day: number | null): boolean {

  if(day === null) return false;

  return (
    day === this.today.getDate() &&
    this.currentDate.getMonth() === this.today.getMonth() &&
    this.currentDate.getFullYear() === this.today.getFullYear()
  );

}

hasTask(day: number | null): boolean {

  if (!day) return false;

  return this.tasks.some(task => {

    const date = new Date(task.dueDate);

    return (
      date.getDate() === day &&
      date.getMonth() === this.currentDate.getMonth() &&
      date.getFullYear() === this.currentDate.getFullYear()
    );

  });

}

getTasksForDay(day:number | null): Task[] {

  if(!day) return [];

  return this.tasks.filter(task => {

    const date = new Date(task.dueDate);

    return (
      date.getDate() === day &&
      date.getMonth() === this.currentDate.getMonth() &&
      date.getFullYear() === this.currentDate.getFullYear()
    );

  });

}

  generateCalendar() {

    this.calendarDays = [];

    this.currentMonth =
      this.currentDate.toLocaleString('default', {
        month: 'long'
      });

    this.currentYear =
      this.currentDate.getFullYear();

    const firstDay =
      new Date(
        this.currentYear,
        this.currentDate.getMonth(),
        1
      ).getDay();

    const daysInMonth =
      new Date(
        this.currentYear,
        this.currentDate.getMonth() + 1,
        0
      ).getDate();

    // Empty cells before month starts
    for (let i = 0; i < firstDay; i++) {
      this.calendarDays.push(null);
    }

    // Month days
    for (let day = 1; day <= daysInMonth; day++) {
      this.calendarDays.push(day);
    }

  }

  previousMonth() {

    this.currentDate =
      new Date(
        this.currentYear,
        this.currentDate.getMonth() - 1,
        1
      );

    this.generateCalendar();

  }

  nextMonth() {

    this.currentDate =
      new Date(
        this.currentYear,
        this.currentDate.getMonth() + 1,
        1
      );

    this.generateCalendar();

  }

}
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class Settings {


  user = {

    name:'Nidhi',

    email:'nidhi@example.com'

  };


  settings = {

    darkMode:false,

    taskReminder:true,

    defaultPriority:'Medium'

  };



  saveSettings(){

    localStorage.setItem(
      'settings',
      JSON.stringify(this.settings)
    );


    alert('Settings saved successfully');

  }



  clearTasks(){

    localStorage.removeItem('tasks');

    alert('All tasks deleted');

  }


}
import { Component, OnInit } from '@angular/core';
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
export class Settings implements OnInit {


  profileImage = 'assets/profile.png';


  editProfile = false;


  user = {

    name: 'Nidhi',

    email: 'nidhi@example.com'

  };



  settings = {

  taskReminder: true,

  defaultPriority: 'Medium'

};



  ngOnInit(): void {

    this.loadProfile();

    this.loadSettings();

  }




  // Profile Section

  toggleProfileEdit(){

    this.editProfile = !this.editProfile;

  }



  saveProfile(){

    localStorage.setItem(
      'profile',
      JSON.stringify(this.user)
    );


    this.editProfile = false;

    alert('Profile updated successfully');

  }



  loadProfile(){

    const profile =
    localStorage.getItem('profile');


    if(profile){

      this.user =
      JSON.parse(profile);

    }

  }





  // Settings Section


  loadSettings(){

  const savedSettings =
  localStorage.getItem('settings');

  if(savedSettings){

    this.settings =
    JSON.parse(savedSettings);

  }

}



  saveSettings(){

    localStorage.setItem(
      'settings',
      JSON.stringify(this.settings)
    );

    alert('Settings saved');

  }






  clearTasks(){

    localStorage.removeItem('tasks');

    alert('All tasks deleted');

  }





  resetSettings(){

    this.settings = {

  taskReminder: true,

  defaultPriority: 'Medium'

};


    this.saveSettings();

  }



}
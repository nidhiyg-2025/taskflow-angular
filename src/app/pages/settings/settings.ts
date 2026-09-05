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

  editProfile = false;

  user = {
    name: '',
    email: ''
  };

  settings = {
    taskReminder: true,
    defaultPriority: 'Medium'
  };

  ngOnInit(): void {

    this.loadProfile();
    this.loadSettings();

  }

  getCurrentUser(): any {

    const user = localStorage.getItem('currentUser');

    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  getUserStorageKey(key: string): string {

    const user = this.getCurrentUser();

    if (!user) {
      return `${key}_guest`;
    }

    return `${key}_${user.id}`;
  }

  // Profile Section

  toggleProfileEdit() {

    this.editProfile = !this.editProfile;

  }

  saveProfile() {

    const currentUser = this.getCurrentUser();

    if (!currentUser) {
      return;
    }

    // Update profile information
    currentUser.fullName = this.user.name;
    currentUser.email = this.user.email;

    // Update current logged-in user
    localStorage.setItem(
      'currentUser',
      JSON.stringify(currentUser)
    );

    // Also update the registered user
    const users = JSON.parse(
      localStorage.getItem('users') || '[]'
    );

    const index = users.findIndex(
      (u: any) => u.id === currentUser.id
    );

    if (index !== -1) {

      users[index] = {
        ...users[index],
        fullName: this.user.name,
        email: this.user.email
      };

      localStorage.setItem(
        'users',
        JSON.stringify(users)
      );

    }

    this.editProfile = false;

    alert('Profile updated successfully');

  }

  loadProfile() {

    const currentUser = this.getCurrentUser();

    if (currentUser) {

      this.user = {
        name: currentUser.fullName,
        email: currentUser.email
      };

    }

  }

  // Settings Section

  loadSettings() {

    const storageKey =
      this.getUserStorageKey('settings');

    const savedSettings =
      localStorage.getItem(storageKey);

    if (savedSettings) {

      this.settings =
        JSON.parse(savedSettings);

    }

  }

  saveSettings() {

    const storageKey =
      this.getUserStorageKey('settings');

    localStorage.setItem(
      storageKey,
      JSON.stringify(this.settings)
    );

    alert('Settings saved');

  }

  clearTasks() {

    const storageKey =
      this.getUserStorageKey('tasks');

    localStorage.removeItem(storageKey);

    alert('All tasks deleted');

  }

  resetSettings() {

    this.settings = {

      taskReminder: true,
      defaultPriority: 'Medium'

    };

    this.saveSettings();

  }

}
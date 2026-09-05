import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {

  pageTitle = 'Dashboard';
  pageSubtitle = '';

  currentUser: any = null;

  showProfileMenu = false;
  showNotifications = false;

  notifications: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {

    this.loadCurrentUser();

    this.loadNotifications();

    this.updatePageTitle();

    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {

        this.updatePageTitle();

        this.loadNotifications();

      }

    });

  }

  loadCurrentUser() {

    const savedUser = localStorage.getItem('currentUser');

    if (savedUser) {

      this.currentUser = JSON.parse(savedUser);

    }

  }

  getTaskStorageKey(): string {

    if (!this.currentUser) {
      return 'tasks_guest';
    }

    return `tasks_${this.currentUser.id}`;

  }

  updatePageTitle() {

    const url = this.router.url;

    const userName =
      this.currentUser?.fullName || 'User';

    if (url.includes('dashboard')) {

      this.pageTitle = 'Dashboard';
      this.pageSubtitle =
        `Welcome back, ${userName} 👋`;

    }

    else if (url.includes('tasks')) {

      this.pageTitle = 'My Tasks';
      this.pageSubtitle =
        'Manage your daily work';

    }

    else if (url.includes('analytics')) {

      this.pageTitle = 'Analytics';
      this.pageSubtitle =
        'Track your productivity';

    }

    else if (url.includes('calendar')) {

      this.pageTitle = 'Calendar';
      this.pageSubtitle =
        'Manage upcoming deadlines';

    }

    else if (url.includes('settings')) {

      this.pageTitle = 'Settings';
      this.pageSubtitle =
        'Manage your preferences';

    }

  }

  // Profile Menu
  toggleProfileMenu() {

    this.showProfileMenu =
      !this.showProfileMenu;

    this.showNotifications = false;

  }

  // Notification Menu
  toggleNotifications() {

    this.showNotifications =
      !this.showNotifications;

    this.showProfileMenu = false;

  }

  loadNotifications() {

    const storageKey =
      this.getTaskStorageKey();

    const saved =
      localStorage.getItem(storageKey);

    if (!saved) {

      this.notifications = [];

      return;

    }

    const tasks = JSON.parse(saved);

    const today = new Date();

    this.notifications = tasks.filter((task: any) => {

      const dueDate =
        new Date(task.dueDate);

      const diffDays =
        Math.ceil(
          (dueDate.getTime() - today.getTime()) /
          (1000 * 60 * 60 * 24)
        );

      return (
        diffDays <= 2 &&
        task.status !== 'Completed'
      );

    });

  }

  logout() {

    Swal.fire({

      title: 'Logout',

      text: 'Are you sure you want to logout?',

      icon: 'question',

      showCancelButton: true,

      confirmButtonColor: '#4F46E5',

      cancelButtonColor: '#EF4444',

      confirmButtonText: 'Logout',

      cancelButtonText: 'Cancel'

    }).then((result) => {

      if (result.isConfirmed) {

        localStorage.removeItem('isLoggedIn');

        this.router.navigate(['/']);

      }

    });

  }

  @HostListener('document:click', ['$event'])
  closeMenus(event: MouseEvent) {

    const target =
      event.target as HTMLElement;

    if (!target.closest('.profile-container')) {

      this.showProfileMenu = false;

    }

    if (!target.closest('.notification-container')) {

      this.showNotifications = false;

    }

  }

}
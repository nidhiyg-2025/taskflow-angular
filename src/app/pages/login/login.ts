import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  password = '';

  constructor(private router: Router) {}

 login() {

  const users = JSON.parse(
    localStorage.getItem('users') || '[]'
  );

  const user = users.find(
    (u: any) =>
      u.email === this.email &&
      u.password === this.password
  );

  if (!user) {

    Swal.fire({
      icon: 'error',
      title: 'Login Failed',
      text: 'Invalid email or password'
    });

    return;

  }

  localStorage.setItem('isLoggedIn', 'true');

  localStorage.setItem(
    'currentUser',
    JSON.stringify(user)
  );

  Swal.fire({
    icon: 'success',
    title: 'Welcome',
    text: `Hello ${user.fullName}`,
    timer: 1500,
    showConfirmButton: false
  }).then(() => {

    this.router.navigate(['/app/dashboard']);

  });

}
goToRegister() {
  this.router.navigate(['/register']);
}
  showPassword = false;

togglePassword() {
  this.showPassword = !this.showPassword;
}

}
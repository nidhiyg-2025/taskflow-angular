import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';

  showPassword = false;
  showConfirmPassword = false;

  constructor(private router: Router) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

 register() {

  if (
    !this.fullName ||
    !this.email ||
    !this.password ||
    !this.confirmPassword
  ) {

    Swal.fire({
  icon: 'warning',
  title: 'Missing Information',
  text: 'Please fill all the fields.'
});
    return;

  }

  if (this.password !== this.confirmPassword) {

    Swal.fire({
  icon: 'error',
  title: 'Password Mismatch',
  text: 'Passwords do not match.'
});
    return;

  }

  const users = JSON.parse(
    localStorage.getItem('users') || '[]'
  );

  const existingUser = users.find(
    (u: any) => u.email === this.email
  );

  if (existingUser) {

 Swal.fire({
  icon: 'error',
  title: 'Registration Failed',
  text: 'An account with this email already exists.'
});
    return;

  }

  const newUser = {

    id: Date.now(),

    fullName: this.fullName,

    email: this.email,

    password: this.password

  };

  users.push(newUser);

  localStorage.setItem(
    'users',
    JSON.stringify(users)
  );

Swal.fire({
  icon: 'success',
  title: 'Account Created!',
  text: 'Redirecting to Login...',
  timer: 1800,
  showConfirmButton: false
}).then(() => {

  this.router.navigate(['/login']);

});

}

}
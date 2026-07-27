import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  password = '';

  constructor(private router: Router) {}

  login() {

    if (this.email === 'admin@gmail.com' && this.password === 'admin123') {

      localStorage.setItem('isLoggedIn', 'true');

      this.router.navigate(['/app/dashboard']);

    } else {

      Swal.fire({
  icon: 'error',
  title: 'Login Failed',
  text: 'Invalid email or password'
});

    }
    Swal.fire({
  icon: 'success',
  title: 'Welcome!',
  text: 'Login successful',
  timer: 1500,
  showConfirmButton: false
}).then(() => {

  localStorage.setItem('isLoggedIn', 'true');

  this.router.navigate(['/app/dashboard']);

});

  }
  showPassword = false;

togglePassword() {
  this.showPassword = !this.showPassword;
}

}
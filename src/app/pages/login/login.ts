import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

      alert('Invalid Email or Password');

    }
    

  }
  showPassword = false;

togglePassword() {
  this.showPassword = !this.showPassword;
}

}
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  login() {
    this.http.post('http://localhost:5000/login', { username: this.username, password: this.password })
      .subscribe(response => {
        this.router.navigate(['/dashboard']);
      }, error => {
        alert('Login failed');
      });
  }
}
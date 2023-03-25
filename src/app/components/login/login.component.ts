import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  public username: string = '';
  public password: string = '';

  logCreds() {
    if (this.username === 'Admin' && this.password === 'Admin') {
      localStorage.setItem('login', 'true');
      this.router.navigate(['home']);
    }
  }
}

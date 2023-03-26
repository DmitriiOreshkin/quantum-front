import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  private user: IUser = {
    id: '1',
    name: '',
    surname: '',
    registrationDate: '26/03/2023',
    role: '',
  };

  private setToken(token: string) {
    localStorage.setItem('token', token);
    // this.router.navigate(['home']);
  }

  private getToken(): string {
    return localStorage.getItem('token')!;
  }

  private setUser(data: IUser) {
    localStorage.setItem('user', JSON.stringify(data));
    // this.router.navigate(['home']);
  }

  getUser(): IUser {
    return JSON.parse(localStorage.getItem('user')!);
  }

  isLoggedIn() {
    return new Observable((observer) => {
      if (this.getToken() !== null) {
        //  тут запрос на сервак с подтверждением токена
        observer.next();
      } else {
        observer.error('Не авторизирован');
      }
    });
  }

  private logIn(name: string, role: string, token: string) {
    this.user.role = role;
    this.user.name = name;
    this.setUser(this.user);
    this.setToken(token);
  }

  auth(userCreds: { username: string; password: string }): Observable<boolean> {
    return new Observable((observer) => {
      if (userCreds.username === 'admin' && userCreds.password === 'admin') {
        this.logIn('admin', 'admin', 'admin');
        observer.next();
      }
      if (userCreds.username === 'user' && userCreds.password === 'user') {
        this.logIn('user', 'user', 'user');
        observer.next();
      }
      observer.error('Неправильный Логин или Пароль');
    });
  }

  logOut() {
    return new Observable((observer) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      observer.next();
    });
  }
}

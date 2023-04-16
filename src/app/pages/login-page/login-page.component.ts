import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
    constructor(private authService: AuthService, private router: Router) {}

    loginForm!: FormGroup;
    errorMessage = '';

    ngOnInit(): void {
        this.authService.isLoggedIn().subscribe({ next: () => this.router.navigate(['home']) });
        this.loginForm = new FormGroup({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
        });
    }

    submitLogin() {
        console.log(this.loginForm.value);
        this.authService.auth(this.loginForm.value).subscribe({
            next: () => this.router.navigate(['home']),
            error: (e) => (this.errorMessage = e),
        });
    }
}

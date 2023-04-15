import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    constructor(
        private authService: AuthService,
        private router: Router,
        private cartService: CartService,
    ) {}
    ngOnInit(): void {
        this.productsInCart = this.cartService.getProductCount();

        // реактивно обновляем счётчик кол-ва продуктов в корзине
        this.cartService.cart.subscribe({
            next: () => {
                this.productsInCart = this.cartService.getProductCount();
            },
        });
    }

    productsInCart: number = 0;

    logOut() {
        this.authService.logOut().subscribe({
            next: () => this.router.navigate(['login']),
        });
    }
}

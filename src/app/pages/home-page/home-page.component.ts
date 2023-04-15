import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/products';
import { products } from '../../data/products';
import { ProductService } from '../../services/products.service';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart.service';
import { ServerService } from 'src/app/services/server.service';
import { FiltersService } from 'src/app/services/filters.service';
@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
    constructor(
        private server: ServerService,
        private filters: FiltersService,
        private router: Router,
        private authService: AuthService,
        private cartService: CartService,
    ) {}

    isFetching: boolean = true;
    products: IProduct[] = [];
    itemsPerPage: number = 5;
    pages: number;
    currPage: number = 1;
    search: string = '';
    productsInCart = 0;

    selectedOption = 'all';

    user: IUser | null;

    logOut() {
        this.authService.logOut().subscribe({
            next: () => this.router.navigate(['login']),
        });
    }

    createRange(number: number) {
        return new Array(number).fill(0).map((n, index) => index + 1);
    }

    isActive(page: number) {
        return this.currPage === page;
    }

    ngOnInit(): void {
        this.authService.isLoggedIn().subscribe({
            next: () => {
                this.user = this.authService.getUser();
                this.productsInCart = this.cartService.getProductCount();

                this.server.listenProductsFetching().subscribe({
                    next: (products) => {
                        this.products = products as IProduct[];
                    },
                });

                this.server.listenProductsFetchingStatus().subscribe({
                    next: (isFetching) => {
                        this.isFetching = isFetching as boolean;
                    },
                });

                this.filters.listenSearchEvent().subscribe({
                    next: (text) => {
                        this.search = text as string;
                    },
                });

                this.filters.listenFilterEvent().subscribe({
                    next: (option) => {
                        this.selectedOption = option as string;
                    },
                });

                // реактивно обновляем счётчик кол-ва продуктов в корзине
                this.cartService.cart.subscribe({
                    next: () => {
                        this.productsInCart = this.cartService.getProductCount();
                    },
                });

                this.server.getProductsByPage(this.currPage, this.itemsPerPage).subscribe();
            },
            error: () => {
                this.router.navigate(['login']);
            },
        });
    }
}

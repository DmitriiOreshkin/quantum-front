import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/products';
import { products } from '../../data/products';
import { ProductService } from '../../services/products.service';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/app/models/user';
@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
    constructor(
        private productsService: ProductService,
        private router: Router,
        private authService: AuthService,
    ) {}

    products$: Observable<IProduct[]> = this.productsService.getAll();
    loading: boolean = false;
    products: IProduct[] = [];
    itemsPerPage: number = 5;
    pages: number;
    currPage: number = 1;
    search: string = '';

    selectedOption = 'all';

    cartPopup: boolean = false;

    openPopup() {
        this.cartPopup = !this.cartPopup;
    }

    onSelect(v: string) {
        console.log(v);
        this.selectedOption = v;
    }

    user: IUser | null;

    logOut() {
        this.authService.logOut().subscribe({
            next: () => this.router.navigate(['login']),
        });
    }

    getProducts(page: number) {
        this.products$ = this.productsService.getProductsByPage(page, this.itemsPerPage);
        this.currPage = page;
        // this.products$ = this.productsService.getAll().pipe(tap(() => (this.loading = false)));
    }

    createRange(number: number) {
        return new Array(number).fill(0).map((n, index) => index + 1);
    }

    isActive(page: number) {
        return this.currPage === page;
    }

    ngOnInit(): void {
        this.pages = this.productsService.getPages(this.itemsPerPage);
        console.log(this.pages);
        // this.getProducts(1);
        this.authService.isLoggedIn().subscribe({
            next: () => {
                this.user = this.authService.getUser();
                this.loading = true;
                this.getProducts(this.currPage);
            },
            error: () => {
                this.router.navigate(['login']);
            },
        });
    }
}

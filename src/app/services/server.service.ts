import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { debounceTime, delay, filter, from, Observable, of, Subject, take, tap } from 'rxjs';
import { products } from '../data/products';
import { IProduct } from '../models/products';
import { ErrorService } from './error.service';

@Injectable({
    providedIn: 'root',
})
export class ServerService {
    constructor(private http: HttpClient, private errorService: ErrorService) {}

    private serverResponse = new Subject();
    private isProductsFetching = new Subject();
    private productsPages = new Subject<number>();

    listenProductsFetching() {
        return this.serverResponse;
    }

    listenProductsFetchingStatus() {
        return this.isProductsFetching;
    }

    listenProductsPages(): Subject<number> {
        return this.productsPages;
    }

    getProductsByPage(page: number, itemsPerPage: number) {
        page = page - 1;
        const allProdLen = products.length;
        const stream$ = of(
            products.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage),
        ).pipe(
            tap(() => {
                this.isProductsFetching.next(true);
            }),
            delay(1000),
            tap((products: IProduct[]) => {
                this.serverResponse.next(products);
                this.productsPages.next(Math.ceil(allProdLen / itemsPerPage));
            }),
            tap(() => {
                this.isProductsFetching.next(false);
            }),
        );
        stream$.subscribe();
    }

    deleteProduct(id: number | string) {}

    patchProduct(id: number | string) {}

    searchProducts(text: string) {
        if (text === '') {
            this.getProductsByPage(1, 5);
            return;
        }
        const stream$ = of(
            products.filter((product: IProduct) => product.name.includes(text)),
        ).pipe(
            tap(() => {
                this.isProductsFetching.next(true);
            }),
            delay(1000),
            tap((products: IProduct[]) => {
                this.serverResponse.next(products);
                // this.productsPages.next(Math.ceil(products.length / 5));
                this.productsPages.next(1);
            }),
            tap(() => {
                this.isProductsFetching.next(false);
            }),
        );

        stream$.subscribe();
    }

    filterProducts(type: string | null) {
        if (type === 'all') {
            this.getProductsByPage(1, 5);
            return;
        }
        const stream$ = of(products.filter((product: IProduct) => product.type == type)).pipe(
            tap(() => {
                this.isProductsFetching.next(true);
            }),
            delay(1000),
            tap((products: IProduct[]) => {
                this.serverResponse.next(products);
                // this.productsPages.next(Math.ceil(products.length / 5));
                this.productsPages.next(1);
            }),
            tap(() => {
                this.isProductsFetching.next(false);
            }),
        );

        stream$.subscribe();
    }
}

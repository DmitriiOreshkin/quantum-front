import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of, Subject, take, tap } from 'rxjs';
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

    listenProductsFetching() {
        return this.serverResponse;
    }

    listenProductsFetchingStatus() {
        return this.isProductsFetching;
    }

    getProductsPages(itemsPerPage: number): Observable<number> {
        return of(Math.ceil(products.length / itemsPerPage)).pipe(delay(1000));
    }

    getProductsByPage(page: number, itemsPerPage: number): Observable<IProduct[]> {
        page = page - 1;
        return of(products.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage)).pipe(
            tap(() => {
                this.isProductsFetching.next(true);
            }),
            delay(1000),
            tap((products: IProduct[]) => {
                this.serverResponse.next(products);
            }),
            tap(() => {
                this.isProductsFetching.next(false);
            }),
        );
    }

    deleteProduct(id: number | string) {}

    patchProduct(id: number | string) {}
}

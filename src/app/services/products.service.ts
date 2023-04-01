import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, filter, Observable, of, throwError } from 'rxjs';
import { from } from 'rxjs';
import { IProduct } from '../models/products';
import { ErrorService } from './error.service';
import { products } from '../data/products';
@Injectable({
    providedIn: 'root',
})
export class ProductService {
    constructor(private http: HttpClient, private errorService: ErrorService) {}

    private errorHandler(error: HttpErrorResponse) {
        this.errorService.handle(error.message);
        return throwError(() => error.message);
    }

    getAll(): Observable<IProduct[]> {
        return of(products);
    }

    getPages(itemsPerPage: number): number {
        return Math.ceil(products.length / itemsPerPage);
    }

    getProductsByPage(page: number, itemsPerPage: number): Observable<IProduct[]> {
        page = page - 1;
        console.log(page * itemsPerPage, page * itemsPerPage + itemsPerPage);
        return of(products.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage));
    }
}

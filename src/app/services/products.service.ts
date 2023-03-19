import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, Observable, throwError } from 'rxjs';
import { IProduct } from '../models/products';
import { ErrorService } from './error.service';

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
    return this.http
      .get<IProduct[]>('https://fakestoreapi.com/products', {
        params: new HttpParams({ fromObject: { limit: 20 } }),
      })
      .pipe(catchError(this.errorHandler.bind(this)));
  }
}

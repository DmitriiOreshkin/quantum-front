import { Component, OnInit } from '@angular/core';
import { IProduct } from './models/products';
import { products } from './data/products';
import { ProductService } from './services/products.service';
import { Observable, tap } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private productsService: ProductService) {}

  loading: boolean = false;
  products: IProduct[] = [];
  term: string = '';

  // products$: Observable<IProduct[]>;

  ngOnInit(): void {
    this.loading = true;
    // this.products$ = this.productsService
    // .getAll()
    // .pipe(tap(() => (this.loading = false)));
    this.productsService.getAll().subscribe((products) => {
      this.products = products;
      this.loading = false;
    });
  }
}

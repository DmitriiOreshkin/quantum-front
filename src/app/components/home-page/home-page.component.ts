import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/products';
import { products } from '../../data/products';
import { ProductService } from '../../services/products.service';
import { Observable, tap } from 'rxjs';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private productsService: ProductService, private router: Router) {}

  products$: Observable<IProduct[]> = this.productsService.getAll();
  loading: boolean = false;
  products: IProduct[] = [];
  term: string = '';

  // products$: Observable<IProduct[]>;

  ngOnInit(): void {
    if (localStorage.getItem('login') !== 'true') {
      this.router.navigate(['/login']);
      return;
    }

    this.loading = true;
    this.products$ = this.productsService.getAll().pipe(tap(() => (this.loading = false)));

    this.products$.subscribe();

    // this.productsService.getAll().subscribe((products) => {
    // this.products = products;
    // this.loading = false;
    // });
  }
}

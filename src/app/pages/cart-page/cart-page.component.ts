import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/products';
import { CartService } from 'src/app/services/cart.service';

@Component({
    selector: 'app-cart-page',
    templateUrl: './cart-page.component.html',
    styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {
    constructor(private cartService: CartService) {}

    products: IProduct[] = [];

    ngOnInit(): void {
        this.products = this.cartService.getCart();

        // реактивно обновляем кол-во продуктов в корзине
        this.cartService.cart.subscribe({
            next: () => {
                this.products = this.cartService.getCart();
            },
        });
    }

    deleteFromCart(product: IProduct): void {
        this.cartService.deleteFromCart(product);
    }
    // @Input() isOpen: boolean;
    // closePopup() {
    //     this.isOpen = false;
    // }
}

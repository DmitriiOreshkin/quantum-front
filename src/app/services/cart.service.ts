import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IProduct } from '../models/products';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    constructor() {}

    cart = new Subject<number>();

    addToCart(product: IProduct) {
        const cart = this.getCart();
        cart.push(product as never);
        localStorage.setItem('cart', JSON.stringify(cart));
        this.cart.next(this.getProductCount());
    }

    deleteFromCart(product: IProduct) {
        const cart = this.getCart().filter((p) => p.id != product.id);
        localStorage.setItem('cart', JSON.stringify(cart));
        this.cart.next(this.getProductCount());
    }

    getCart(): IProduct[] | [] {
        const cart = localStorage.getItem('cart');
        if (cart != null) return JSON.parse(cart);
        return [];
    }

    getProductCount(): number {
        return this.getCart().length;
    }
}

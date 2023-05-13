import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/products';
import { IUser } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart.service';
import { ServerService } from 'src/app/services/server.service';

@Component({
    selector: 'Product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
    constructor(private cartService: CartService) {}

    ngOnInit(): void {}

    @Input() product: IProduct;
    @Input() user: IUser | null;
    @Input() cart: boolean | null;
    @Input() view: boolean | null;

    details: boolean = false;

    public addToCart() {
        this.cartService.addToCart(this.product);
    }

    public deleteFromCart() {
        this.cartService.deleteFromCart(this.product);
    }
}

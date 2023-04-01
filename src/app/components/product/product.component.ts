import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/models/products';
import { IUser } from 'src/app/models/user';

@Component({
    selector: 'Product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
    @Input() product: IProduct;
    @Input() user: IUser | null;
    details: boolean = false;
}

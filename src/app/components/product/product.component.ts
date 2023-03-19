import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/models/products';

@Component({
  selector: 'Product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() product: IProduct;
  details: boolean = false;
}

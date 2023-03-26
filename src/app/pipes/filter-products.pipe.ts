import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../models/products';

@Pipe({
  name: 'filterProducts',
})
export class FilterProductsPipe implements PipeTransform {
  transform(products: IProduct[], filter: string): IProduct[] {
    console.log(filter);
    if (filter === 'all') return products;
    return products.filter((p) => p.type.includes(filter));
  }
}

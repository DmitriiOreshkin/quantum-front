import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../models/products';

@Pipe({
  name: 'searchProducts',
})
export class SearchProductsPipe implements PipeTransform {
  transform(products: IProduct[], search: string): IProduct[] {
    if (search.length === 0) return products;
    return products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  }
}

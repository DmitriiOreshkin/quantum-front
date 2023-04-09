import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-product-page',
    templateUrl: './product-page.component.html',
    styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent {
    id: string | null;
    constructor(private route: ActivatedRoute) {}
    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');
    }
}

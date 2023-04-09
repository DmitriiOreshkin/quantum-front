import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-delete-product-modal',
    templateUrl: './delete-product-modal.component.html',
    styleUrls: ['./delete-product-modal.component.scss'],
})
export class DeleteProductModalComponent implements OnInit {
    id: string | null;
    constructor(private route: ActivatedRoute) {}
    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');
    }
    public deleteProduct() {
        alert(`delete product with id ${this.id}`);
        // здесь надо внедрить сервис по работе с серваком (эмуляция)
    }
}

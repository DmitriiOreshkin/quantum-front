import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';

@Component({
    selector: 'app-delete-product-modal',
    templateUrl: './delete-product-modal.component.html',
    styleUrls: ['./delete-product-modal.component.scss'],
})
export class DeleteProductModalComponent implements OnInit {
    id: string | null;
    product: any;
    constructor(
        private route: ActivatedRoute,
        private server: ServerService,
        private router: Router,
    ) {}
    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');

        this.server.getProductsById(this.id).subscribe({
            next: (products: any) => {
                this.product = products[0];
            },
        });
    }

    public deleteProduct() {
        this.server.deleteProduct(this.product);
        this.router.navigate(['home']);
    }
}

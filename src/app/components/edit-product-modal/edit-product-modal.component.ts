import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/models/products';
import { ServerService } from 'src/app/services/server.service';

@Component({
    selector: 'app-edit-product-modal',
    templateUrl: './edit-product-modal.component.html',
    styleUrls: ['./edit-product-modal.component.scss'],
})
export class EditProductModalComponent {
    id: string | null;
    product: any;
    isFetching: boolean;
    constructor(
        private route: ActivatedRoute,
        private server: ServerService,
        private router: Router,
    ) {}

    changeProductForm!: FormGroup;
    errorMessage = '';

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');

        this.changeProductForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            description: new FormControl('', [
                Validators.required,
                // Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/),
            ]),
        });

        this.getProduct();
    }

    private getProduct() {
        // запрос к серверу

        this.server.getProductsById(this.id).subscribe({
            next: (products: any) => {
                this.product = products[0];
                // console.log(this.product);
                this.changeProductForm.setValue({
                    name: this.product.name,
                    description: this.product.description,
                });
            },
        });
    }

    submitChange() {
        this.server.patchProduct({ ...this.product, ...this.changeProductForm.value });
        this.router.navigate(['home']);
    }
}
